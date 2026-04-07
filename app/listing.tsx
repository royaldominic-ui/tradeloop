import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ListingScreen() {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <SafeAreaView style={s.root}>
      <View style={s.imgArea}>
        <Text style={s.imgEmoji}>📱</Text>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backTxt}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.wishBtn} onPress={() => setWishlisted(w => !w)}>
          <Text style={s.wishTxt}>{wishlisted ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <View style={s.dots}>
          <View style={[s.dot, s.dotActive]} />
          <View style={s.dot} />
          <View style={s.dot} />
          <View style={s.dot} />
        </View>
      </View>

      <ScrollView style={s.scroll}>
        <View style={s.badgeRow}>
          <View style={s.badgeFriends}><Text style={s.badgeFriendsTxt}>Friends only · 18h left</Text></View>
          <View style={s.badgeVerified}><Text style={s.badgeVerifiedTxt}>✓ Verified</Text></View>
        </View>

        <Text style={s.title}>iPhone 11 128GB Midnight Black</Text>
        <Text style={s.price}>₹ 8,500</Text>

        <View style={s.metaRow}>
          <View style={s.chip}><Text style={s.chipTxt}>⛽ Good condition</Text></View>
          <View style={s.chip}><Text style={s.chipTxt}>📍 0.8 km</Text></View>
          <View style={s.chip}><Text style={s.chipTxt}>👁 47 views</Text></View>
        </View>

        <View style={s.sellerCard}>
          <View style={[s.sellerAv, { backgroundColor: '#6C63FF' }]}>
            <Text style={s.sellerAvTxt}>P</Text>
          </View>
          <View style={s.sellerInfo}>
            <Text style={s.sellerName}>Priya Krishnan</Text>
            <Text style={s.sellerSub}>★ 4.9 · 23 sales</Text>
          </View>
          <View style={s.mutualBadge}>
            <Text style={s.mutualTxt}>👥 2 mutual friends</Text>
          </View>
        </View>

        <Text style={s.sectionTitle}>DESCRIPTION</Text>
        <Text style={s.desc}>Bought in Nov 2021, used carefully. Battery health 89%. Includes original charger, box and earphones. No cracks or major scratches.</Text>

        <Text style={s.sectionTitle}>SPECS</Text>
        <View style={s.specsGrid}>
          {[
            ['Brand', 'Apple'], ['Storage', '128 GB'],
            ['Colour', 'Midnight Black'], ['Battery', '89% health'],
            ['Condition', 'Good'], ['Warranty', 'Expired'],
          ].map(([key, val]) => (
            <View key={key} style={s.specItem}>
              <Text style={s.specKey}>{key}</Text>
              <Text style={s.specVal}>{val}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={s.cta}>
        <TouchableOpacity style={s.chatBtn} onPress={() => router.push('/chat')}>
          <Text style={s.chatTxt}>💬 Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.offerBtn}>
          <Text style={s.offerTxt}>Make offer →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D1A' },
  imgArea: { height: 260, backgroundColor: '#1C1040', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  imgEmoji: { fontSize: 90 },
  backBtn: { position: 'absolute', top: 16, left: 16, width: 36, height: 36, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  backTxt: { color: '#F0F0F5', fontSize: 18 },
  wishBtn: { position: 'absolute', top: 16, right: 16, width: 36, height: 36, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  wishTxt: { fontSize: 16 },
  dots: { position: 'absolute', bottom: 12, flexDirection: 'row', gap: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { width: 18, backgroundColor: '#1DCEA0' },
  scroll: { flex: 1, padding: 16 },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  badgeFriends: { backgroundColor: 'rgba(108,99,255,0.2)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeFriendsTxt: { fontSize: 10, color: '#A89AFF', fontWeight: '600' },
  badgeVerified: { backgroundColor: 'rgba(34,197,94,0.15)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeVerifiedTxt: { fontSize: 10, color: '#4ADE80', fontWeight: '600' },
  title: { fontSize: 20, fontWeight: '700', color: '#F0F0F5', marginBottom: 6 },
  price: { fontSize: 28, fontWeight: '700', color: '#1DCEA0', marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  chip: { backgroundColor: '#1C1C38', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  chipTxt: { fontSize: 12, color: '#A8AECB' },
  sellerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C38', borderRadius: 14, padding: 12, marginBottom: 20, gap: 10 },
  sellerAv: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  sellerAvTxt: { fontSize: 16, fontWeight: '700', color: '#fff' },
  sellerInfo: { flex: 1 },
  sellerName: { fontSize: 14, fontWeight: '600', color: '#F0F0F5' },
  sellerSub: { fontSize: 11, color: '#5A6080', marginTop: 2 },
  mutualBadge: { backgroundColor: 'rgba(108,99,255,0.15)', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 4 },
  mutualTxt: { fontSize: 10, color: '#A89AFF', fontWeight: '600' },
  sectionTitle: { fontSize: 11, fontWeight: '600', color: '#A8AECB', letterSpacing: 0.5, marginBottom: 10 },
  desc: { fontSize: 13, color: '#A8AECB', lineHeight: 20, marginBottom: 20 },
  specsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  specItem: { width: '47%', backgroundColor: '#1C1C38', borderRadius: 10, padding: 10 },
  specKey: { fontSize: 10, color: '#5A6080', marginBottom: 3 },
  specVal: { fontSize: 13, fontWeight: '500', color: '#F0F0F5' },
  cta: { flexDirection: 'row', gap: 10, padding: 16, backgroundColor: '#0D0D1A', borderTopWidth: 0.5, borderTopColor: '#1C1C38' },
  chatBtn: { flex: 1, backgroundColor: '#1C1C38', borderWidth: 1, borderColor: '#1DCEA0', borderRadius: 14, padding: 14, alignItems: 'center' },
  chatTxt: { fontSize: 14, fontWeight: '600', color: '#1DCEA0' },
  offerBtn: { flex: 1.4, backgroundColor: '#1DCEA0', borderRadius: 14, padding: 14, alignItems: 'center' },
  offerTxt: { fontSize: 14, fontWeight: '700', color: '#0D0D1A' },
});