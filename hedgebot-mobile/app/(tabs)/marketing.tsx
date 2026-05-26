import { View, Text } from 'react-native';
import { ScreenShell } from '@/components/ScreenShell';

export default function MarketingScreen() {
  return (
    <ScreenShell title="Marketing">
      <View>
        <Text style={{ color: '#E8FCEB', fontSize: 16 }}>HedgeBot Marketing module foundation.</Text>
      </View>
    </ScreenShell>
  );
}
