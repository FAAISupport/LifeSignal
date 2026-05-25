import { View, Text } from 'react-native';
import { ScreenShell } from '@/components/ScreenShell';

export default function IndexScreen() {
  return (
    <ScreenShell title="Index">
      <View>
        <Text style={{ color: '#E8FCEB', fontSize: 16 }}>HedgeBot Index module foundation.</Text>
      </View>
    </ScreenShell>
  );
}
