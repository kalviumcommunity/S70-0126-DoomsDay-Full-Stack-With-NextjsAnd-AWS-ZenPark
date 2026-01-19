"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon issue in Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function Map({ sites }: { sites: any[] }) {
    return (
        <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {sites.map((site) => (
                <Marker key={site.id} position={[12.9716, 77.5946]} icon={icon}>
                    {/* Mocking position for now since Site model doesn't have lat/lng yet. 
               I should add lat/lng to Site model or use address geocoding. 
               For now, all markers will be at same spot unless I randomize/mock.
           */}
                    <Popup>
                        <div className="p-2">
                            <h3 className="font-bold">{site.name}</h3>
                            <p className="text-sm">{site.address}</p>
                            <a href={`/sites/${site.id}`} className="text-primary hover:underline block mt-2">View Layout</a>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
