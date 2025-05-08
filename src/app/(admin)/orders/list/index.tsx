import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '../../../../components/Themed';
// Import created child component 
import OrderListItem from '@/src/components/OrderListItem';
import { useAdminOrdertList } from '@/src/api/orders';
import { useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';



/*THIS IS THE ACTIVE SCREEN*/
export default function OrdersScreen() {

  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrdertList({ archived: false });

  const queryClient = useQueryClient();

  useEffect(() => {


    const orders = supabase.channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ['orders'],
        });
        }
      )
      .subscribe()

  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  };

  if (error) {
    return <Text>Failed to fetch products</Text>
  }


  return (
    <View>
      {/*Flatlist for scrollable list*/}
      <FlatList
        data={orders} renderItem={({ item }) => <OrderListItem order={
          item
        } />}
        numColumns={1}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};
