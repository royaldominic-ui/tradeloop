import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const INITIAL_MESSAGES = [
  { id: '1', me: false, text: 'Hi! Is the iPhone still available? 😊', time: '9:31' },
  { id: '2', me: true, text: "Yes, it's available! Just listed it today.", time: '9:33' },
  { id: '3', me: false, text: "What's the battery health? Does it come with original box?", time: '9:34' },
  { id: '4', me: true, text: 'Battery is 89%. Yes original box, charger and earphones included!', time: '9:35' },
];

const QUICK_REPLIES = ['Is this available?', 'Best price?', 'Meet today?', "I'll take it!"];

export default function ChatScreen() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { id: Date.now().toString(), me: true, text, time: 'now' }]);
    setInput('');
  };

  return (
    <SafeAreaView style={s.root}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.back}>←</Text>
        <View style={[s.av, { backgroundColor: '#6C63FF' }]}>
          <Text style={s.avTxt}>P</Text>
          <View style={s.onlineDot} />
        </View>
        <View style={s.headerInfo}>
          <Text style={s.headerName}>Priya Krishnan</Text>
          <Text style={s.headerStatus}>● Online now</Text>
        </View>
        <Text style={s.more}>⋯</Text>
      </View>

      {/* Listing preview */}
      <View style={s.listingPreview}>
        <View style={s.lpThumb}><Text style={{ fontSize: 24 }}>📱</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={s.lpTitle}>iPhone 11 128GB Midnight Black</Text>
          <Text style={s.lpPrice}>₹ 8,500</Text>
        </View>
        <Text style={s.lpArrow}>›</Text>
      </View>

      {/* Messages */}
      <ScrollView style={s.messages} contentContainerStyle={{ padding: 14, gap: 12 }}>
        <Text style={s.dayLabel}>Today</Text>
        {messages.map(msg => (
          <View key={msg.id} style={[s.msgRow, msg.me && s.msgRowMe]}>
            {!msg.me && <View style={[s.msgAv, { backgroundColor: '#6C63FF' }]}><Text style={s.msgAvTxt}>P</Text></View>}
            <View style={[s.bubble, msg.me ? s.bubbleMe : s.bubbleThem]}>
              <Text style={[s.bubbleTxt, msg.me && s.bubbleTxtMe]}>{msg.text}</Text>
              <Text style={[s.bubbleTime, msg.me && s.bubbleTimeMe]}>{msg.time}{msg.me ? ' ✓✓' : ''}</Text>
            </View>
          </View>
        ))}

        {/* Offer bubble */}
        <View style={s.msgRow}>
          <View style={[s.msgAv, { backgroundColor: '#6C63FF' }]}><Text style={s.msgAvTxt}>P</Text></View>
          <View style={s.offerBubble}>
            <Text style={s.offerLabel}>OFFER RECEIVED</Text>
            <Text style={s.offerAmt}>₹ 7,500</Text>
            <View style={s.offerBtns}>
              <TouchableOpacity style={s.acceptBtn}><Text style={s.acceptTxt}>Accept</Text></TouchableOpacity>
              <TouchableOpacity style={s.counterBtn}><Text style={s.counterTxt}>Counter</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Quick replies */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.quickScroll} contentContainerStyle={s.quickContent}>
        {QUICK_REPLIES.map(r => (
          <TouchableOpacity key={r} style={s.quickChip} onPress={() => send(r)}>
            <Text style={s.quickTxt}>{r}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={s.inputBar}>
        <TouchableOpacity style={s.attachBtn}><Text style={{ fontSize: 16 }}>📎</Text></TouchableOpacity>
        <TextInput
          style={s.input}
          value={input}
          onChangeText={setInput}
          placeholder="Message..."
          placeholderTextColor="#5A6080"
          onSubmitEditing={() => send(input)}
        />
        <TouchableOpacity style={s.sendBtn} onPress={() => send(input)}>
          <Text style={s.sendTxt}>➤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D1A' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderBottomWidth: 0.5, borderBottomColor: '#1C1C38', backgroundColor: '#141428' },
  back: { fontSize: 20, color: '#A8AECB', paddingRight: 4 },
  av: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  avTxt: { fontSize: 15, fontWeight: '700', color: '#fff' },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, backgroundColor: '#1DCEA0', borderRadius: 5, borderWidth: 2, borderColor: '#141428' },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 14, fontWeight: '600', color: '#F0F0F5' },
  headerStatus: { fontSize: 11, color: '#1DCEA0' },
  more: { fontSize: 20, color: '#5A6080' },
  listingPreview: { flexDirection: 'row', alignItems: 'center', gap: 10, margin: 12, backgroundColor: '#1C1C38', borderRadius: 12, padding: 10 },
  lpThumb: { width: 48, height: 48, backgroundColor: '#252542', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  lpTitle: { fontSize: 12, fontWeight: '500', color: '#F0F0F5', marginBottom: 2 },
  lpPrice: { fontSize: 15, fontWeight: '700', color: '#1DCEA0' },
  lpArrow: { fontSize: 16, color: '#5A6080' },
  messages: { flex: 1 },
  dayLabel: { textAlign: 'center', fontSize: 11, color: '#5A6080', marginBottom: 4 },
  msgRow: { flexDirection: 'row', gap: 7, alignItems: 'flex-end', marginBottom: 8 },
  msgRowMe: { flexDirection: 'row-reverse' },
  msgAv: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  msgAvTxt: { fontSize: 10, fontWeight: '700', color: '#fff' },
  bubble: { maxWidth: '72%', borderRadius: 14, padding: 10 },
  bubbleMe: { backgroundColor: '#1DCEA0', borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: '#1C1C38', borderBottomLeftRadius: 4 },
  bubbleTxt: { fontSize: 13, color: '#F0F0F5', lineHeight: 18 },
  bubbleTxtMe: { color: '#0D0D1A' },
  bubbleTime: { fontSize: 9, color: '#5A6080', marginTop: 3 },
  bubbleTimeMe: { color: 'rgba(13,13,26,0.55)', textAlign: 'right' },
  offerBubble: { maxWidth: '72%', backgroundColor: '#1C1C38', borderWidth: 0.5, borderColor: 'rgba(29,206,160,0.3)', borderRadius: 14, padding: 12 },
  offerLabel: { fontSize: 9, fontWeight: '600', color: '#1DCEA0', letterSpacing: 0.5, marginBottom: 3 },
  offerAmt: { fontSize: 22, fontWeight: '700', color: '#F0F0F5', marginBottom: 8 },
  offerBtns: { flexDirection: 'row', gap: 6 },
  acceptBtn: { flex: 1, backgroundColor: '#1DCEA0', borderRadius: 8, padding: 7, alignItems: 'center' },
  acceptTxt: { fontSize: 12, fontWeight: '700', color: '#0D0D1A' },
  counterBtn: { flex: 1, backgroundColor: '#252542', borderRadius: 8, padding: 7, alignItems: 'center' },
  counterTxt: { fontSize: 12, color: '#A8AECB' },
  quickScroll: { maxHeight: 44 },
  quickContent: { paddingHorizontal: 12, gap: 8, alignItems: 'center' },
  quickChip: { backgroundColor: '#1C1C38', borderRadius: 100, paddingHorizontal: 14, paddingVertical: 6 },
  quickTxt: { fontSize: 12, color: '#A8AECB' },
  inputBar: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderTopWidth: 0.5, borderTopColor: '#1C1C38', backgroundColor: '#141428' },
  attachBtn: { width: 36, height: 36, backgroundColor: '#1C1C38', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, backgroundColor: '#1C1C38', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 8, fontSize: 13, color: '#F0F0F5' },
  sendBtn: { width: 36, height: 36, backgroundColor: '#1DCEA0', borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  sendTxt: { fontSize: 14, color: '#0D0D1A' },
});