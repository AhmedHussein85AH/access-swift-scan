
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode } from 'lucide-react';

interface QRScannerProps {
  onScan?: (data: string) => void;
}

interface ScanResult {
  id: string;
  name: string;
  type: "Employee" | "Vehicle";
  status: "Active" | "Expired" | "Deactivated";
  reason?: string;
  company: string;
  expiryDate: string;
}

const QRScanner = ({ onScan }: QRScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const startScanner = () => {
    setScanning(true);
    // In a real app, we would start the camera and QR scanner here
    // For demo, we'll simulate a scan after a short delay
    setTimeout(() => {
      const mockResult: ScanResult = {
        id: "EMP-123456",
        name: "John Doe",
        type: "Employee",
        status: "Active",
        company: "ABC Corporation",
        expiryDate: "2024-12-31"
      };
      
      handleScan(mockResult);
    }, 2000);
  };

  const handleScan = (data: ScanResult) => {
    setScanning(false);
    setResult(data);
    if (onScan) {
      onScan(JSON.stringify(data));
    }
  };

  const resetScanner = () => {
    setResult(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-access-success">Active</Badge>;
      case 'Expired':
        return <Badge className="bg-access-warning">Expired</Badge>;
      case 'Deactivated':
        return <Badge className="bg-access-danger">Deactivated</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-access-primary flex items-center">
          <QrCode className="mr-2 h-6 w-6" />
          QR Scanner
        </CardTitle>
        <CardDescription>Scan employee or vehicle ID badges</CardDescription>
      </CardHeader>
      <CardContent>
        {!scanning && !result ? (
          <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
            <QrCode className="h-20 w-20 text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4 text-center">
              Position the QR code within the scanner area to verify ID
            </p>
            <Button onClick={startScanner} className="bg-access-primary hover:bg-access-secondary">
              Start Scanner
            </Button>
          </div>
        ) : scanning ? (
          <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg animate-pulse bg-gray-100">
            <QrCode className="h-20 w-20 text-access-secondary mb-4" />
            <p className="text-gray-700">Scanning...</p>
          </div>
        ) : result ? (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <div className="flex justify-between items-center">
                <div className="font-semibold">{result.name}</div>
                {getStatusBadge(result.status)}
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">ID:</div>
                <div>{result.id}</div>
                <div className="text-gray-500">Type:</div>
                <div>{result.type}</div>
                <div className="text-gray-500">Company:</div>
                <div>{result.company}</div>
                <div className="text-gray-500">Expires:</div>
                <div>{result.expiryDate}</div>
                {result.reason && (
                  <>
                    <div className="text-gray-500">Reason:</div>
                    <div className="text-access-danger">{result.reason}</div>
                  </>
                )}
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={resetScanner} variant="outline">
                  Scan Another
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default QRScanner;
