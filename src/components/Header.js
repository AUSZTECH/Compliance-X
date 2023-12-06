import React from 'react'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Native Base
import { Box, Heading, HStack, Icon, IconButton } from 'native-base'

// Icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



const Header = ({ children }) => {

    const navigation = useNavigation()

    return (
        <HStack px={4} pt={2} >
            <IconButton
                variant={'subtle'}
                icon={<Icon as={MaterialIcons} name={'menu'} size={'xl'} />}
                onPress={() => navigation.toggleDrawer()}
            />
            <Box flex={1} alignItems={'center'} justifyContent={'center'} >
                <Heading color={'#000'} >{children}</Heading>
            </Box>
        </HStack>
    )
}

export default Header
