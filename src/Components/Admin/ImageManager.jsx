import { useEffect, useState } from "react";
import {
  deleteField,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./AdminPage.css";

const CLOUDINARY_CLOUD_NAME = "njzlu0tu";
const CLOUDINARY_UPLOAD_PRESET = "omt_unsigned_upload";

export default function ImageManager({
  sectionId,
  title,
  description,
  mode = "multiple",
}) {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [preview, setPreview] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "siteContent", sectionId),
      (snapshot) => {
        const data = snapshot.exists() ? snapshot.data() : {};

        if (mode === "single") {
          setImages(
            data.imageUrl
              ? [
                  {
                    id: "hero-image",
                    url: data.imageUrl,
                    publicId: data.publicId || "",
                    title: data.title || "Hero image",
                  },
                ]
              : []
          );
        } else {
          setImages(Array.isArray(data.images) ? data.images : []);
        }
      },
      (err) => {
        console.error("Failed to load website images:", err);
        setError("Could not load images. Check Firestore read permissions.");
      }
    );

    return unsubscribe;
  }, [sectionId, mode]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    setSelectedFile(null);
    setPreview("");
    setMessage("");
    setError("");

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose a valid image file.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("The image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    if (!imageTitle.trim()) {
      setImageTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  }

  function startReplace(image) {
    setSelectedId(image.id);
    setImageTitle(image.title || "");
    setSelectedFile(null);
    setPreview("");
    setMessage("");
    setError("");
    document.getElementById(`image-file-${sectionId}`)?.click();
  }

  async function handleUpload(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!selectedFile) {
      setError("Choose an image file first.");
      return;
    }
    if (mode === "single" && images.length > 0 && !selectedId) {
      setError("Click Replace on the current image before uploading a new one.");
      return;
    }

    setUploading(true);
    try {
      // 1. Upload the image file to Cloudinary first.
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", `one-more-take/${sectionId}`);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error?.message || "Cloudinary upload failed.");
      }
      if (!result.secure_url || !result.public_id) {
        throw new Error("Cloudinary did not return the image URL and public ID.");
      }

      // 2. Only after Cloudinary succeeds, save its URL/details to Firestore.
      const imageTitleValue = imageTitle.trim() || selectedFile.name;
      const newImage = {
        id: selectedId || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        url: result.secure_url,
        publicId: result.public_id,
        title: imageTitleValue,
        createdAt: new Date().toISOString(),
      };

      if (mode === "single") {
        await setDoc(
          doc(db, "siteContent", sectionId),
          {
            imageUrl: result.secure_url,
            publicId: result.public_id,
            title: imageTitleValue || "Hero image",
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
        setMessage("Hero image uploaded to Cloudinary and saved to Firebase.");
      } else {
        const nextImages = selectedId
          ? images.map((image) => (image.id === selectedId ? newImage : image))
          : [...images, newImage];

        await setDoc(
          doc(db, "siteContent", sectionId),
          { images: nextImages, updatedAt: serverTimestamp() },
          { merge: true }
        );
        setMessage(
          selectedId
            ? "Image uploaded to Cloudinary and replacement saved to Firebase."
            : "Image uploaded to Cloudinary and saved to Firebase."
        );
      }

      setSelectedFile(null);
      setSelectedId("");
      setPreview("");
      setImageTitle("");
      event.target.reset();
    } catch (err) {
      console.error("Image upload failed:", err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(image) {
    const confirmed = window.confirm(
      `Remove "${image.title || "this image"}" from the website?`
    );
    if (!confirmed) return;

    setError("");
    setMessage("");
    try {
      if (mode === "single") {
        await setDoc(
          doc(db, "siteContent", sectionId),
          {
            imageUrl: deleteField(),
            publicId: deleteField(),
            title: deleteField(),
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } else {
        const nextImages = images.filter((item) => item.id !== image.id);
        await setDoc(
          doc(db, "siteContent", sectionId),
          { images: nextImages, updatedAt: serverTimestamp() },
          { merge: true }
        );
      }
      setMessage("Image removed from the website. The file remains in Cloudinary.");
      if (selectedId === image.id) {
        setSelectedId("");
        setSelectedFile(null);
        setPreview("");
      }
    } catch (err) {
      console.error("Image deletion failed:", err);
      setError("Could not remove image. Check Firestore permissions.");
    }
  }

  return (
    <section className="admin-panel-card image-manager">
      <div className="admin-panel-heading">
        <div>
          <p className="admin-eyebrow">WEBSITE CONTENT</p>
          <h2>{title}</h2>
          <p className="admin-muted">{description}</p>
        </div>
        <span className="admin-image-count">
          {images.length} {images.length === 1 ? "image" : "images"}
        </span>
      </div>

      {error && <p className="admin-error" role="alert">{error}</p>}
      {message && <p className="admin-success" role="status">{message}</p>}

      <form className="image-manager-form" onSubmit={handleUpload}>
        <label htmlFor={`image-file-${sectionId}`}>
          {selectedId ? "Choose replacement image" : "Choose image"}
        </label>
        <input
          id={`image-file-${sectionId}`}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
        />

        <label htmlFor={`image-title-${sectionId}`}>Image title</label>
        <input
          id={`image-title-${sectionId}`}
          type="text"
          maxLength={100}
          placeholder="Enter image title"
          value={imageTitle}
          onChange={(event) => setImageTitle(event.target.value)}
        />

        {preview && (
          <div className="image-manager-preview-wrap">
            <p className="admin-muted">Preview</p>
            <img src={preview} alt="Selected upload preview" className="image-manager-preview" />
          </div>
        )}

        <div className="image-manager-actions">
          <button className="admin-primary-button" type="submit" disabled={!selectedFile || uploading}>
            {uploading ? "Uploading..." : selectedId ? "Replace image" : mode === "single" ? "Save Hero image" : "Upload image"}
          </button>
          {(selectedFile || selectedId) && (
            <button
              className="admin-secondary-button"
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setSelectedId("");
                setPreview("");
                setImageTitle("");
                setError("");
                setMessage("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-image-grid">
        {images.map((image, index) => (
          <article className="admin-image-card" key={image.id || image.url}>
            <img src={image.url} alt={image.title || `${title} ${index + 1}`} className="admin-image-thumbnail" />
            <div className="admin-image-details">
              <strong>{image.title || `${title} ${index + 1}`}</strong>
              <small>Image {index + 1}</small>
            </div>
            <div className="admin-image-actions">
              <button type="button" className="admin-secondary-button" onClick={() => startReplace(image)}>
                Replace
              </button>
              <button type="button" className="admin-danger-button" onClick={() => handleDelete(image)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
