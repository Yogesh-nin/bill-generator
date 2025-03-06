import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, ReceiptText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-start">
      {/* Sidebar for Large Screens */}
      <div className="hidden lg:flex flex-col w-64 h-screen bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <NavItem href={'/home'} icon={<Home size={20} />} label="Customer List" />
          <NavItem href={'/bill-generator'} icon={<ReceiptText size={20} />} label="Bill Generator" />
        </nav>
      </div>

      {/* Mobile Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="lg:hidden absolute p-3 items-start">
            <Menu size={28} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-900 text-white p-5">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-4">
            <NavItem icon={<Home size={20} />} label="Customer List" href="/home" />
            <NavItem icon={<ReceiptText size={20} />} label="Bill Generator" href="/bill-generator" />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string;  href: string}> = ({ icon, label, href }) => {
    const location = useLocation();
    const currentPath = location.pathname;
  return (
      <Link
          to={href}
      className={cn(
          "flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer !text-white",
          currentPath === href ? 'bg-gray-700' : ''
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
