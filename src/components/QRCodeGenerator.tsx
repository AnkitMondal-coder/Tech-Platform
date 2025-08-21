import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download } from 'lucide-react';

interface QRCodeGeneratorProps {
  url?: string;
  size?: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  url = window.location.origin, 
  size = 200 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: size,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      });
    }
  }, [url, size]);

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'hopeconnect-qr.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <QrCode className="w-6 h-6 text-purple-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Scan to Access</h3>
      </div>
      <div className="flex justify-center mb-4">
        <canvas ref={canvasRef} className="border border-gray-200 rounded-lg" />
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Scan this QR code to access HopeConnect on your mobile device
      </p>
      <button
        onClick={downloadQR}
        className="flex items-center justify-center mx-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
      >
        <Download className="w-4 h-4 mr-2" />
        Download QR
      </button>
    </div>
  );
};

export default QRCodeGenerator;