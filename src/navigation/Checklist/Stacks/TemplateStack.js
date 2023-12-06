import React from 'react'

// Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import TemplateScreen from '../Screens/Template/TemplateScreen'
import TemplateEditScreen from '../Screens/Template/TemplateEditScreen'
import OptionEditScreen from '../Screens/Template/OptionEditScreen'
import SectionMangerScreen from '../Screens/Template/SectionMangerScreen'

const Stack = createStackNavigator()

const TemplateStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={'Template Screen'} component={TemplateScreen} />
            <Stack.Screen name={'Template Edit Screen'} component={TemplateEditScreen} />
            <Stack.Screen name={'Option Edit Screen'} component={OptionEditScreen} />
            <Stack.Screen name={'Manage Section Screen'} component={SectionMangerScreen} />
        </Stack.Navigator>
    )
}

export default TemplateStack