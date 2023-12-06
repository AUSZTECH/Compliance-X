import React from 'react'

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons'
import COLORS from '../../theme/COLORS'

// Screen
import HomeStack from './Stacks/HomeStack'
import ChecklistStack from './Stacks/ChecklistStack'
import TemplateStack from './Stacks/TemplateStack'
import SettingsStack from './Stacks/SettingsStack'


const Tab = createBottomTabNavigator()

const ChecklistContainer = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.primary,
            tabBarActiveBackgroundColor: COLORS.TabColor,
            tabBarInactiveBackgroundColor: COLORS.TabColor,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name

                if (rn === 'Home') {
                    iconName = focused ? 'home' : 'home-outline'
                } else if (rn === 'Checklist') {
                    iconName = focused ? 'clipboard' : 'clipboard-outline'
                } else if (rn === 'Actions') {
                    iconName = focused ? 'checkmark-done-circle' : 'checkmark-done-circle-outline'
                } else if (rn === 'Template') {
                    iconName = focused ? 'construct' : 'construct-outline'
                } else if (rn === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline'
                }

                return <Ionicons name={iconName} color={color} size={size} />
            }
        })} >
            <Tab.Screen name={'Home'} component={HomeStack} />
            <Tab.Screen name={'Checklist'} component={ChecklistStack} />
            <Tab.Screen name={'Actions'} component={ChecklistStack} />
            <Tab.Screen name={'Template'} component={TemplateStack} />
            <Tab.Screen name={'Settings'} component={SettingsStack} />
        </Tab.Navigator>
    )
}

export default ChecklistContainer