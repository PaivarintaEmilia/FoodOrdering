import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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


// Create product
export const useInsertProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(data: any) {
        const { error, data: newProduct } = await supabase
          .from('products')
          .insert({
            name: data.name,
            image: data.image,
            price: data.price,
          })
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
        return newProduct;
      },
      async onSuccess() {
        await queryClient.invalidateQueries({
            queryKey: ['products'],
            refetchType: 'active',
        });
      },
    });
  };