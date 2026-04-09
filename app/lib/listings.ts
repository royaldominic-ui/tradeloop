import { supabase } from './supabase';

export async function fetchListings() {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, price, condition, location_name, listing_images(url, position)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) throw error;
  return data ?? [];
}

export async function createListing(data: {
  title: string;
  description: string;
  price: number;
  category_id: number;
  condition: string;
  location_name: string;
  seller_id: string;
}) {
  const { data: listing, error } = await supabase
    .from('listings')
    .insert(data)
    .select('*')
    .single();

  if (error) throw error;
  return listing;
}