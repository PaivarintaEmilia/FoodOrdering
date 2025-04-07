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
                refetchType: 'all',
            });
        },
    });
};


// Update a product
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { data: updatedProduct, error } = await supabase
                .from('products')
                .update({
                    name: data.name,
                    image: data.image,
                    price: data.price,
                })
                .eq('id', data.id)
                .select();


            if (error) {
                throw new Error(error.message);
            }
            return updatedProduct;
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries({
                queryKey: ['products'],
                refetchType: 'all',
            });
            await queryClient.invalidateQueries({
                queryKey: ['product', id],
                refetchType: 'all',
            });
        },
        onError(error) {
            console.log(error);
        },
    });
};

// Delete the product
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) {
                throw new Error(error.message);
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ['products'],
                refetchType: 'all',
            });
        },
    });
};