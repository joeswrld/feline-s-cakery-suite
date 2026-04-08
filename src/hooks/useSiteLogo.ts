import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteLogo = () => {
  return useQuery({
    queryKey: ["site-logo"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "logo_url")
        .maybeSingle();
      return data?.value || null;
    },
    staleTime: 1000 * 60 * 5,
  });
};
