import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

const FALLBACK_LISTINGS = [
  { id: '1', title: 'iPhone 11 128GB', price: 8500, condition: 'good', location_name: 'Keelkattalai', emoji: '📱', color: '#1C1040' },
  { id: '2', title: 'IKEA Poäng Chair', price: 3200, condition: 'like_new', location_name: 'Tambaram', emoji: '🛋️', color: '#1A0E0E' },
  { id: '3', title: 'Sony Headphones', price: 12500, condition: 'good', location_name: 'Chromepet', emoji: '🎧', color: '#1A1500' },
  { id: '4', title: 'Trek MTB Cycle', price: 8000, condition: 'good', location_name: 'Pallavaram', emoji: '🚲', color: '#0A1A0E' },
  { id: '5', title: 'MacBook Air M1', price: 62000, condition: 'like_new', location_name: 'OMR', emoji: '💻', color: '#0A0E1A' },
  { id: '6', title: 'Samsung 43" TV', price: 18000, condition: 'good', location_name: 'Velachery', emoji: '📺', color: '#1A100A' },
  { id: '7', title: 'Honda Activa 2019', price: 45000, condition: 'good', location_name: 'Madipakkam', emoji: '🛵', color: '#1A1A0A' },
  { id: '8', title: 'Wooden Study Table', price: 4500, condition: 'fair', location_name: 'Nanganallur', emoji: '🪑', color: '#150A0A' },
  { id: '9', title: 'Canon DSLR Camera', price: 28000, condition: 'like_new', location_name: 'Adyar', emoji: '📷', color: '#0A1515' },
  { id: '10', title: 'Nike Air Max', price: 3800, condition: 'good', location_name: 'T Nagar', emoji: '👟', color: '#0A0A1A' },
  { id: '11', title: 'PlayStation 5', price: 38000, condition: 'like_new', location_name: 'Anna Nagar', emoji: '🎮', color: '#0A0A15' },
  { id: '12', title: 'Mixer Grinder', price: 2200, condition: 'good', location_name: 'Porur', emoji: '🫙', color: '#1A0A10' },
  { id: '13', title: 'Office Chair', price: 5500, condition: 'like_new', location_name: 'Guindy', emoji: '🪑', color: '#100A1A' },
  { id: '14', title: 'Kindle Paperwhite', price: 6000, condition: 'good', location_name: 'Mylapore', emoji: '📚', color: '#0A1A10' },
  { id: '15', title: 'Air Purifier', price: 8900, condition: 'like_new', location_name: 'Perungudi', emoji: '💨', color: '#0A1510' },
  { id: '16', title: 'Acoustic Guitar', price: 7500, condition: 'good', location_name: 'Sholinganallur', emoji: '🎸', color: '#1A100A' },
  { id: '17', title: 'JBL Speaker', price: 4200, condition: 'good', location_name: 'Thoraipakkam', emoji: '🔊', color: '#0A150A' },
  { id: '18', title: 'Treadmill', price: 22000, condition: 'good', location_name: 'Medavakkam', emoji: '🏃', color: '#100A0A' },
  { id: '19', title: 'Winter Jacket', price: 1800, condition: 'like_new', location_name: 'Perambur', emoji: '🧥', color: '#0A0A10' },
  { id: '20', title: 'Coffee Table', price: 3000, condition: 'good', location_name: 'Kodambakkam', emoji: '☕', color: '#15100A' },
];

const EMOJIS: Record<string, string> = {
  mobiles: '📱', electronics: '💻', furniture: '🛋️',
  cars: '🚗', fashion: '👗', books: '📚',
};
const COLORS = ['#1C1040', '#1A0E0E', '#1A1500', '#0A1A0E', '#0A0E1A', '#1A100A'];
const TABS = ['Friends', 'Nearby', 'For you'];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('id, title, price, condition, location_name, category_id, listing_images(url, position)')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(20);

      if (!error && data && data.length > 0) {
        setListings(data);
      } else {
        setListings(FALLBACK_LISTINGS as any);
      }
    } catch {
      setListings(FALLBACK_LISTINGS as any);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadListings(); }, [activeTab]);

  const onRefresh = () => { setRefreshing(true); loadListings(); };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity style={s.card} onPress={() => router.push('/listing')}>
      <View style={[s.thumb, { backgroundColor: item.color ?? COLORS[index % COLORS.length] }]}>
        <Text style={s.emoji}>{item.emoji ?? '📦'}</Text>
      </View>
      <View style={s.cardBody}>
        <Text style={s.price}>₹ {Number(item.price).toLocaleString('en-IN')}</Text>
        <Text style={s.title} numberOfLines={1}>{item.title}</Text>
        <View style={s.row}>
          <Text style={s.badge}>{item.condition?.replace('_', ' ') ?? 'Good'}</Text>
          <Text style={s.dist}>{item.location_name ?? 'Chennai'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={s.root}>
      <View style={s.header}>
        <Text style={s.logo}>trade<Text style={s.accent}>loop</Text></Text>
        <TouchableOpacity onPress={() => router.push('/search')}>
          <Text style={s.headerIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={s.searchBar} onPress={() => router.push('/search')}>
        <Text style={s.searchTxt}>🔍  Search nearby items...</Text>
      </TouchableOpacity>

      <View style={s.tabs}>
        {TABS.map((t, i) => (
          <TouchableOpacity key={t} style={[s.tab, i === activeTab && s.tabActive]} onPress={() => setActiveTab(i)}>
            <Text style={[s.tabTxt, i === activeTab && s.tabTxtActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={s.loadingBox}>
          <ActivityIndicator size="large" color="#1DCEA0" />
          <Text style={s.loadingTxt}>Loading listings...</Text>
        </View>
      ) : (
        <FlatList
          data={listings}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={s.grid}
          columnWrapperStyle={s.row2}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1DCEA0" />}
        />
      )}

      <View style={s.nav}>
        <TouchableOpacity style={s.navItem} onPress={() => router.push('/(tabs)')}>
          <Text style={s.navIconActive}>⊞</Text>
          <Text style={s.navLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={() => router.push('/search')}>
          <Text style={s.navIcon2}>🔍</Text>
          <Text style={s.navLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.sellBtn} onPress={() => router.push('/post')}>
          <Text style={s.sellTxt}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={() => router.push('/chat')}>
          <Text style={s.navIcon2}>💬</Text>
          <Text style={s.navLabel}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={() => router.push('/profile')}>
          <Text style={s.navIcon2}>👤</Text>
          <Text style={s.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D1A' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 56 },
  logo: { fontSize: 22, fontWeight: '700', color: '#F0F0F5' },
  accent: { color: '#1DCEA0' },
  headerIcon: { fontSize: 22 },
  searchBar: { marginHorizontal: 16, marginBottom: 12, backgroundColor: '#1C1C38', borderRadius: 12, padding: 12 },
  searchTxt: { color: '#5A6080', fontSize: 14 },
  tabs: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 12 },
  tab: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 100, backgroundColor: '#1C1C38' },
  tabActive: { backgroundColor: '#1DCEA0' },
  tabTxt: { color: '#A8AECB', fontSize: 13, fontWeight: '500' },
  tabTxtActive: { color: '#0D0D1A', fontWeight: '700' },
  grid: { paddingHorizontal: 12, paddingBottom: 100 },
  row2: { gap: 12, marginBottom: 12 },
  card: { flex: 1, backgroundColor: '#252542', borderRadius: 16, overflow: 'hidden' },
  thumb: { height: 120, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 40 },
  cardBody: { padding: 10 },
  price: { fontSize: 16, fontWeight: '700', color: '#1DCEA0' },
  title: { fontSize: 12, color: '#A8AECB', marginVertical: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { fontSize: 10, color: '#1DCEA0', backgroundColor: '#0A2A20', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  dist: { fontSize: 10, color: '#5A6080' },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingTxt: { color: '#5A6080', fontSize: 14 },
  nav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#141428', borderTopWidth: 0.5, borderTopColor: '#252542', paddingTop: 10, paddingBottom: 28, position: 'absolute', bottom: 0, left: 0, right: 0 },
  navItem: { alignItems: 'center', gap: 3 },
  navIcon2: { fontSize: 20 },
  navIconActive: { fontSize: 20, color: '#1DCEA0' },
  navLabel: { fontSize: 10, color: '#5A6080' },
  navLabelActive: { fontSize: 10, color: '#1DCEA0' },
  sellBtn: { width: 52, height: 52, backgroundColor: '#1DCEA0', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: -16 },
  sellTxt: { fontSize: 28, color: '#0D0D1A', fontWeight: '300', lineHeight: 32 },
});