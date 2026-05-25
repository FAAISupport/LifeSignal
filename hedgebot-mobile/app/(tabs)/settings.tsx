import { View, Text } from 'react-native';
import { ScreenShell } from '@/components/ScreenShell';

export default function SettingsScreen() {
  return (
    <ScreenShell title="Settings">
      <View>
        <Text style={{ color: '#E8FCEB', fontSize: 16 }}>HedgeBot Settings module foundation.</Text>
      </View>
    </ScreenShell>
  );
}
