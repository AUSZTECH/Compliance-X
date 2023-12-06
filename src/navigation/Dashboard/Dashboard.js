import React from 'react'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Native Base
import { Box, Center, Heading, HStack, Icon, IconButton } from 'native-base'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Header from '../../components/Header'

const Dashboard = () => {

    const navigation = useNavigation()

    return (
        <Box variant={'container'} safeAreaTop >
            <Header>Dashboard</Header>
        </Box>
    )
}

export default Dashboard