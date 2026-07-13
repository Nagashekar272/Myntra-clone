import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { X, Loader, Search, MapPin } from 'lucide-react';
import './MapModal.css';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapModal = ({ onClose, onSelect }) => {
  const [position, setPosition] = useState([20.5937, 78.9629]); // Center of India
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);

  function LocationMarker() {
    useMapEvents({
      async click(e) {
        const newPos = [e.latlng.lat, e.latlng.lng];
        setPosition(newPos);
        fetchAddress(newPos);
      },
    });

    return position === null ? null : (
      <Marker position={position}></Marker>
    );
  }

  const fetchAddress = async (pos) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos[0]}&lon=${pos[1]}`
      );
      const data = await response.json();
      const addr = data.address;
      const city = addr.city || addr.town || addr.village || addr.suburb || addr.state || "Unknown Location";
      const area = addr.suburb || addr.neighbourhood || addr.road || city;
      
      setAddress({
        city: city,
        fullAddress: data.display_name,
        area: area
      });
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const firstResult = data[0];
        const newPos = [parseFloat(firstResult.lat), parseFloat(firstResult.lon)];
        setPosition(newPos);
        fetchAddress(newPos);
      } else {
        alert("Location not found. Please try a different city.");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!address) {
      alert("Please click on the map to pick a specific location!");
      return;
    }
    onSelect({
      city: address.city,
      area: address.area,
      coordinates: `${position[0].toFixed(2)}, ${position[1].toFixed(2)}`,
      type: "Selected from Map"
    });
    onClose();
  };

  return (
    <div className="map-modal-overlay">
      <div className="map-modal-content">
        <div className="map-modal-header">
          <div className="header-title">
            <MapPin size={20} color="var(--primary-color)" />
            <h3>Select Delivery Location</h3>
          </div>
          <button className="close-modal" onClick={onClose}><X /></button>
        </div>

        <div className="map-search-bar">
          <form onSubmit={handleSearch}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search for your city or area (e.g. Mumbai, Indiranagar)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? <Loader className="animate-spin" size={16} /> : "SEARCH"}
            </button>
          </form>
        </div>

        <div className="map-container-wrapper">
          <MapContainer center={position} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>

        <div className="map-modal-footer">
          <div className="selected-address-info">
            {address ? (
              <>
                <strong>{address.area}</strong>
                <p>{address.city}</p>
              </>
            ) : (
              <p>Click on the map or use search to select location</p>
            )}
          </div>
          <button className="confirm-location-btn" onClick={handleConfirm} disabled={!address}>
            CONFIRM LOCATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
