
import React, { useState } from 'react';
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';
import PhotoUploader from './PhotoUploader';
import EmployeeFormFields, { employeeFormSchema, type EmployeeFormSchema } from './EmployeeFormFields';

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormSchema & { photo?: string | null }) => void;
  initialData?: EmployeeFormSchema;
  isEditing?: boolean;
}

const EmployeeForm = ({ onSubmit, initialData, isEditing = false }: EmployeeFormProps) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<EmployeeFormSchema>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: initialData || {
      name: "",
      nationalId: "",
      phone: "",
      company: "",
      position: "",
      email: "",
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

  const handleFormSubmit = (values: EmployeeFormSchema) => {
    const submissionData = {
      ...values,
      photo: photoPreview
    };
    onSubmit(submissionData);
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Employee" : "Register New Employee"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <PhotoUploader 
                photoPreview={photoPreview} 
                onPhotoChange={handlePhotoChange} 
              />
              
              <EmployeeFormFields form={form} />
            </div>
            
            <CardFooter className="px-0 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" className="bg-access-primary hover:bg-access-secondary">
                {isEditing ? "Update Employee" : "Register Employee"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EmployeeForm;
