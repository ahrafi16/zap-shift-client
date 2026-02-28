import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import districts from "../../data/districts";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;


// 🔥 Component to control map movement
const FlyToDistrict = ({ selectedDistrict }) => {
    const map = useMap();

    useEffect(() => {
        if (selectedDistrict) {
            map.flyTo(
                [selectedDistrict.latitude, selectedDistrict.longitude],
                10, // zoom level
                { duration: 1.5 }
            );
        }
    }, [selectedDistrict, map]);

    return null;
};

const BangladeshMap = ({ selectedDistrict }) => {
    const centerPosition = [23.6850, 90.3563];

    const markerRefs = useRef({});

    useEffect(() => {
        if (selectedDistrict) {
            const marker = markerRefs.current[selectedDistrict.district];
            if (marker) {
                marker.openPopup();
            }
        }
    }, [selectedDistrict]);

    return (
        <MapContainer
            center={centerPosition}
            zoom={7}
            scrollWheelZoom={true}
            className="h-full w-full"
        >
            <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FlyToDistrict selectedDistrict={selectedDistrict} />

            {districts.map((district) => (
                <Marker
                    key={district.district}
                    position={[district.latitude, district.longitude]}
                    ref={(ref) => {
                        if (ref) {
                            markerRefs.current[district.district] = ref;
                        }
                    }}
                >
                    <Popup>
                        <div>
                            <h2 className="font-bold text-lg">
                                {district.district}
                            </h2>
                            <p>Region: {district.region}</p>
                            <p>Status: {district.status}</p>
                            <p>
                                Covered Areas:
                                <br />
                                {district.covered_area.join(", ")}
                            </p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default BangladeshMap;