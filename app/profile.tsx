import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from './lib/supabase';

const MY_LISTINGS = [
  { id: '1', title: 'iPhone 11 128GB', price: '₹ 8,500', status: 'active', emoji: '📱', views: 47 },
  { id: '2', title: 'Sony Headphones', price: '₹ 12,500', status: 'active', emoji: '🎧', views: 23 },
  { id: '3', title: 'Trek MTB Cycle', price: '₹ 8,000', status: 'sold', emoji: '🚲', views: 89 },
];

const dark = {
  bg: '#0D0D1A', surface: '#1C1C38', surface2: '#252542',
  text: '#F0F0F5', textSub: '#A8AECB', accent: '#1DCEA0', border: '#252542',
};

const light = {
  bg: '#F0F2F5', surface: '#FFFFFF', surface2: '#F0F0F5',
  text: '#0D0D1A', textSub: '#5A6080', accent: '#0FA37F', border: '#E0E0E0',
};

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [isDark, setIsDark] = useState(true);
  const c = isDark ? dark : light;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace('/auth');
  };

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.bg }]}>
      <ScrollView>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={[s.backBtn, { backgroundColor: c.surface }]}>
            <Text style={[s.backTxt, { color: c.textSub }]}>←</Text>
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: c.text }]}>Profile</Text>
          <TouchableOpacity>
            <Text style={[s.editTxt, { color: c.accent }]}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={s.profileCard}>
          <View style={s.avatar}>
            <Text style={s.avatarTxt}>
              {user?.user_metadata?.full_name?.[0] ?? user?.email?.[0]?.toUpperCase() ?? 'U'}
            </Text>
          </View>
          <Text style={[s.name, { color: c.text }]}>{user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Your Name'}</Text>
          <Text style={[s.phone, { color: c.textSub }]}>{user?.email ?? 'your@email.com'}</Text>
          <View style={[s.statsRow, { backgroundColor: c.surface }]}>
            <View style={s.stat}>
              <Text style={[s.statNum, { color: c.text }]}>3</Text>
              <Text style={[s.statLabel, { color: c.textSub }]}>Listings</Text>
            </View>
            <View style={[s.statDivider, { backgroundColor: c.border }]} />
            <View style={s.stat}>
              <Text style={[s.statNum, { color: c.text }]}>★ 4.9</Text>
              <Text style={[s.statLabel, { color: c.textSub }]}>Rating</Text>
            </View>
            <View style={[s.statDivider, { backgroundColor: c.border }]} />
            <View style={s.stat}>
              <Text style={[s.statNum, { color: c.text }]}>12</Text>
              <Text style={[s.statLabel, { color: c.textSub }]}>Followers</Text>
            </View>
          </View>
        </View>

        <Text style={[s.sectionTitle, { color: c.textSub }]}>MY LISTINGS</Text>
        {MY_LISTINGS.map(item => (
          <TouchableOpacity key={item.id} style={[s.listingRow, { backgroundColor: c.surface }]} onPress={() => router.push('/listing')}>
            <View style={[s.listingThumb, { backgroundColor: c.surface2 }]}>
              <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
            </View>
            <View style={s.listingInfo}>
              <Text style={[s.listingTitle, { color: c.text }]}>{item.title}</Text>
              <Text style={[s.listingPrice, { color: c.accent }]}>{item.price}</Text>
              <Text style={[s.listingViews, { color: c.textSub }]}>👁 {item.views} views</Text>
            </View>
            <View style={[s.statusBadge, item.status === 'sold' && s.statusSold]}>
              <Text style={[s.statusTxt, item.status === 'sold' && s.statusSoldTxt]}>
                {item.status === 'active' ? 'Active' : 'Sold'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={[s.sectionTitle, { color: c.textSub }]}>SETTINGS</Text>

        <View style={[s.settingRow, { borderBottomColor: c.border }]}>
          <Text style={[s.settingTxt, { color: c.text }]}>🌙  Dark mode</Text>
          <Switch
            value={isDark}
            onValueChange={setIsDark}
            trackColor={{ false: '#767577', true: '#1DCEA0' }}
            thumbColor="#fff"
          />
        </View>

{[
  { label: '🔔  Notifications', info: 'Manage your notification preferences' },
  { label: '🔒  Privacy', info: 'Control your privacy settings' },
  { label: '❓  Help & Support', info: 'Get help and contact support' },
  { label: 'ℹ️  About Tradeloop', info: 'Version 1.0.0 · Made with ❤️ in Chennai' },
].map(item => (
  <TouchableOpacity
    key={item.label}
    style={[s.settingRow, { borderBottomColor: c.border }]}
    onPress={() => alert(item.info)}
  >
    <Text style={[s.settingTxt, { color: c.text }]}>{item.label}</Text>
    <Text style={[s.settingArrow, { color: c.textSub }]}>›</Text>
  </TouchableOpacity>
))}

        <TouchableOpacity style={s.logoutBtn} onPress={logout}>
          <Text style={s.logoutTxt}>Log out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backBtn: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  backTxt: { fontSize: 18 },
  headerTitle: { fontSize: 16, fontWeight: '600' },
  editTxt: { fontSize: 13 },
  profileCard: { alignItems: 'center', padding: 20, gap: 8 },
  avatar: { width: 80, height: 80, backgroundColor: '#6C63FF', borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontSize: 32, fontWeight: '700', color: '#fff' },
  name: { fontSize: 20, fontWeight: '700' },
  phone: { fontSize: 13 },
  statsRow: { flexDirection: 'row', borderRadius: 14, padding: 16, gap: 20, marginTop: 8 },
  stat: { alignItems: 'center', gap: 3 },
  statNum: { fontSize: 18, fontWeight: '700' },
  statLabel: { fontSize: 11 },
  statDivider: { width: 0.5 },
  sectionTitle: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5, paddingHorizontal: 16, marginTop: 20, marginBottom: 8 },
  listingRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, borderRadius: 12, padding: 12, marginBottom: 8, gap: 12 },
  listingThumb: { width: 50, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  listingInfo: { flex: 1, gap: 3 },
  listingTitle: { fontSize: 13, fontWeight: '500' },
  listingPrice: { fontSize: 14, fontWeight: '700' },
  listingViews: { fontSize: 11 },
  statusBadge: { backgroundColor: 'rgba(29,206,160,0.15)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  statusSold: { backgroundColor: 'rgba(255,107,107,0.15)' },
  statusTxt: { fontSize: 11, fontWeight: '600', color: '#1DCEA0' },
  statusSoldTxt: { color: '#FF6B6B' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 0.5 },
  settingTxt: { fontSize: 14 },
  settingArrow: { fontSize: 18 },
  logoutBtn: { marginHorizontal: 16, marginTop: 20, backgroundColor: 'rgba(255,107,107,0.15)', borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 0.5, borderColor: 'rgba(255,107,107,0.3)' },
  logoutTxt: { fontSize: 14, fontWeight: '600', color: '#FF6B6B' },
});