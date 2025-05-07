import React from 'react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  plateNumber: z.string().min(2, { message: "Plate number is required." }),
  vehicleModel: z.string().min(2, { message: "Vehicle model is required." }),
  vehicleColor: z.string().min(2, { message: "Vehicle color is required." }),
  ownerName: z.string().min(2, { message: "Owner name is required." }),
  ownerNationalId: z.string().min(2, { message: "Owner National ID is required." }),
  company: z.string().min(2, { message: "Company name is required." }),
  phone: z.string().min(6, { message: "Phone number is required." }),
  expiryDate: z.string().min(1, { message: "Expiry date is required." }),
});

interface VehicleFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  initialData?: z.infer<typeof formSchema>;
  isEditing?: boolean;
}

const VehicleForm = ({ onSubmit, initialData, isEditing = false }: VehicleFormProps) => {
  const [photo, setPhoto] = React.useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      plateNumber: "",
      vehicleModel: "",
      vehicleColor: "",
      ownerName: "",
      ownerNationalId: "",
      company: "",
      phone: "",
      expiryDate: new Date().toISOString().split('T')[0],
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotoPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    const submissionData = {
      ...values,
      photo: photoPreview
    };
    onSubmit(submissionData);
  };

  const handleCancel = () => {
    navigate('/vehicles');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Vehicle" : "Register New Vehicle"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Vehicle photo upload */}
              <div className="w-full md:w-1/3">
                <FormLabel className="block mb-2">Vehicle Photo</FormLabel>
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
                  <div className="w-40 h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <Upload className="h-10 w-10 mb-2" />
                        <span>No photo</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="vehiclePhoto"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="vehiclePhoto"
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm text-gray-700 inline-flex items-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Browse Photo
                  </label>
                </div>
              </div>
              
              <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="plateNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plate Number*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="vehicleModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="vehicleColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Color*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ownerNationalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner National ID*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date*</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <CardFooter className="px-0 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" className="bg-access-primary hover:bg-access-secondary">
                {isEditing ? "Update Vehicle" : "Register Vehicle"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VehicleForm;
