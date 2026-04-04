import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import { Cake, MessageSquare, LogOut } from "lucide-react";

const Admin = () => {
  const [tab, setTab] = useState<"products" | "testimonials">("products");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin/login");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }
      setLoading(false);
    };
    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/admin/login");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-secondary text-muted-foreground">Loading...</div>;
  }

  const navItems = [
    { key: "products" as const, label: "Products", icon: Cake },
    { key: "testimonials" as const, label: "Testimonials", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6 flex flex-col shrink-0 hidden md:flex">
        <h2 className="text-xl font-serif font-bold text-foreground mb-8">Admin Panel</h2>
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                tab === item.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h2 className="font-serif font-bold text-foreground">Admin</h2>
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`p-2 rounded-lg ${tab === item.key ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
          <button onClick={handleLogout} className="p-2 text-muted-foreground">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 mt-14 md:mt-0 overflow-auto">
        {tab === "products" ? <AdminProducts /> : <AdminTestimonials />}
      </main>
    </div>
  );
};

export default Admin;
