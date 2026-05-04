"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function CreateReportPage() {
  const [wasteType, setWasteType] = useState("");
  const [estimatedWeight, setEstimatedWeight] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationStatus, setLocationStatus] = useState("");

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhotoName(file ? file.name : "");
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Browser tidak mendukung GPS");
      return;
    }

    setLocationStatus("Mendeteksi lokasi...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setLocationStatus("Lokasi GPS berhasil dideteksi");
      },
      () => setLocationStatus("Gagal mengambil lokasi dari GPS"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="report-form" data-component="CreateReportPage">
      <div className="report-header">
        <h1>Waste Report Form</h1>
      </div>

      <form onSubmit={handleSubmit} className="report-form-body">
          <div className="field">
            <label>Waste Type</label>
            <select
              value={wasteType}
              onChange={(event) => setWasteType(event.target.value)}
              required
              className="waste-type-select"
            >
              <option value="">Select Waste Type</option>
              <option value="plastic">Plastic</option>
              <option value="organic">Organic</option>
              <option value="paper">Paper</option>
              <option value="metal">Metal</option>
              <option value="glass">Glass</option>
              <option value="electronics">Electronics</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="field">
            <label>Estimated Weight (kg)</label>
            <input
              type="number"
              value={estimatedWeight}
              onChange={(event) => setEstimatedWeight(event.target.value)}
              placeholder="0"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="field">
            <label>Photo</label>
            <label className="photo-dropzone">
              <Upload className="photo-icon" size={32} />
              <span className="photo-title">Click to upload photo</span>
              <span className="photo-subtitle">PNG, JPG up to 10MB</span>
              {photoName && <span className="photo-name">{photoName}</span>}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          <div className="field">
            <label>Location</label>
            <button type="button" className="detect-button" onClick={handleDetectLocation}>
              Detect Location
            </button>
          </div>

          <button type="submit" className="submit-button">
            Submit Report
          </button>

          <p className="status-text">{locationStatus}</p>

          <input type="hidden" name="waste_type" value={wasteType} />
          <input type="hidden" name="estimated_weight" value={estimatedWeight} />
          <input type="hidden" name="photo_url" value="akan_diisi_setelah_upload" />
          <input type="hidden" name="location_address" value="" />
          <input type="hidden" name="latitude" value={latitude} />
          <input type="hidden" name="longitude" value={longitude} />
          <input type="hidden" name="user_id" value="session_user_id" />
          <input type="hidden" name="status" value="pending" />
          <input type="hidden" name="points_awarded" value="0" />
          <input type="hidden" name="reviewed_by" value="" />
          <input type="hidden" name="review_note" value="" />
          <input type="hidden" name="created_at" value="auto" />
          <input type="hidden" name="updated_at" value="auto" />
        </form>
    </div>
  );
}