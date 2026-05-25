import { View, Text } from 'react-native';
import { ScreenShell } from '@/components/ScreenShell';

export default function LeadsScreen() {
  return (
    <ScreenShell title="Leads">
      <View>
        <Text style={{ color: '#E8FCEB', fontSize: 16 }}>HedgeBot Leads module foundation.</Text>
      </View>
    </ScreenShell>
  );
}
