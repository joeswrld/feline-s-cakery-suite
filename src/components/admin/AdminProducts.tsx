import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const uploadImage = async (file: File) => {
    const ext = file.name.split(".").pop();
    const path = `products/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("cake-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("cake-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      setUploading(true);
      let image_url: string | undefined;
      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }

      if (editing) {
        const update: { name: string; description: string; image_url?: string } = { name, description };
        if (image_url) update.image_url = image_url;
        const { error } = await supabase.from("products").update(update).eq("id", editing);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert({ name, description, image_url: image_url || null });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(editing ? "Product updated" : "Product added");
      resetForm();
    },
    onError: (err: any) => toast.error(err.message),
    onSettled: () => setUploading(false),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setName("");
    setDescription("");
    setImageFile(null);
  };

  const startEdit = (product: any) => {
    setEditing(product.id);
    setName(product.name);
    setDescription(product.description || "");
    setImageFile(null);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-bold text-foreground">Products</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Cake
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-semibold text-foreground">{editing ? "Edit" : "Add"} Product</h3>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Cake name" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            <div>
              <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-input rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{imageFile ? imageFile.name : "Upload image"}</span>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="hidden" />
              </label>
            </div>
            <button type="submit" disabled={uploading || saveMutation.isPending} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
              {uploading ? "Uploading..." : editing ? "Update" : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="aspect-square bg-blush">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">🎂</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{p.name}</h3>
                {p.description && <p className="text-sm text-muted-foreground mb-3">{p.description}</p>}
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => deleteMutation.mutate(p.id)} className="flex items-center gap-1 text-xs text-destructive hover:opacity-70">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-12">No products yet. Add your first cake!</p>
      )}
    </div>
  );
};

export default AdminProducts;
