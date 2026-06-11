"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix Leaflet's default icon path issues in Next.js
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom Icon for specific statuses if needed (example: resolved vs pending)
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Report {
  id: string;
  waste_type: string;
  status: string;
  latitude: number;
  longitude: number;
  location_address?: string;
  created_at: string;
}

interface DashboardMapProps {
  reports: Report[];
}

export default function DashboardMap({ reports }: DashboardMapProps) {
  // Default to Depok area if no reports exist
  const centerPosition: [number, number] = reports.length > 0 
    ? [reports[0].latitude, reports[0].longitude] 
    : [-6.368, 106.820];

  return (
    <div className="h-full w-full rounded-b-2xl overflow-hidden relative z-0">
      <MapContainer 
        center={centerPosition} 
        zoom={13} 
        style={{ height: "100%", width: "100%", minHeight: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {reports.map((report) => (
          <Marker 
            key={report.id} 
            position={[report.latitude, report.longitude]}
            icon={report.status === 'APPROVED' ? greenIcon : report.status === 'REJECTED' ? redIcon : defaultIcon}
          >
            <Popup>
              <div className="text-sm">
                <strong className="block mb-1 text-gray-900">Laporan #{report.id.substring(0, 5)}</strong>
                <div className="flex flex-col gap-1 text-gray-600">
                  <span><span className="font-semibold">Tipe:</span> {report.waste_type}</span>
                  <span><span className="font-semibold">Status:</span> {report.status}</span>
                  {report.location_address && (
                    <span className="text-xs mt-1 border-t pt-1 line-clamp-2">{report.location_address}</span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
