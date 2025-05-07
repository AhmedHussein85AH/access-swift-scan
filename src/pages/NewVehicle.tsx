
import React from 'react';
import Layout from '@/components/Layout';
import VehicleForm from '@/components/VehicleForm';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';

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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-access-primary flex items-center">
            <Car className="mr-2 h-6 w-6" />
            Register New Vehicle
          </h1>
        </div>
        
        <VehicleForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default NewVehicle;
