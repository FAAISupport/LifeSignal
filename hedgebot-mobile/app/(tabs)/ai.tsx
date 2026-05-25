import { View, Text } from 'react-native';
import { ScreenShell } from '@/components/ScreenShell';

export default function AiScreen() {
  return (
    <ScreenShell title="Ai">
      <View>
        <Text style={{ color: '#E8FCEB', fontSize: 16 }}>HedgeBot Ai module foundation.</Text>
      </View>
    </ScreenShell>
  );
}
