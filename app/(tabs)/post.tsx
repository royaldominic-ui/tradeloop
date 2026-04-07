import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CONDITIONS = ['New', 'Like new', 'Good', 'Fair'];
const CATEGORIES = [
  { label: 'Mobiles', emoji: '📱' },
  { label: 'Electronics', emoji: '💻' },
  { label: 'Furniture', emoji: '🛋️' },
  { label: 'Cars', emoji: '🚗' },
  { label: 'Fashion', emoji: '👗' },
  { label: 'Books', emoji: '📚' },
];

export default function PostScreen() {
  const [condition, setCondition] = useState('Good');
  const [category, setCategory] = useState('Mobiles');
  const [friendsFirst, setFriendsFirst] = useState(true);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <SafeAreaView style={s.root}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.close}>✕</Text>
        <Text style={s.headerTitle}>New listing</Text>
        <Text style={s.draft}>Save draft</Text>
      </View>

      {/* Progress */}
      <View style={s.progress}>
        {[0,1,2,3].map(i => (
          <View key={i} style={[s.progressPip, i <= 1 && s.progressDone, i === 2 && s.progressActive]} />
        ))}
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.body}>

        {/* Photos */}
        <Text style={s.label}>Photos <Text style={s.labelSub}>(3 of 5 added)</Text></Text>
        <View style={s.photoGrid}>
          <View style={[s.photoSlot, { backgroundColor: '#1C1040' }]}>
            <Text style={{ fontSize: 28 }}>📱</Text>
            <View style={s.coverBadge}><Text style={s.coverTxt}>COVER</Text></View>
            <TouchableOpacity style={s.delBtn}><Text style={s.delTxt}>✕</Text></TouchableOpacity>
          </View>
          <View style={[s.photoSlot, { backgroundColor: '#1C1040' }]}>
            <Text style={{ fontSize: 28 }}>📱</Text>
            <TouchableOpacity style={s.delBtn}><Text style={s.delTxt}>✕</Text></TouchableOpacity>
          </View>
          <View style={[s.photoSlot, { backgroundColor: '#1C1040' }]}>
            <Text style={{ fontSize: 28 }}>📱</Text>
            <TouchableOpacity style={s.delBtn}><Text style={s.delTxt}>✕</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={s.photoAdd}>
            <Text style={s.photoAddIcon}>+</Text>
            <Text style={s.photoAddTxt}>Add photo</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={s.label}>Title</Text>
        <TextInput
          style={s.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. iPhone 11 128GB Black"
          placeholderTextColor="#5A6080"
        />
        <View style={s.aiSuggest}>
          <View style={s.aiDot} />
          <Text style={s.aiTxt}>AI: Add battery health + box info for 3× more responses</Text>
          <Text style={s.aiApply}>Apply</Text>
        </View>

        {/* Description */}
        <Text style={s.label}>Description</Text>
        <TextInput
          style={[s.input, s.textarea]}
          value={desc}
          onChangeText={setDesc}
          placeholder="Describe the item..."
          placeholderTextColor="#5A6080"
          multiline
          numberOfLines={3}
        />

        {/* Condition */}
        <Text style={s.label}>Condition</Text>
        <View style={s.condRow}>
          {CONDITIONS.map(c => (
            <TouchableOpacity key={c} style={[s.condBtn, condition === c && s.condBtnActive]} onPress={() => setCondition(c)}>
              <Text style={[s.condTxt, condition === c && s.condTxtActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Price */}
        <Text style={s.label}>Price</Text>
        <View style={s.priceRow}>
          <Text style={s.priceSym}>₹</Text>
          <TextInput
            style={s.priceInput}
            value={price}
            onChangeText={setPrice}
            placeholder="0"
            placeholderTextColor="#5A6080"
            keyboardType="number-pad"
          />
          <TouchableOpacity style={s.avgBtn}>
            <Text style={s.avgTxt}>Avg ₹9,200 ↗</Text>
          </TouchableOpacity>
        </View>

        {/* Category */}
        <Text style={s.label}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.catScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat.label} style={[s.catChip, category === cat.label && s.catChipActive]} onPress={() => setCategory(cat.label)}>
              <Text style={{ fontSize: 16 }}>{cat.emoji}</Text>
              <Text style={[s.catTxt, category === cat.label && s.catTxtActive]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Location */}
        <Text style={s.label}>Location</Text>
        <TouchableOpacity style={s.locationRow}>
          <Text style={{ fontSize: 14 }}>📍</Text>
          <Text style={s.locationTxt}>Keelkattalai, Chennai</Text>
          <Text style={s.locationChange}>Change</Text>
        </TouchableOpacity>

        {/* Friends first toggle */}
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

      {/* Publish button */}
      <View style={s.ctaWrap}>
        <TouchableOpacity style={s.publishBtn}>
          <Text style={s.publishTxt}>Publish listing →</Text>
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
  progress: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 12 },
  progressPip: { height: 4, flex: 1, borderRadius: 2, backgroundColor: '#1C1C38' },
  progressDone: { backgroundColor: '#1DCEA0' },
  progressActive: { backgroundColor: '#1DCEA0', opacity: 0.5 },
  scroll: { flex: 1 },
  body: { padding: 16, gap: 12 },
  label: { fontSize: 12, color: '#A8AECB', fontWeight: '500' },
  labelSub: { color: '#5A6080', fontWeight: '400' },
  photoGrid: { flexDirection: 'row', gap: 8 },
  photoSlot: { width: 80, height: 80, borderRadius: 10, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  coverBadge: { position: 'absolute', bottom: 4, left: 4, backgroundColor: '#1DCEA0', borderRadius: 3, paddingHorizontal: 4, paddingVertical: 1 },
  coverTxt: { fontSize: 7, fontWeight: '700', color: '#0D0D1A' },
  delBtn: { position: 'absolute', top: 4, right: 4, width: 16, height: 16, backgroundColor: 'rgba(255,107,107,0.8)', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  delTxt: { fontSize: 8, color: '#fff' },
  photoAdd: { width: 80, height: 80, borderRadius: 10, borderWidth: 1.5, borderColor: 'rgba(29,206,160,0.35)', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 3 },
  photoAddIcon: { fontSize: 22, color: '#5A6080' },
  photoAddTxt: { fontSize: 9, color: '#5A6080' },
  input: { backgroundColor: '#1C1C38', borderRadius: 10, padding: 12, fontSize: 13, color: '#F0F0F5' },
  textarea: { height: 80, textAlignVertical: 'top' },
  aiSuggest: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(29,206,160,0.08)', borderRadius: 8, padding: 8, marginTop: -4 },
  aiDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#1DCEA0' },
  aiTxt: { flex: 1, fontSize: 11, color: '#1DCEA0' },
  aiApply: { fontSize: 11, fontWeight: '600', color: '#1DCEA0' },
  condRow: { flexDirection: 'row', gap: 6 },
  condBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: '#1C1C38', alignItems: 'center' },
  condBtnActive: { backgroundColor: 'rgba(29,206,160,0.18)', borderWidth: 0.5, borderColor: '#1DCEA0' },
  condTxt: { fontSize: 11, fontWeight: '500', color: '#A8AECB' },
  condTxtActive: { color: '#1DCEA0' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#1C1C38', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  priceSym: { fontSize: 18, fontWeight: '600', color: '#A8AECB' },
  priceInput: { flex: 1, fontSize: 16, fontWeight: '600', color: '#F0F0F5' },
  avgBtn: { backgroundColor: 'rgba(29,206,160,0.18)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  avgTxt: { fontSize: 11, color: '#1DCEA0' },
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