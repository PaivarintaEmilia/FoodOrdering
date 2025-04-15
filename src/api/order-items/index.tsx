import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { InsertTables } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";


// Create order
export const useInsertOrderItems = () => {

    const queryClient = useQueryClient();
    const { session } = useAuth();
    const userId = session?.user.id;

    return useMutation({
        async mutationFn(items: InsertTables<'order_items'>[]) {
            const { error, data: newOrder } = await supabase
                .from('order_items')
                .insert(items)
                .select();

            if (error) {
                throw new Error(error.message);
            }
            return newOrder;
        },
    });
};