import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ALL_LISTINGS = [
  { id: '1', title: 'iPhone 11 128GB', price: '₹ 8,500', condition: 'Good', dist: '0.8 km', emoji: '📱', color: '#1C1040' },
  { id: '2', title: 'IKEA Poäng Chair', price: '₹ 3,200', condition: 'Like new', dist: '2.1 km', emoji: '🛋️', color: '#1A0E0E' },
  { id: '3', title: 'Sony Headphones', price: '₹ 12,500', condition: 'Good', dist: '1.3 km', emoji: '🎧', color: '#1A1500' },
  { id: '4', title: 'Trek MTB Cycle', price: '₹ 8,000', condition: 'Good', dist: '0.4 km', emoji: '🚲', color: '#0A1A0E' },
  { id: '5', title: 'MacBook Air M1', price: '₹ 62,000', condition: 'Like new', dist: '1.1 km', emoji: '💻', color: '#0A0E1A' },
  { id: '6', title: 'Samsung 43" TV', price: '₹ 18,000', condition: 'Good', dist: '3.2 km', emoji: '📺', color: '#1A100A' },
  { id: '7', title: 'Honda Activa 2019', price: '₹ 45,000', condition: 'Good', dist: '0.9 km', emoji: '🛵', color: '#1A1A0A' },
  { id: '8', title: 'Wooden Study Table', price: '₹ 4,500', condition: 'Fair', dist: '2.8 km', emoji: '🪑', color: '#150A0A' },
  { id: '9', title: 'Canon DSLR Camera', price: '₹ 28,000', condition: 'Like new', dist: '1.6 km', emoji: '📷', color: '#0A1515' },
  { id: '10', title: 'Nike Air Max', price: '₹ 3,800', condition: 'Good', dist: '0.5 km', emoji: '👟', color: '#0A0A1A' },
  { id: '11', title: 'PlayStation 5', price: '₹ 38,000', condition: 'Like new', dist: '2.3 km', emoji: '🎮', color: '#0A0A15' },
  { id: '12', title: 'Mixer Grinder', price: '₹ 2,200', condition: 'Good', dist: '1.0 km', emoji: '🫙', color: '#1A0A10' },
  { id: '13', title: 'Office Chair', price: '₹ 5,500', condition: 'Like new', dist: '3.5 km', emoji: '🪑', color: '#100A1A' },
  { id: '14', title: 'Kindle Paperwhite', price: '₹ 6,000', condition: 'Good', dist: '0.7 km', emoji: '📚', color: '#0A1A10' },
  { id: '15', title: 'Air Purifier', price: '₹ 8,900', condition: 'Like new', dist: '1.8 km', emoji: '💨', color: '#0A1510' },
  { id: '16', title: 'Acoustic Guitar', price: '₹ 7,500', condition: 'Good', dist: '2.0 km', emoji: '🎸', color: '#1A100A' },
  { id: '17', title: 'JBL Speaker', price: '₹ 4,200', condition: 'Good', dist: '0.6 km', emoji: '🔊', color: '#0A150A' },
  { id: '18', title: 'Treadmill', price: '₹ 22,000', condition: 'Good', dist: '4.1 km', emoji: '🏃', color: '#100A0A' },
  { id: '19', title: 'Winter Jacket', price: '₹ 1,800', condition: 'Like new', dist: '1.4 km', emoji: '🧥', color: '#0A0A10' },
  { id: '20', title: 'Coffee Table', price: '₹ 3,000', condition: 'Good', dist: '2.6 km', emoji: '☕', color: '#15100A' },
];

const TABS = ['Friends', 'Nearby', 'For you'];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState(0);

  const renderItem = ({ item }: { item: typeof ALL_LISTINGS[0] }) => (
    <TouchableOpacity style={s.card} onPress={() => router.push('/listing')}>
      <View style={[s.thumb, { backgroundColor: item.color }]}>
        <Text style={s.emoji}>{item.emoji}</Text>
      </View>
      <View style={s.cardBody}>
        <Text style={s.price}>{item.price}</Text>
        <Text style={s.title} numberOfLines={1}>{item.title}</Text>
        <View style={s.row}>
          <Text style={s.badge}>{item.condition}</Text>
          <Text style={s.dist}>{item.dist}</Text>
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
      <FlatList
        data={ALL_LISTINGS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={s.grid}
        columnWrapperStyle={s.row2}
        showsVerticalScrollIndicator={false}
      />
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
  nav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#141428', borderTopWidth: 0.5, borderTopColor: '#252542', paddingTop: 10, paddingBottom: 28, position: 'absolute', bottom: 0, left: 0, right: 0 },
  navItem: { alignItems: 'center', gap: 3 },
  navIcon2: { fontSize: 20 },
  navIconActive: { fontSize: 20, color: '#1DCEA0' },
  navLabel: { fontSize: 10, color: '#5A6080' },
  navLabelActive: { fontSize: 10, color: '#1DCEA0' },
  sellBtn: { width: 52, height: 52, backgroundColor: '#1DCEA0', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: -16 },
  sellTxt: { fontSize: 28, color: '#0D0D1A', fontWeight: '300', lineHeight: 32 },
});