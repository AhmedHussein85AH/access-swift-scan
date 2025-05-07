
import React from 'react';
import Layout from '@/components/Layout';
import VehicleForm from '@/components/VehicleForm';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { Car, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewVehicle = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // In a real app, we would call an API to create the vehicle
    console.log("Creating new vehicle:", data);
    
    toast({
      title: "Vehicle Registered",
      description: "New vehicle has been registered successfully.",
    });
    
    // Navigate back to vehicles list
    navigate('/vehicles');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800 flex items-center">
            <Car className="mr-2 h-6 w-6 text-access-primary" />
            Register New Vehicle
          </h1>
          <Button variant="default" className="bg-indigo-500 hover:bg-indigo-600">
            <Plus className="mr-1 h-4 w-4" />
            إضافة جديد
          </Button>
        </div>
        
        <VehicleForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default NewVehicle;
