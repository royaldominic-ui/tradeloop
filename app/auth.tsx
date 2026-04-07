import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from './lib/supabase';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState('login');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) { Alert.alert('Enter email and password'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { Alert.alert('Error', error.message); return; }
    router.replace('/(tabs)');
  };

  const signup = async () => {
    if (!email || !password || !name) { Alert.alert('Fill in all fields'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) { Alert.alert('Error', error.message); return; }
    Alert.alert('Success!', 'Check your email to confirm, then log in.');
    setStep('login');
  };

  const googleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:8081/(tabs)' },
    });
    if (error) { Alert.alert('Error', error.message); return; }
    if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <SafeAreaView style={s.root}>
      <View style={s.hero}>
        <View style={s.logoBox}>
          <Text style={s.logoIcon}>🔄</Text>
        </View>
        <Text style={s.logo}>trade<Text style={s.accent}>loop</Text></Text>
        <Text style={s.tagline}>sell to friends first</Text>
      </View>

      <View style={s.form}>
        {/* Google button */}
        <TouchableOpacity style={s.googleBtn} onPress={googleLogin}>
          <Text style={s.googleIcon}>G</Text>
          <Text style={s.googleTxt}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={s.dividerRow}>
          <View style={s.dividerLine} />
          <Text style={s.dividerTxt}>or</Text>
          <View style={s.dividerLine} />
        </View>

        <View style={s.tabs}>
          <TouchableOpacity style={[s.tab, step === 'login' && s.tabActive]} onPress={() => setStep('login')}>
            <Text style={[s.tabTxt, step === 'login' && s.tabTxtActive]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.tab, step === 'signup' && s.tabActive]} onPress={() => setStep('signup')}>
            <Text style={[s.tabTxt, step === 'signup' && s.tabTxtActive]}>Sign up</Text>
          </TouchableOpacity>
        </View>

        {step === 'signup' && (
          <TextInput
            style={s.input}
            placeholder="Your name"
            placeholderTextColor="#5A6080"
            value={name}
            onChangeText={setName}
          />
        )}

        <TextInput
          style={s.input}
          placeholder="Email address"
          placeholderTextColor="#5A6080"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={s.input}
          placeholder="Password"
          placeholderTextColor="#5A6080"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[s.btn, loading && { opacity: 0.6 }]}
          onPress={step === 'login' ? login : signup}
          disabled={loading}
        >
          <Text style={s.btnTxt}>
            {loading ? 'Please wait...' : step === 'login' ? 'Login' : 'Create account'}
          </Text>
        </TouchableOpacity>

        <Text style={s.terms}>By continuing you agree to our Terms and Privacy Policy</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D1A' },
  hero: { alignItems: 'center', paddingTop: 80, paddingBottom: 40, gap: 10 },
  logoBox: { width: 72, height: 72, backgroundColor: '#1C1C38', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  logoIcon: { fontSize: 32 },
  logo: { fontSize: 26, fontWeight: '700', color: '#F0F0F5' },
  accent: { color: '#1DCEA0' },
  tagline: { fontSize: 13, color: '#5A6080' },
  form: { paddingHorizontal: 24, gap: 14 },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, gap: 10 },
  googleIcon: { fontSize: 18, fontWeight: '700', color: '#4285F4' },
  googleTxt: { fontSize: 15, fontWeight: '600', color: '#1A1A1A' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dividerLine: { flex: 1, height: 0.5, backgroundColor: '#1C1C38' },
  dividerTxt: { fontSize: 12, color: '#5A6080' },
  tabs: { flexDirection: 'row', backgroundColor: '#1C1C38', borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: '#1DCEA0' },
  tabTxt: { fontSize: 14, fontWeight: '600', color: '#5A6080' },
  tabTxtActive: { color: '#0D0D1A' },
  input: { backgroundColor: '#1C1C38', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#F0F0F5' },
  btn: { backgroundColor: '#1DCEA0', borderRadius: 14, padding: 16, alignItems: 'center' },
  btnTxt: { fontSize: 15, fontWeight: '700', color: '#0D0D1A' },
  terms: { fontSize: 11, color: '#5A6080', textAlign: 'center', lineHeight: 18 },
});