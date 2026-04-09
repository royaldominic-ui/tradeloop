import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from './lib/supabase';

export default function ListingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('listings')
      .select('*, listing_images(url, position), users!seller_id(id, name, avatar_url, rating_avg, is_verified)')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) setListing(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <SafeAreaView style={s.root}>
      <ActivityIndicator size="large" color="#1DCEA0" style={{ flex: 1 }} />
    </SafeAreaView>
  );

  if (!listing) return (
    <SafeAreaView style={s.root}>
      <View style={s.imgArea}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backTxt}>←</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: '#F0F0F5', padding: 20 }}>Listing not found</Text>
    </SafeAreaView>
  );

  const images = listing.listing_images?.sort((a: any, b: any) => a.position - b.position) ?? [];
  const seller = listing.users;

  return (
    <SafeAreaView style={s.root}>
      <View style={s.imgArea}>
        {images.length > 0 ? (
          <Image source={{ uri: images[activeImage]?.url }} style={s.mainImage} resizeMode="cover" />
        ) : (
          <Text style={s.imgEmoji}>📦</Text>
        )}
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backTxt}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.wishBtn} onPress={() => setWishlisted(w => !w)}>
          <Text style={s.wishTxt}>{wishlisted ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        {images.length > 1 && (
          <View style={s.dots}>
            {images.map((_: any, i: number) => (
              <TouchableOpacity key={i} onPress={() => setActiveImage(i)}>
                <View style={[s.dot, i === activeImage && s.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {images.length > 1 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.thumbScroll} contentContainerStyle={s.thumbRow}>
          {images.map((img: any, i: number) => (
            <TouchableOpacity key={i} onPress={() => setActiveImage(i)}>
              <Image source={{ uri: img.url }} style={[s.thumb, i === activeImage && s.thumbActive]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <ScrollView style={s.scroll}>
        <View style={s.badgeRow}>
          <View style={s.badgeVerified}><Text style={s.badgeVerifiedTxt}>✓ Verified</Text></View>
        </View>

        <Text style={s.title}>{listing.title}</Text>
        <Text style={s.price}>₹ {Number(listing.price).toLocaleString('en-IN')}</Text>

        <View style={s.metaRow}>
          <View style={s.chip}><Text style={s.chipTxt}>⛽ {listing.condition?.replace('_', ' ')}</Text></View>
          <View style={s.chip}><Text style={s.chipTxt}>📍 {listing.location_name}</Text></View>
          <View style={s.chip}><Text style={s.chipTxt}>👁 {listing.views_count ?? 0} views</Text></View>
        </View>

        {seller && (
          <View style={s.sellerCard}>
            <View style={[s.sellerAv, { backgroundColor: '#6C63FF' }]}>
              <Text style={s.sellerAvTxt}>{seller.name?.[0] ?? 'S'}</Text>
            </View>
            <View style={s.sellerInfo}>
              <Text style={s.sellerName}>{seller.name ?? 'Seller'}</Text>
              <Text style={s.sellerSub}>★ {seller.rating_avg ?? '4.9'}</Text>
            </View>
          </View>
        )}

        {listing.description ? (
          <>
            <Text style={s.sectionTitle}>DESCRIPTION</Text>
            <Text style={s.desc}>{listing.description}</Text>
          </>
        ) : null}

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
  imgArea: { height: 280, backgroundColor: '#1C1040', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  mainImage: { width: '100%', height: '100%' },
  imgEmoji: { fontSize: 90 },
  backBtn: { position: 'absolute', top: 16, left: 16, width: 36, height: 36, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  backTxt: { color: '#F0F0F5', fontSize: 18 },
  wishBtn: { position: 'absolute', top: 16, right: 16, width: 36, height: 36, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  wishTxt: { fontSize: 16 },
  dots: { position: 'absolute', bottom: 12, flexDirection: 'row', gap: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { width: 18, backgroundColor: '#1DCEA0' },
  thumbScroll: { maxHeight: 70, backgroundColor: '#141428' },
  thumbRow: { padding: 8, gap: 8 },
  thumb: { width: 54, height: 54, borderRadius: 8, opacity: 0.6 },
  thumbActive: { opacity: 1, borderWidth: 2, borderColor: '#1DCEA0' },
  scroll: { flex: 1, padding: 16 },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
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
  sectionTitle: { fontSize: 11, fontWeight: '600', color: '#A8AECB', letterSpacing: 0.5, marginBottom: 10 },
  desc: { fontSize: 13, color: '#A8AECB', lineHeight: 20, marginBottom: 20 },
  cta: { flexDirection: 'row', gap: 10, padding: 16, backgroundColor: '#0D0D1A', borderTopWidth: 0.5, borderTopColor: '#1C1C38' },
  chatBtn: { flex: 1, backgroundColor: '#1C1C38', borderWidth: 1, borderColor: '#1DCEA0', borderRadius: 14, padding: 14, alignItems: 'center' },
  chatTxt: { fontSize: 14, fontWeight: '600', color: '#1DCEA0' },
  offerBtn: { flex: 1.4, backgroundColor: '#1DCEA0', borderRadius: 14, padding: 14, alignItems: 'center' },
  offerTxt: { fontSize: 14, fontWeight: '700', color: '#0D0D1A' },
});