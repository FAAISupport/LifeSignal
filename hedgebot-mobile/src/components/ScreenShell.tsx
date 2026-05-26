import { ReactNode } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { appTheme } from '@/theme/theme';

type Props = { title: string; children: ReactNode };

export function ScreenShell({ title, children }: Props) {
  return (
    <LinearGradient colors={['#040505', '#0B100D']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, padding: appTheme.spacing.md }}>
        <Text style={{ color: appTheme.colors.text, fontSize: 28, fontWeight: '700', marginBottom: appTheme.spacing.md }}>
          {title}
        </Text>
        <View
          style={{
            backgroundColor: appTheme.colors.card,
            borderColor: appTheme.colors.border,
            borderWidth: 1,
            borderRadius: appTheme.radius.lg,
            padding: appTheme.spacing.md
          }}
        >
          {children}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
