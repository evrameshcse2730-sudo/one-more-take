
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import admin from "firebase-admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Firebase Admin setup
if (!admin.apps.length) {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (serviceAccountJson) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(serviceAccountJson)
      ),
    });
  }
}

// Verify Firebase login and admin access
async function verifyAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : "";

    if (!token || !admin.apps.length) {
      return res.status(401).json({
        error: "Authentication is not configured.",
      });
    }

    const decoded = await admin.auth().verifyIdToken(token);

    if (decoded.uid !== process.env.ADMIN_UID) {
      return res.status(403).json({ error: "Admin access required." });
    }

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid authentication." });
  }
}

// Upload image
app.post("/api/images/upload", verifyAdmin, async (req, res) => {
  try {
    const { image, folder = "one-more-take" } = req.body;

    if (
      typeof image !== "string" ||
      !image.startsWith("data:image/")
    ) {
      return res.status(400).json({ error: "Valid image required." });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder,
      resource_type: "image",
    });

    res.json({
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    res.status(500).json({ error: "Image upload failed." });
  }
});

// Delete image
app.delete("/api/images/delete", verifyAdmin, async (req, res) => {
  try {
    const { publicId } = req.body;

    if (
      typeof publicId !== "string" ||
      !publicId.startsWith("one-more-take/")
    ) {
      return res.status(400).json({ error: "Invalid image public ID." });
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(400).json({ error: "Cloudinary delete failed." });
    }

    res.json({ success: true, result: result.result });
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
    res.status(500).json({ error: "Image deletion failed." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "Backend running" });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
