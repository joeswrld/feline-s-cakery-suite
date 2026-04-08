import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Settings, Upload, Lock, Image } from "lucide-react";

const AdminSettings = () => {
  const queryClient = useQueryClient();

  // Password change
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // Logo
  const [uploading, setUploading] = useState(false);

  const { data: logoUrl } = useQuery({
    queryKey: ["site-logo"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "logo_url")
        .maybeSingle();
      return data?.value || null;
    },
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setChangingPassword(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `branding/logo.${ext}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("cake-images")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast.error("Failed to upload logo");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("cake-images")
      .getPublicUrl(path);

    // Add cache buster
    const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

    // Update site_settings
    const { error: updateError } = await supabase
      .from("site_settings")
      .update({ value: publicUrl })
      .eq("key", "logo_url");

    setUploading(false);

    if (updateError) {
      toast.error("Failed to save logo setting");
    } else {
      toast.success("Logo updated! It will appear across the entire site.");
      queryClient.invalidateQueries({ queryKey: ["site-logo"] });
    }
  };

  const handleRemoveLogo = async () => {
    const { error } = await supabase
      .from("site_settings")
      .update({ value: null })
      .eq("key", "logo_url");

    if (error) {
      toast.error("Failed to remove logo");
    } else {
      toast.success("Logo removed — text branding restored");
      queryClient.invalidateQueries({ queryKey: ["site-logo"] });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
        <Settings className="w-6 h-6" /> Settings
      </h1>

      {/* Logo Management */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <h2 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
          <Image className="w-5 h-5" /> Site Logo
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Upload a logo to replace the text brand name across the entire website, including the browser tab.
        </p>

        {logoUrl && (
          <div className="mb-4 flex items-center gap-4">
            <div className="w-32 h-16 rounded-lg border border-border bg-secondary flex items-center justify-center overflow-hidden p-2">
              <img src={logoUrl} alt="Current logo" className="max-w-full max-h-full object-contain" />
            </div>
            <button
              onClick={handleRemoveLogo}
              className="text-sm text-destructive hover:underline"
            >
              Remove logo
            </button>
          </div>
        )}

        <label className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg font-medium cursor-pointer hover:opacity-90 transition-opacity">
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : logoUrl ? "Change Logo" : "Upload Logo"}
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
        <p className="text-xs text-muted-foreground mt-2">
          Recommended: PNG with transparent background, at least 200px wide.
        </p>
      </div>

      {/* Password Change */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" /> Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            disabled={changingPassword}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {changingPassword ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
