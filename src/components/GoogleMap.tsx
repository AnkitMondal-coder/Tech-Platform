import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  name: string;
  description: string;
  urgency: 'critical' | 'high' | 'medium';
}

interface GoogleMapProps {
  locations: Location[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  locations, 
  center = { lat: 20, lng: 0 }, 
  zoom = 2,
  height = '400px'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // For demo purposes, we'll create a styled map placeholder
    // In production, you would integrate with Google Maps API
    if (mapRef.current && !mapInstanceRef.current) {
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    // This is a placeholder implementation
    // In production, you would use Google Maps JavaScript API
    console.log('Google Maps would be initialized here with API key');
  };

  const getMarkerColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="relative">
      <div 
        ref={mapRef}
        className="w-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl relative overflow-hidden"
        style={{ height }}
      >
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            {/* Continents outline */}
            <path
              d="M50,80 Q80,70 120,85 Q160,75 200,90 Q240,80 280,95 Q320,85 350,100"
              stroke="#6B7280"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M30,120 Q70,110 110,125 Q150,115 190,130 Q230,120 270,135"
              stroke="#6B7280"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M60,160 Q100,150 140,165 Q180,155 220,170 Q260,160 300,175"
              stroke="#6B7280"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Location Markers */}
        {locations.map((location, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${20 + (index * 15) % 60}%`,
              top: `${30 + (index * 20) % 40}%`
            }}
          >
            <div className={`w-6 h-6 rounded-full animate-pulse ${getMarkerColor(location.urgency)}`}>
              <div className={`w-6 h-6 rounded-full animate-ping ${getMarkerColor(location.urgency)}`}></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-max opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <h4 className="font-semibold text-gray-900 text-sm">{location.name}</h4>
              <p className="text-xs text-gray-600">{location.description}</p>
              <div className="flex items-center mt-1">
                <div className={`w-2 h-2 rounded-full mr-1 ${getMarkerColor(location.urgency)}`}></div>
                <span className="text-xs text-gray-500 capitalize">{location.urgency}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
          <button className="block w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
            <span className="text-lg font-bold text-gray-600">+</span>
          </button>
          <button className="block w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
            <span className="text-lg font-bold text-gray-600">−</span>
          </button>
        </div>

        {/* Center indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MapPin className="w-8 h-8 text-purple-600" />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
        <h4 className="font-medium text-gray-900 mb-3">Urgency Levels</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Critical</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">High</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Medium</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * In production, this would be integrated with Google Maps API for real location data
        </p>
      </div>
    </div>
  );
};

export default GoogleMap;