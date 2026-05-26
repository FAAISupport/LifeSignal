import { View, Text } from 'react-native';
import { ScreenShell } from '@/components/ScreenShell';

export default function CrewsScreen() {
  return (
    <ScreenShell title="Crews">
      <View>
        <Text style={{ color: '#E8FCEB', fontSize: 16 }}>HedgeBot Crews module foundation.</Text>
      </View>
    </ScreenShell>
  );
}
