// components/admin/layout/AdminSidebar.jsx
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Box,
  Users,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/products", label: "Products", icon: Box },
  // { to: "/admin/customers", label: "Customers", icon: Users },
  // { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile backdrop — only visible when open, tapping it closes the drawer */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
        />
      )}

      <aside
        className={` font-montserrat bg-white border-r border-gray-200 h-screen flex flex-col
          fixed md:sticky top-0 z-30 transition-all duration-200

          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isOpen ? "w-56" : "w-56 md:w-16"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-5">
          <Link to="/" className="flex items-center">
            <img
              src="/images/brand/fizzaura_logo.png"
              alt="FizzAura Luxury Logo"
              className="w-14 h-auto invert"
            />
            <span
              className={`font-semibold text-gray-900 text-[15px] transition-opacity ${
                isOpen ? "opacity-100" : "md:opacity-0 md:w-0 overflow-hidden"
              }`}
            >
              FizzAura
            </span>
          </Link>
          <button onClick={onClose} className="md:hidden text-gray-400">
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {navItems.map(({ to, label, icon, end }) => {
            const Icon = icon;
            return (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <Icon size={17} className="shrink-0" />
                <span className={isOpen ? "inline" : "md:hidden inline"}>
                  {label}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
