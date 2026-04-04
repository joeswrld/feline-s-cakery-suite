import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";

const AdminTestimonials = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [message, setMessage] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const uploadPhoto = async (file: File) => {
    const ext = file.name.split(".").pop();
    const path = `testimonials/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("cake-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("cake-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      setUploading(true);
      let photo_url: string | undefined;
      if (photoFile) {
        photo_url = await uploadPhoto(photoFile);
      }

      if (editing) {
        const update: Record<string, string> = { customer_name: customerName, message };
        if (photo_url) update.photo_url = photo_url;
        const { error } = await supabase.from("testimonials").update(update).eq("id", editing);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert({ customer_name: customerName, message, photo_url: photo_url || null });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success(editing ? "Testimonial updated" : "Testimonial added");
      resetForm();
    },
    onError: (err: any) => toast.error(err.message),
    onSettled: () => setUploading(false),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setCustomerName("");
    setMessage("");
    setPhotoFile(null);
  };

  const startEdit = (t: any) => {
    setEditing(t.id);
    setCustomerName(t.customer_name);
    setMessage(t.message);
    setPhotoFile(null);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-bold text-foreground">Testimonials</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-semibold text-foreground">{editing ? "Edit" : "Add"} Testimonial</h3>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
            <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} required placeholder="Customer name" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Testimonial message" rows={3} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            <div>
              <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-input rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{photoFile ? photoFile.name : "Upload photo (optional)"}</span>
                <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} className="hidden" />
              </label>
            </div>
            <button type="submit" disabled={uploading || saveMutation.isPending} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
              {uploading ? "Uploading..." : editing ? "Update" : "Add Testimonial"}
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : testimonials && testimonials.length > 0 ? (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-card rounded-xl border border-border p-6 flex items-start gap-4">
              {t.photo_url ? (
                <img src={t.photo_url} alt={t.customer_name} className="w-12 h-12 rounded-full object-cover shrink-0" loading="lazy" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold shrink-0">
                  {t.customer_name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{t.customer_name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.message}</p>
                <div className="flex gap-3 mt-3">
                  <button onClick={() => startEdit(t)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => deleteMutation.mutate(t.id)} className="flex items-center gap-1 text-xs text-destructive hover:opacity-70">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-12">No testimonials yet. Add your first one!</p>
      )}
    </div>
  );
};

export default AdminTestimonials;
