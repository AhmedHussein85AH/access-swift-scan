
import React from 'react';
import Layout from '@/components/Layout';
import EmployeeForm from '@/components/employee/EmployeeForm';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const NewEmployee = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // In a real app, we would call an API to create the employee
    console.log("Creating new employee:", data);
    
    // For demo purposes, store in localStorage until database is connected
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const newEmployee = {
      ...data,
      id: `EMP-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      status: "Active"
    };
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
    
    toast({
      title: "Employee Registered",
      description: "New employee has been registered successfully.",
    });
    
    // Navigate back to employees list
    navigate('/employees');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-access-primary flex items-center">
            <User className="mr-2 h-6 w-6" />
            Register New Employee
          </h1>
        </div>
        
        <EmployeeForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default NewEmployee;
