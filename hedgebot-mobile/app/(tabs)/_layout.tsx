import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { appTheme } from '@/theme/theme';

const tabs = [
  ['index', 'Dashboard', 'grid-outline'],
  ['leads', 'Leads', 'funnel-outline'],
  ['schedule', 'Schedule', 'calendar-outline'],
  ['crews', 'Crews', 'people-outline'],
  ['ai', 'AI', 'sparkles-outline'],
  ['customers', 'Customers', 'person-circle-outline'],
  ['marketing', 'Marketing', 'megaphone-outline'],
  ['settings', 'Settings', 'settings-outline']
] as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: appTheme.colors.surface, borderTopColor: appTheme.colors.border },
        tabBarActiveTintColor: appTheme.colors.accent,
        tabBarInactiveTintColor: appTheme.colors.muted
      }}
    >
      {tabs.map(([name, title, icon]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => <Ionicons name={icon} color={color} size={size} />
          }}
        />
      ))}
    </Tabs>
  );
}
