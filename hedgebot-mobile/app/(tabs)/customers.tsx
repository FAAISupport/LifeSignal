import { View, Text } from 'react-native';
import { ScreenShell } from '@/components/ScreenShell';

export default function CustomersScreen() {
  return (
    <ScreenShell title="Customers">
      <View>
        <Text style={{ color: '#E8FCEB', fontSize: 16 }}>HedgeBot Customers module foundation.</Text>
      </View>
    </ScreenShell>
  );
}
