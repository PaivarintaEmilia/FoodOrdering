import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";



// Custom Hook to fetch all the product data
export const useAdminOrdertList = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*');

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
}