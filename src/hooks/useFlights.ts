
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export interface Flight {
  flight_id: string;
  drone_id: string;
  user_id: string;
  start_time: string | null;
  end_time: string | null;
  distance_km: number | null;
  max_altitude: number | null;
  location: string | null;
  raw_log_url: string | null;
  airspace_violations: any | null;
  created_at: string;
  updated_at: string;
}

export const useFlights = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['flights', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('flights')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching flights:', error);
        toast({
          title: "Error fetching flights",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data as Flight[];
    },
    enabled: !!user,
  });
};

export const useCreateFlight = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (flightData: Partial<Flight>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('flights')
        .insert({
          ...flightData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
      toast({
        title: "Flight logged successfully",
        description: "Your flight has been recorded",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error logging flight",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
