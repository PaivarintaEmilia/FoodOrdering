import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tables } from '../../database.types';
import { InsertTables } from "@/src/types";


// Custom Hook to fetch all the orders data
export const useAdminOrdertList = ({ archived = false }) => {

    const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

    return useQuery({
        queryKey: ['orders', { archived }],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .in('status', statuses)
                .order('created_at', { ascending: false });

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
                .eq('user_id', id)
                .order('created_at', { ascending: false });

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
}

// Fetch order by id
// Custom Hook to fetch the order data of one item
export const useOrderById = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*, order_items(*, products(*))')
                .eq('id', id)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};


// Create order
export const useInsertOrder = () => {
    const queryClient = useQueryClient();

    const { session } = useAuth();
    const userId = session?.user.id;

    return useMutation({
        async mutationFn(data: InsertTables<'orders'>) {
            const { error, data: newOrder } = await supabase
                .from('orders')
                .insert({ ...data, userId: userId })
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return newOrder;
        },
        async onSuccess(data) {
            await queryClient.invalidateQueries({
                queryKey: ['orders'],
                refetchType: 'all',
            });
        },
    });
};