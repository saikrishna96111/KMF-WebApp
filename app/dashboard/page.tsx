"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Dashboard from "@/components/Dashboard";
import { ChevronDown, Menu, X } from "lucide-react";

type SubLink = {
  name: string;
  path: string;
};

type LinkItem = {
  name: string;
  path: string;
  subLinks?: SubLink[];
};

type MenuItem = {
  label: string;
  links: LinkItem[];
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openNested, setOpenNested] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-red-600 font-medium">You must log in first.</p>
      </div>
    );

  const menuItems: MenuItem[] = [
    { label: "Dashboard", links: [{ name: "Overview", path: "/dashboard" }] },
    { label: "Master Data", links: [{ name: "Master Data", path: "/dashboard/master-data" }] },
    {
      label: "Operations",
      links: [
        {
          name: "Sales & Distribution",
          path: "/dashboard/operations/sales",
          subLinks: [
            { name: "Milk Product Sales", path: "/dashboard/operations/sales/milk-product" },
            { name: "Parlor Sales", path: "/dashboard/operations/sales/parlor" },
            { name: "Route & Dispatch", path: "/dashboard/operations/sales/route" },
          ],
        },
        { name: "Production & Quality", path: "/dashboard/operations/production" },
        { name: "Procurement & Input", path: "/dashboard/operations/procurement" },
        { name: "Inventory", path: "/dashboard/operations/inventory" },
      ],
    },
    { label: "Finance & Accounts", links: [{ name: "Finance & Accounts", path: "/dashboard/finance" }] },
    { label: "HR", links: [{ name: "HR", path: "/dashboard/hr" }] },
    { label: "Reports & MIS", links: [{ name: "Reports & MIS", path: "/dashboard/reports" }] },
    {
      label: "More",
      links: [
        { name: "Settings", path: "/dashboard/more/settings" },
        { name: "Help", path: "/dashboard/more/help" },
        { name: "Logout", path: "/logout" },
      ],
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpenDropdown(null);
    setOpenNested(null);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      <div
        className="fixed inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/myimage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <nav className="bg-white shadow-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-700">KMF Dashboard</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => {
                      // If item has a single link with no sublinks, navigate directly.
                      if (item.links.length === 1 && !item.links[0].subLinks) {
                        handleNavigation(item.links[0].path);
                        return;
                      }
                      setOpenDropdown(openDropdown === item.label ? null : item.label);
                    }
                    }
                    className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md font-medium transition"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50">
                      {item.links.map((link) => (
                        <div key={link.name} className="relative group">
                          <div
                            onClick={() => !link.subLinks && handleNavigation(link.path)}
                            className="flex items-center justify-between px-4 py-3 hover:bg-indigo-50 text-gray-700 cursor-pointer transition"
                          >
                            <span className="text-sm font-medium">{link.name}</span>
                            {link.subLinks && <ChevronDown className="w-4 h-4" />}
                          </div>

                          {link.subLinks && openNested === link.name && (
                            <div className="absolute top-0 left-full ml-1 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 py-2">
                              {link.subLinks.map((sub) => (
                                <div
                                  key={sub.name}
                                  onClick={() => handleNavigation(sub.path)}
                                  className="px-4 py-3 hover:bg-indigo-50 text-gray-700 cursor-pointer text-sm"
                                >
                                  {sub.name}
                                </div>
                              ))}
                            </div>
                          )}

                          {link.subLinks && (
                            <div
                              onMouseEnter={() => setOpenNested(link.name)}
                              onMouseLeave={() => setOpenNested(null)}
                              className="absolute inset-0"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
              {menuItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100">
                <button
                  onClick={() => {
                    // If item has a single link with no sublinks, navigate directly
                    if (item.links.length === 1 && !item.links[0].subLinks) {
                      handleNavigation(item.links[0].path);
                      return;
                    }
                    setOpenDropdown(openDropdown === item.label ? null : item.label);
                  }}
                  className="w-full px-6 py-4 text-left font-medium text-gray-700 hover:bg-indigo-50 flex justify-between items-center"
                >
                  {item.label}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === item.label && (
                  <div className="bg-gray-50">
                    {item.links.map((link) => (
                      <div key={link.name}>
                        <div
                          onClick={() => !link.subLinks && handleNavigation(link.path)}
                          className="px-8 py-3 text-gray-600 hover:bg-indigo-100 cursor-pointer"
                        >
                          {link.name}
                        </div>
                        {link.subLinks && openNested === link.name && (
                          <div className="bg-white ml-8">
                            {link.subLinks.map((sub) => (
                              <div
                                key={sub.name}
                                onClick={() => handleNavigation(sub.path)}
                                className="px-8 py-3 text-sm text-gray-600 hover:bg-indigo-50 cursor-pointer"
                              >
                                → {sub.name}
                              </div>
                            ))}
                          </div>
                        )}
                        {link.subLinks && (
                          <button
                            onClick={() =>
                              setOpenNested(openNested === link.name ? null : link.name)
                            }
                            className="px-8 py-2 text-xs text-indigo-600"
                          >
                            {openNested === link.name ? "Hide" : "Show"} Submenu
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <Dashboard />
      </main>
    </div>
  );
}
