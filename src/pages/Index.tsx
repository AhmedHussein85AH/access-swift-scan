
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import QRScanner from '@/components/QRScanner';
import { User, Car, QrCode, Calendar, Search, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

const Index = () => {
  const { toast } = useToast();

  const stats = [
    {
      title: "Total Employees",
      value: 142,
      icon: <User className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Total Vehicles",
      value: 53,
      icon: <Car className="h-5 w-5" />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Valid IDs",
      value: 178,
      icon: <QrCode className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Expiring Soon",
      value: 12,
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-700",
    },
  ];

  const handleScan = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      toast({
        title: "QR Scan Successful",
        description: `Verified ${parsedData.type}: ${parsedData.name}`,
      });
    } catch (error) {
      console.error("Error parsing scan data", error);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl font-bold text-access-primary">Dashboard</h1>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            <Button asChild className="bg-access-primary hover:bg-access-secondary">
              <Link to="/employees/new">
                <User className="h-4 w-4 mr-2" />
                New Employee
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/vehicles/new">
                <Car className="h-4 w-4 mr-2" />
                New Vehicle
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* QR Scanner */}
          <div className="lg:col-span-1">
            <QRScanner onScan={handleScan} />
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-access-primary">
                  <Search className="mr-2 h-5 w-5" />
                  Quick Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Search for employees or vehicles by name, ID, or company.
                </p>
                <Button asChild className="w-full bg-access-secondary hover:bg-access-primary">
                  <Link to="/search">
                    Go to Search
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-access-primary">
                  <Upload className="mr-2 h-5 w-5" />
                  Bulk Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Upload multiple employee or vehicle records at once.
                </p>
                <Button asChild className="w-full bg-access-secondary hover:bg-access-primary">
                  <Link to="/upload">
                    Go to Bulk Upload
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-access-primary">
                  <Calendar className="mr-2 h-5 w-5" />
                  Expiration Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Manage ID expiration dates and view upcoming expirations.
                </p>
                <Button asChild className="w-full bg-access-secondary hover:bg-access-primary">
                  <Link to="/expiration">
                    Manage Expirations
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-access-primary">
                  <QrCode className="mr-2 h-5 w-5" />
                  Scanner App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Dedicated scanner for validating employee and vehicle IDs.
                </p>
                <Button asChild className="w-full bg-access-secondary hover:bg-access-primary">
                  <Link to="/scanner">
                    Open Scanner
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
