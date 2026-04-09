import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from './lib/supabase';

const CONDITIONS = ['New', 'Like new', 'Good', 'Fair'];
const CATEGORIES = [
  { label: 'Mobiles', emoji: '📱', id: 1 },
  { label: 'Electronics', emoji: '💻', id: 2 },
  { label: 'Furniture', emoji: '🛋️', id: 3 },
  { label: 'Cars', emoji: '🚗', id: 4 },
  { label: 'Fashion', emoji: '👗', id: 5 },
  { label: 'Books', emoji: '📚', id: 6 },
];

export default function PostScreen() {
  const [condition, setCondition] = useState('Good');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [friendsFirst, setFriendsFirst] = useState(true);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 5,
    });
    if (!result.canceled) {
      const uris = result.assets.map(a => a.uri);
      setImages(prev => [...prev, ...uris].slice(0, 5));
    }
  };

  const uploadImages = async (listingId: string) => {
    for (let i = 0; i < images.length; i++) {
      const uri = images[i];
      const ext = uri.split('.').pop() ?? 'jpg';
      const fileName = `${listingId}/${i}.${ext}`;
      const response = await fetch(uri);
      const blob = await response.blob();
      await supabase.storage.from('listing-images').upload(fileName, blob, {
        contentType: `image/${ext}`,
        upsert: true,
      });
      const { data } = supabase.storage.from('listing-images').getPublicUrl(fileName);
      await supabase.from('listing_images').insert({
        listing_id: listingId,
        url: data.publicUrl,
        position: i,
      });
    }
  };

  const publish = async () => {
    if (!title.trim()) { alert('Please add a title'); return; }
    if (!price.trim()) { alert('Please add a price'); return; }
    setLoading(true);

    const { data: sessionData } = await supabase.auth.getSession();
    const sellerId = sessionData?.session?.user?.id ?? null;

    const insertData: any = {
      title: title.trim(),
      description: desc.trim(),
      price: parseFloat(price),
      condition: condition.toLowerCase().replace(' ', '_'),
      location_name: 'Chennai',
      category_id: category.id,
      status: 'active',
    };
    if (sellerId) insertData.seller_id = sellerId;

    const { data: listing, error } = await supabase
      .from('listings')
      .insert(insertData)
      .select('id')
      .single();

    if (error) {
      setLoading(false);
      alert('Failed: ' + error.message);
      return;
    }

    if (images.length > 0) {
      await uploadImages(listing.id);
    }

    setLoading(false);
    alert('Success! Your listing is live!');
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={s.root}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.close}>✕</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>New listing</Text>
        <Text style={s.draft}>Save draft</Text>
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.body}>
        <Text style={s.label}>Photos <Text style={s.labelSub}>({images.length} of 5 added)</Text></Text>
        <View style={s.photoGrid}>
          {images.map((uri, i) => (
            <View key={i} style={s.photoSlot}>
              <Image source={{ uri }} style={s.photoImg} />
              {i === 0 && <View style={s.coverBadge}><Text style={s.coverTxt}>COVER</Text></View>}
              <TouchableOpacity style={s.delBtn} onPress={() => setImages(imgs => imgs.filter((_, j) => j !== i))}>
                <Text style={s.delTxt}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
          {images.length < 5 && (
            <TouchableOpacity style={s.photoAdd} onPress={pickImage}>
              <Text style={s.photoAddIcon}>+</Text>
              <Text style={s.photoAddTxt}>Add photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={s.label}>Title</Text>
        <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder="e.g. iPhone 11 128GB Black" placeholderTextColor="#5A6080" />

        <Text style={s.label}>Description</Text>
        <TextInput style={[s.input, s.textarea]} value={desc} onChangeText={setDesc} placeholder="Describe the item..." placeholderTextColor="#5A6080" multiline numberOfLines={3} />

        <Text style={s.label}>Condition</Text>
        <View style={s.condRow}>
          {CONDITIONS.map(c => (
            <TouchableOpacity key={c} style={[s.condBtn, condition === c && s.condBtnActive]} onPress={() => setCondition(c)}>
              <Text style={[s.condTxt, condition === c && s.condTxtActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.label}>Price</Text>
        <View style={s.priceRow}>
          <Text style={s.priceSym}>₹</Text>
          <TextInput style={s.priceInput} value={price} onChangeText={setPrice} placeholder="0" placeholderTextColor="#5A6080" keyboardType="number-pad" />
        </View>

        <Text style={s.label}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.catScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat.label} style={[s.catChip, category.label === cat.label && s.catChipActive]} onPress={() => setCategory(cat)}>
              <Text style={{ fontSize: 16 }}>{cat.emoji}</Text>
              <Text style={[s.catTxt, category.label === cat.label && s.catTxtActive]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={s.label}>Location</Text>
        <TouchableOpacity style={s.locationRow}>
          <Text style={{ fontSize: 14 }}>📍</Text>
          <Text style={s.locationTxt}>Keelkattalai, Chennai</Text>
          <Text style={s.locationChange}>Change</Text>
        </TouchableOpacity>

        <View style={s.toggleRow}>
          <View style={{ flex: 1 }}>
            <Text style={s.toggleName}>Sell to friends first</Text>
            <Text style={s.toggleSub}>Only your friends see this for 24 hours</Text>
          </View>
          <TouchableOpacity style={[s.toggle, !friendsFirst && s.toggleOff]} onPress={() => setFriendsFirst(f => !f)}>
            <View style={[s.toggleKnob, !friendsFirst && s.toggleKnobOff]} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={s.ctaWrap}>
        <TouchableOpacity style={[s.publishBtn, loading && { opacity: 0.6 }]} onPress={publish} disabled={loading}>
          <Text style={s.publishTxt}>{loading ? 'Uploading & publishing...' : 'Publish listing →'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D1A' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 0.5, borderBottomColor: '#1C1C38' },
  close: { fontSize: 18, color: '#5A6080' },
  headerTitle: { fontSize: 15, fontWeight: '600', color: '#F0F0F5' },
  draft: { fontSize: 12, color: '#1DCEA0' },
  scroll: { flex: 1 },
  body: { padding: 16, gap: 12 },
  label: { fontSize: 12, color: '#A8AECB', fontWeight: '500' },
  labelSub: { color: '#5A6080', fontWeight: '400' },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  photoSlot: { width: 80, height: 80, borderRadius: 10, overflow: 'hidden', position: 'relative' },
  photoImg: { width: 80, height: 80 },
  coverBadge: { position: 'absolute', bottom: 4, left: 4, backgroundColor: '#1DCEA0', borderRadius: 3, paddingHorizontal: 4, paddingVertical: 1 },
  coverTxt: { fontSize: 7, fontWeight: '700', color: '#0D0D1A' },
  delBtn: { position: 'absolute', top: 4, right: 4, width: 16, height: 16, backgroundColor: 'rgba(255,107,107,0.8)', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  delTxt: { fontSize: 8, color: '#fff' },
  photoAdd: { width: 80, height: 80, borderRadius: 10, borderWidth: 1.5, borderColor: 'rgba(29,206,160,0.35)', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 3 },
  photoAddIcon: { fontSize: 22, color: '#5A6080' },
  photoAddTxt: { fontSize: 9, color: '#5A6080' },
  input: { backgroundColor: '#1C1C38', borderRadius: 10, padding: 12, fontSize: 13, color: '#F0F0F5' },
  textarea: { height: 80, textAlignVertical: 'top' },
  condRow: { flexDirection: 'row', gap: 6 },
  condBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: '#1C1C38', alignItems: 'center' },
  condBtnActive: { backgroundColor: 'rgba(29,206,160,0.18)', borderWidth: 0.5, borderColor: '#1DCEA0' },
  condTxt: { fontSize: 11, fontWeight: '500', color: '#A8AECB' },
  condTxtActive: { color: '#1DCEA0' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#1C1C38', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  priceSym: { fontSize: 18, fontWeight: '600', color: '#A8AECB' },
  priceInput: { flex: 1, fontSize: 16, fontWeight: '600', color: '#F0F0F5' },
  catScroll: { marginHorizontal: -16 },
  catChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#1C1C38', borderRadius: 100, paddingHorizontal: 12, paddingVertical: 7, marginLeft: 8 },
  catChipActive: { backgroundColor: 'rgba(29,206,160,0.18)', borderWidth: 0.5, borderColor: '#1DCEA0' },
  catTxt: { fontSize: 12, color: '#A8AECB' },
  catTxtActive: { color: '#1DCEA0' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#1C1C38', borderRadius: 10, padding: 12 },
  locationTxt: { flex: 1, fontSize: 12, color: '#A8AECB' },
  locationChange: { fontSize: 11, color: '#1DCEA0' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C38', borderRadius: 10, padding: 12, gap: 12 },
  toggleName: { fontSize: 13, fontWeight: '500', color: '#F0F0F5', marginBottom: 2 },
  toggleSub: { fontSize: 11, color: '#5A6080' },
  toggle: { width: 36, height: 20, borderRadius: 10, backgroundColor: '#1DCEA0', justifyContent: 'center', paddingHorizontal: 2 },
  toggleOff: { backgroundColor: '#252542' },
  toggleKnob: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#fff', alignSelf: 'flex-end' },
  toggleKnobOff: { alignSelf: 'flex-start' },
  ctaWrap: { padding: 16 },
  publishBtn: { backgroundColor: '#1DCEA0', borderRadius: 14, padding: 15, alignItems: 'center' },
  publishTxt: { fontSize: 15, fontWeight: '700', color: '#0D0D1A' },
});