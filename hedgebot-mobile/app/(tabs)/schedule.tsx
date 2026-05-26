import { View, Text } from 'react-native';
import { ScreenShell } from '@/components/ScreenShell';

export default function ScheduleScreen() {
  return (
    <ScreenShell title="Schedule">
      <View>
        <Text style={{ color: '#E8FCEB', fontSize: 16 }}>HedgeBot Schedule module foundation.</Text>
      </View>
    </ScreenShell>
  );
}
