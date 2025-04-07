import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

// Custom Hook to fetch all the product data
export const useProductList = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*');

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
}

// Custom Hook to fetch the product data of one item
export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};