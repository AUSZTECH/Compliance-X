import React from 'react'

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons'
import COLORS from '../../theme/COLORS'

// Stacks
import CompanyStack from './Stacks/CompanyStack'
import RolesStack from './Stacks/RolesStack'
import SitesStack from './Stacks/SitesStack'
import UsersStack from './Stacks/UsersStack'
import { useAccessibleColors } from 'native-base'

const Tab = createBottomTabNavigator()

const ManagementContainer = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.primary,
            tabBarActiveBackgroundColor: COLORS.TabColor,
            tabBarInactiveBackgroundColor: COLORS.TabColor,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName
                let rn = route.name

                if (rn === 'Company') {
                    iconName = focused ? 'business' : 'business-outline'
                } else if (rn === 'Sites') {
                    iconName = focused ? 'map' : 'map-outline'
                } else if (rn === 'Roles') {
                    iconName = focused ? 'layers' : 'layers-outline'
                } else if (rn === 'Users') {
                    iconName = focused ? 'person' : 'person-outline'
                }
                return <Ionicons name={iconName} color={color} size={size} />
            }
        })} >
            <Tab.Screen name={'Company'} component={CompanyStack} />
            <Tab.Screen name={'Sites'} component={SitesStack} />
            <Tab.Screen name={'Roles'} component={RolesStack} />
            <Tab.Screen name={'Users'} component={UsersStack} />
        </Tab.Navigator>
    )
}

export default ManagementContainer