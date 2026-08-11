// pages/admin/Customers.jsx
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import CustomersTable from "../../components/admin/customers/CustomersTable";
import { mockCustomers } from "../../data/customers/mockCustomers";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Customers</h1>
        <p className="text-sm text-gray-500">
          {filteredCustomers.length} customer
          {filteredCustomers.length !== 1 && "s"}
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full border border-gray-200 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-gray-400"
        />
      </div>

      <CustomersTable customers={filteredCustomers} />
    </div>
  );
};

export default Customers;
