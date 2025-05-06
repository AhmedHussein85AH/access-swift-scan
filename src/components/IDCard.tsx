
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Download } from 'lucide-react';

interface IDCardProps {
  type: 'employee' | 'vehicle';
  data: {
    id: string;
    name?: string;
    nationalId?: string;
    company: string;
    position?: string;
    expiryDate: string;
    photo?: string;
    plateNumber?: string;
    vehicleModel?: string;
    vehicleColor?: string;
  };
  onPrint?: () => void;
}

const IDCard = ({ type, data, onPrint }: IDCardProps) => {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const renderEmployeeCard = () => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden w-[340px] shadow-md print:shadow-none" id="printable-card">
      <div className="bg-access-primary text-white p-4 text-center">
        <h3 className="font-bold">{data.company}</h3>
        <p className="text-xs uppercase">Employee Identification</p>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            {data.photo ? (
              <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Photo
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{data.name}</h3>
            <p className="text-gray-600 text-sm">{data.position}</p>
          </div>
        </div>
        
        <div className="mt-4 text-sm space-y-1">
          <div className="flex">
            <div className="w-24 text-gray-500">ID:</div>
            <div className="font-medium">{data.id}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">National ID:</div>
            <div className="font-medium">{data.nationalId}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">Expires:</div>
            <div className="font-medium">{data.expiryDate}</div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <div>
            <div className="p-2 bg-gray-100 rounded-md">
              {/* In a real app, we would generate an actual QR code here */}
              <div className="w-32 h-32 border border-gray-300 flex items-center justify-center text-gray-400">
                QR Code
              </div>
            </div>
            <p className="text-xs text-center mt-1">ID: {data.id}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVehicleCard = () => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden w-[340px] shadow-md print:shadow-none" id="printable-card">
      <div className="bg-access-secondary text-white p-4 text-center">
        <h3 className="font-bold">{data.company}</h3>
        <p className="text-xs uppercase">Vehicle Identification</p>
      </div>
      <div className="p-4">
        <div className="space-y-1 text-sm">
          <div className="flex">
            <div className="w-28 text-gray-500">ID:</div>
            <div className="font-medium">{data.id}</div>
          </div>
          <div className="flex">
            <div className="w-28 text-gray-500">Plate Number:</div>
            <div className="font-medium">{data.plateNumber}</div>
          </div>
          <div className="flex">
            <div className="w-28 text-gray-500">Model:</div>
            <div className="font-medium">{data.vehicleModel}</div>
          </div>
          <div className="flex">
            <div className="w-28 text-gray-500">Color:</div>
            <div className="font-medium">{data.vehicleColor}</div>
          </div>
          <div className="flex">
            <div className="w-28 text-gray-500">Owner:</div>
            <div className="font-medium">{data.name}</div>
          </div>
          <div className="flex">
            <div className="w-28 text-gray-500">Expires:</div>
            <div className="font-medium">{data.expiryDate}</div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <div>
            <div className="p-2 bg-gray-100 rounded-md">
              {/* In a real app, we would generate an actual QR code here */}
              <div className="w-32 h-32 border border-gray-300 flex items-center justify-center text-gray-400">
                QR Code
              </div>
            </div>
            <p className="text-xs text-center mt-1">ID: {data.id}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      {type === 'employee' ? renderEmployeeCard() : renderVehicleCard()}
      
      <div className="mt-4 flex space-x-2 print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default IDCard;
