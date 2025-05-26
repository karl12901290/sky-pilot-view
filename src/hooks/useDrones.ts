
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export interface Drone {
  drone_id: string;
  user_id: string;
  name: string | null;
  model: string | null;
  serial_number: string | null;
  status: string | null;
  health_score: number | null;
  last_synced: string | null;
  created_at: string;
  updated_at: string;
}

export const useDrones = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['drones', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('drones')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching drones:', error);
        toast({
          title: "Error fetching drones",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data as Drone[];
    },
    enabled: !!user,
  });
};

export const useCreateDrone = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (droneData: Partial<Drone>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('drones')
        .insert({
          ...droneData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] });
      toast({
        title: "Drone added successfully",
        description: "Your new drone has been added to the fleet",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error adding drone",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateDrone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Drone> & { id: string }) => {
      const { data, error } = await supabase
        .from('drones')
        .update(updateData)
        .eq('drone_id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drones'] });
      toast({
        title: "Drone updated successfully",
        description: "Drone information has been updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating drone",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
