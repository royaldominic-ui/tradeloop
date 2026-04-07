import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const RESULTS = [
  { id: '1', title: 'iPhone 11 128GB', price: '₹ 8,500', condition: 'Good', dist: '0.8 km', emoji: '📱', color: '#1C1040' },
  { id: '2', title: 'iPhone 12 64GB', price: '₹ 32,000', condition: 'Like new', dist: '1.2 km', emoji: '📱', color: '#1C1040' },
  { id: '3', title: 'iPhone XR 128GB', price: '₹ 22,000', condition: 'Good', dist: '2.5 km', emoji: '📱', color: '#1C1040' },
  { id: '4', title: 'Samsung Galaxy S21', price: '₹ 28,000', condition: 'Good', dist: '3.1 km', emoji: '📱', color: '#0A1A0E' },
];

const RECENT = ['iPhone 11', 'Cycle', 'Sofa', 'MacBook'];
const TRENDING = ['📱 Mobiles', '💻 Laptops', '🚲 Cycles', '🛋️ Furniture', '👗 Fashion'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  return (
    <SafeAreaView style={s.root}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.back}>←</Text>
        </TouchableOpacity>
        <View style={s.searchBox}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.input}
            placeholder="Search items, categories..."
            placeholderTextColor="#5A6080"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => setSearched(true)}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => { setQuery(''); setSearched(false); }}>
              <Text style={s.clear}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!searched ? (
        <View style={s.body}>
          <Text style={s.sectionTitle}>Recent searches</Text>
          <View style={s.chipRow}>
            {RECENT.map(r => (
              <TouchableOpacity key={r} style={s.chip} onPress={() => { setQuery(r); setSearched(true); }}>
                <Text style={s.chipTxt}>🕐 {r}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={s.sectionTitle}>Trending near you</Text>
          <View style={s.chipRow}>
            {TRENDING.map(t => (
              <TouchableOpacity key={t} style={s.chip} onPress={() => { setQuery(t); setSearched(true); }}>
                <Text style={s.chipTxt}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          data={RESULTS}
          keyExtractor={item => item.id}
          contentContainerStyle={s.results}
          renderItem={({ item }) => (
            <TouchableOpacity style={s.resultCard} onPress={() => router.push('/listing')}>
              <View style={[s.resultThumb, { backgroundColor: item.color }]}>
                <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
              </View>
              <View style={s.resultInfo}>
                <Text style={s.resultTitle}>{item.title}</Text>
                <Text style={s.resultPrice}>{item.price}</Text>
                <View style={s.resultMeta}>
                  <Text style={s.badge}>{item.condition}</Text>
                  <Text style={s.dist}>{item.dist}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D1A' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, paddingTop: 20 },
  back: { fontSize: 22, color: '#A8AECB' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C38', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  searchIcon: { fontSize: 14 },
  input: { flex: 1, fontSize: 14, color: '#F0F0F5' },
  clear: { fontSize: 12, color: '#5A6080' },
  body: { padding: 16, gap: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#A8AECB', marginBottom: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#1C1C38', borderRadius: 100, paddingHorizontal: 14, paddingVertical: 7 },
  chipTxt: { fontSize: 13, color: '#A8AECB' },
  results: { padding: 14, gap: 10 },
  resultCard: { flexDirection: 'row', backgroundColor: '#1C1C38', borderRadius: 14, overflow: 'hidden', gap: 12 },
  resultThumb: { width: 90, height: 90, alignItems: 'center', justifyContent: 'center' },
  resultInfo: { flex: 1, paddingVertical: 12, paddingRight: 12, justifyContent: 'center', gap: 4 },
  resultTitle: { fontSize: 14, fontWeight: '500', color: '#F0F0F5' },
  resultPrice: { fontSize: 16, fontWeight: '700', color: '#1DCEA0' },
  resultMeta: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  badge: { fontSize: 10, color: '#1DCEA0', backgroundColor: '#0A2A20', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  dist: { fontSize: 11, color: '#5A6080' },
});