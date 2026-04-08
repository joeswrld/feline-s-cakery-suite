import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserPlus, Trash2, Users } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

const AdminUsers = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke("manage-admin-users", {
        body: { action: "list" },
      });
      if (res.error) throw res.error;
      return (res.data as { users: AdminUser[] }).users;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const res = await supabase.functions.invoke("manage-admin-users", {
        body: { action: "create", email, password },
      });
      if (res.error) throw res.error;
      if (res.data?.error) throw new Error(res.data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Admin user added");
      setEmail("");
      setPassword("");
    },
    onError: (err: any) => toast.error(err.message || "Failed to add user"),
  });

  const removeMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await supabase.functions.invoke("manage-admin-users", {
        body: { action: "delete", userId },
      });
      if (res.error) throw res.error;
      if (res.data?.error) throw new Error(res.data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Admin access removed");
    },
    onError: (err: any) => toast.error(err.message || "Failed to remove user"),
  });

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
        <Users className="w-6 h-6" /> Admin Users
      </h1>

      {/* Add admin form */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <h2 className="text-lg font-medium text-foreground mb-4">Add Admin User</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addMutation.mutate();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Temporary password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            {addMutation.isPending ? "Adding..." : "Add"}
          </button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">
          The user can change their password after logging in.
        </p>
      </div>

      {/* Admin list */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-medium text-foreground">Current Admins</h2>
        </div>
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No admin users found</div>
        ) : (
          <div className="divide-y divide-border">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-foreground font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Added {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => removeMutation.mutate(user.id)}
                  disabled={removeMutation.isPending}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  title="Remove admin access"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
