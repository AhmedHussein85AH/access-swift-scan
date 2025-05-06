
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
import { User, UserPlus, Trash2 } from 'lucide-react';
import IDCard from '@/components/IDCard';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Mock data for the employees
const mockEmployees = [
  {
    id: "EMP-001",
    name: "John Doe",
    nationalId: "1234567890",
    phone: "123-456-7890",
    company: "ABC Corporation",
    position: "Manager",
    email: "john@example.com",
    expiryDate: "2023-12-31",
    status: "Active",
  },
  {
    id: "EMP-002",
    name: "Jane Smith",
    nationalId: "0987654321",
    phone: "098-765-4321",
    company: "XYZ Industries",
    position: "Engineer",
    email: "jane@example.com",
    expiryDate: "2023-10-15",
    status: "Expired",
  },
  {
    id: "EMP-003",
    name: "Robert Johnson",
    nationalId: "5678901234",
    phone: "567-890-1234",
    company: "ABC Corporation",
    position: "Technician",
    email: "robert@example.com",
    expiryDate: "2024-06-30",
    status: "Active",
  },
  {
    id: "EMP-004",
    name: "Maria Garcia",
    nationalId: "9012345678",
    phone: "901-234-5678",
    company: "Global Services",
    position: "Administrator",
    email: "maria@example.com",
    expiryDate: "2024-03-15",
    status: "Active",
  },
  {
    id: "EMP-005",
    name: "David Wilson",
    nationalId: "3456789012",
    phone: "345-678-9012",
    company: "XYZ Industries",
    position: "Supervisor",
    email: "david@example.com",
    expiryDate: "2023-09-30",
    status: "Deactivated",
  },
];

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "nationalId",
    label: "National ID",
  },
  {
    key: "company",
    label: "Company",
  },
  {
    key: "phone",
    label: "Phone",
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

const Employees = () => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showIDCard, setShowIDCard] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (query: string, type: string) => {
    const filtered = employees.filter(employee => {
      const searchTerm = query.toLowerCase();
      switch (type) {
        case "name":
          return employee.name.toLowerCase().includes(searchTerm);
        case "nationalId":
          return employee.nationalId.toLowerCase().includes(searchTerm);
        case "phone":
          return employee.phone.toLowerCase().includes(searchTerm);
        case "company":
          return employee.company.toLowerCase().includes(searchTerm);
        default:
          return employee.name.toLowerCase().includes(searchTerm) ||
            employee.nationalId.toLowerCase().includes(searchTerm) ||
            employee.phone.toLowerCase().includes(searchTerm) ||
            employee.company.toLowerCase().includes(searchTerm);
      }
    });
    setFilteredEmployees(filtered);
  };

  const handleView = (employee: any) => {
    setSelectedEmployee(employee);
    setShowIDCard(true);
  };

  const handleEdit = (employee: any) => {
    navigate(`/employees/edit/${employee.id}`);
  };

  const handleDelete = (employee: any) => {
    setSelectedEmployee(employee);
    setConfirmDelete(true);
  };

  const confirmDeactivation = () => {
    if (!selectedEmployee) return;
    
    // In a real app, we would call an API to deactivate the employee
    const updatedEmployees = employees.map(emp => 
      emp.id === selectedEmployee.id ? { ...emp, status: "Deactivated" } : emp
    );
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    
    toast({
      title: "Employee Deactivated",
      description: `${selectedEmployee.name} has been deactivated successfully.`,
    });
    
    setConfirmDelete(false);
  };

  const handlePrint = (employee: any) => {
    setSelectedEmployee(employee);
    setShowIDCard(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl font-bold text-access-primary flex items-center">
            <User className="mr-2 h-6 w-6" />
            Employees
          </h1>
          <Button 
            className="mt-2 md:mt-0 bg-access-primary hover:bg-access-secondary"
            onClick={() => navigate('/employees/new')}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            New Employee
          </Button>
        </div>
        
        <div className="space-y-4">
          <SearchBar onSearch={handleSearch} />
          
          <DataTable 
            columns={columns}
            data={filteredEmployees}
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
              <DialogTitle>Employee ID Card</DialogTitle>
            </DialogHeader>
            {selectedEmployee && (
              <IDCard 
                type="employee"
                data={{
                  id: selectedEmployee.id,
                  name: selectedEmployee.name,
                  nationalId: selectedEmployee.nationalId,
                  company: selectedEmployee.company,
                  position: selectedEmployee.position,
                  expiryDate: selectedEmployee.expiryDate,
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Confirm Deactivation Dialog */}
        <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deactivate Employee</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to deactivate {selectedEmployee?.name}? This action can be reversed later.
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

export default Employees;
