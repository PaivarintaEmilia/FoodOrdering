import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";



// Custom Hook to fetch all the orders data
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


// Custom Hook to fetch all the orders data
export const useMyOrdertList = () => {

    const { session } = useAuth();
    const id = session?.user.id;


    return useQuery({
        queryKey: ['orders', { userId: id }],
        queryFn: async () => {
            if (!id) return null; // User id can also be undefined 
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', id);

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
}