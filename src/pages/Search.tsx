
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import DataTable from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Car, Search as SearchIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data from other components
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
  // ... more employees
];

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
  // ... more vehicles
];

const employeeColumns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "nationalId", label: "National ID" },
  { key: "company", label: "Company" },
  { key: "phone", label: "Phone" },
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

const vehicleColumns = [
  { key: "plateNumber", label: "Plate Number" },
  { key: "vehicleModel", label: "Model" },
  { key: "ownerName", label: "Owner" },
  { key: "company", label: "Company" },
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

const Search = () => {
  const [searchType, setSearchType] = useState("employees");
  const [searchedEmployees, setSearchedEmployees] = useState<any[]>([]);
  const [searchedVehicles, setSearchedVehicles] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const { toast } = useToast();

  const handleEmployeeSearch = (query: string, type: string) => {
    setHasSearched(true);
    
    const filtered = mockEmployees.filter(employee => {
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
    
    setSearchedEmployees(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "No Results Found",
        description: "No employees match your search criteria.",
      });
    } else {
      toast({
        title: "Search Completed",
        description: `Found ${filtered.length} employee(s).`,
      });
    }
  };

  const handleVehicleSearch = (query: string, type: string) => {
    setHasSearched(true);
    
    const filtered = mockVehicles.filter(vehicle => {
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
    
    setSearchedVehicles(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "No Results Found",
        description: "No vehicles match your search criteria.",
      });
    } else {
      toast({
        title: "Search Completed",
        description: `Found ${filtered.length} vehicle(s).`,
      });
    }
  };

  const handleSearch = (query: string, type: string) => {
    if (searchType === "employees") {
      handleEmployeeSearch(query, type);
    } else {
      handleVehicleSearch(query, type);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-access-primary flex items-center">
            <SearchIcon className="mr-2 h-6 w-6" />
            Advanced Search
          </h1>
        </div>
        
        <Tabs defaultValue="employees" onValueChange={setSearchType}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="employees" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Employees
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center">
              <Car className="mr-2 h-4 w-4" />
              Vehicles
            </TabsTrigger>
          </TabsList>
          
          <Card className="mt-4 border-t-0 rounded-tl-none">
            <CardHeader>
              <CardTitle className="text-lg">Search Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <SearchBar onSearch={handleSearch} />
            </CardContent>
          </Card>
          
          <TabsContent value="employees" className="mt-6 pt-2 border-t">
            {hasSearched ? (
              searchedEmployees.length > 0 ? (
                <DataTable
                  columns={employeeColumns}
                  data={searchedEmployees}
                />
              ) : (
                <div className="text-center p-8 text-gray-500">
                  No employee records found matching your search criteria
                </div>
              )
            ) : (
              <div className="text-center p-8 text-gray-500">
                Use the search above to find employee records
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="vehicles" className="mt-6 pt-2 border-t">
            {hasSearched ? (
              searchedVehicles.length > 0 ? (
                <DataTable
                  columns={vehicleColumns}
                  data={searchedVehicles}
                />
              ) : (
                <div className="text-center p-8 text-gray-500">
                  No vehicle records found matching your search criteria
                </div>
              )
            ) : (
              <div className="text-center p-8 text-gray-500">
                Use the search above to find vehicle records
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Search;
