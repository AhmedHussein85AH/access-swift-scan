
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DataTable from '@/components/DataTable';
import SearchBar from '@/components/SearchBar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Car, Trash2 } from 'lucide-react';
import IDCard from '@/components/IDCard';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Mock data for the vehicles
const mockVehicles = [
  {
    id: "VEH-001",
    plateNumber: "ABC 123",
    vehicleModel: "Toyota Corolla",
    vehicleColor: "White",
    ownerName: "John Doe",
    ownerNationalId: "1234567890",
    company: "ABC Corporation",
    phone: "123-456-7890",
    expiryDate: "2023-12-31",
    status: "Active",
  },
  {
    id: "VEH-002",
    plateNumber: "XYZ 789",
    vehicleModel: "Honda Civic",
    vehicleColor: "Black",
    ownerName: "Jane Smith",
    ownerNationalId: "0987654321",
    company: "XYZ Industries",
    phone: "098-765-4321",
    expiryDate: "2023-10-15",
    status: "Expired",
  },
  {
    id: "VEH-003",
    plateNumber: "DEF 456",
    vehicleModel: "Ford F-150",
    vehicleColor: "Blue",
    ownerName: "Robert Johnson",
    ownerNationalId: "5678901234",
    company: "ABC Corporation",
    phone: "567-890-1234",
    expiryDate: "2024-06-30",
    status: "Active",
  },
  {
    id: "VEH-004",
    plateNumber: "GHI 789",
    vehicleModel: "Chevrolet Malibu",
    vehicleColor: "Red",
    ownerName: "Maria Garcia",
    ownerNationalId: "9012345678",
    company: "Global Services",
    phone: "901-234-5678",
    expiryDate: "2024-03-15",
    status: "Active",
  },
  {
    id: "VEH-005",
    plateNumber: "JKL 012",
    vehicleModel: "Nissan Altima",
    vehicleColor: "Silver",
    ownerName: "David Wilson",
    ownerNationalId: "3456789012",
    company: "XYZ Industries",
    phone: "345-678-9012",
    expiryDate: "2023-09-30",
    status: "Deactivated",
  },
];

const columns = [
  {
    key: "plateNumber",
    label: "Plate Number",
  },
  {
    key: "vehicleModel",
    label: "Model",
  },
  {
    key: "vehicleColor",
    label: "Color",
  },
  {
    key: "ownerName",
    label: "Owner",
  },
  {
    key: "company",
    label: "Company",
  },
  {
    key: "expiryDate",
    label: "Expires",
  },
  {
    key: "status",
    label: "Status",
    format: (value: string) => {
      switch (value) {
        case "Active":
          return <Badge className="bg-access-success">Active</Badge>;
        case "Expired":
          return <Badge className="bg-access-warning">Expired</Badge>;
        case "Deactivated":
          return <Badge className="bg-access-danger">Deactivated</Badge>;
        default:
          return <Badge>{value}</Badge>;
      }
    },
  },
];

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [showIDCard, setShowIDCard] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (query: string, type: string) => {
    const filtered = vehicles.filter(vehicle => {
      const searchTerm = query.toLowerCase();
      switch (type) {
        case "name":
          return vehicle.ownerName.toLowerCase().includes(searchTerm);
        case "nationalId":
          return vehicle.ownerNationalId.toLowerCase().includes(searchTerm);
        case "phone":
          return vehicle.phone.toLowerCase().includes(searchTerm);
        case "company":
          return vehicle.company.toLowerCase().includes(searchTerm);
        default:
          return vehicle.plateNumber.toLowerCase().includes(searchTerm) ||
            vehicle.ownerName.toLowerCase().includes(searchTerm) ||
            vehicle.company.toLowerCase().includes(searchTerm);
      }
    });
    setFilteredVehicles(filtered);
  };

  const handleView = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowIDCard(true);
  };

  const handleEdit = (vehicle: any) => {
    navigate(`/vehicles/edit/${vehicle.id}`);
  };

  const handleDelete = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setConfirmDelete(true);
  };

  const confirmDeactivation = () => {
    if (!selectedVehicle) return;
    
    // In a real app, we would call an API to deactivate the vehicle
    const updatedVehicles = vehicles.map(veh => 
      veh.id === selectedVehicle.id ? { ...veh, status: "Deactivated" } : veh
    );
    setVehicles(updatedVehicles);
    setFilteredVehicles(updatedVehicles);
    
    toast({
      title: "Vehicle Deactivated",
      description: `Vehicle ${selectedVehicle.plateNumber} has been deactivated successfully.`,
    });
    
    setConfirmDelete(false);
  };

  const handlePrint = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowIDCard(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl font-bold text-access-primary flex items-center">
            <Car className="mr-2 h-6 w-6" />
            Vehicles
          </h1>
          <Button 
            className="mt-2 md:mt-0 bg-access-primary hover:bg-access-secondary"
            onClick={() => navigate('/vehicles/new')}
          >
            <Car className="h-4 w-4 mr-2" />
            New Vehicle
          </Button>
        </div>
        
        <div className="space-y-4">
          <SearchBar onSearch={handleSearch} />
          
          <DataTable 
            columns={columns}
            data={filteredVehicles}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPrint={handlePrint}
          />
        </div>

        {/* ID Card Dialog */}
        <Dialog open={showIDCard} onOpenChange={setShowIDCard}>
          <DialogContent className="sm:max-w-md flex flex-col items-center">
            <DialogHeader>
              <DialogTitle>Vehicle ID Card</DialogTitle>
            </DialogHeader>
            {selectedVehicle && (
              <IDCard 
                type="vehicle"
                data={{
                  id: selectedVehicle.id,
                  name: selectedVehicle.ownerName,
                  company: selectedVehicle.company,
                  expiryDate: selectedVehicle.expiryDate,
                  plateNumber: selectedVehicle.plateNumber,
                  vehicleModel: selectedVehicle.vehicleModel,
                  vehicleColor: selectedVehicle.vehicleColor,
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Confirm Deactivation Dialog */}
        <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deactivate Vehicle</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to deactivate vehicle {selectedVehicle?.plateNumber}? This action can be reversed later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-destructive hover:bg-destructive/90"
                onClick={confirmDeactivation}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Deactivate
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Vehicles;
