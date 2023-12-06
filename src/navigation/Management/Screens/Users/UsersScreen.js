import React from 'react'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Native Base
import { Avatar, Box, Button, Card, Divider, Fab, Heading, HStack, Icon, IconButton, ScrollView, Stack, Text, VStack } from 'native-base'

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

// Components
import Header from '../../../../components/Header'
import UserCard from '../../../../components/Management/Users/UserCard'

const UsersScreen = () => {

    const navigation = useNavigation()

    return (
        <Box variant={'container'}  safeAreaTop >
            <Header>Users</Header>
            <ScrollView>
                <Stack variant={'container'} space={4} >
                    <UserCard
                        name={'Faisal'}
                        username={'faisal123'}
                        email={'faisal@gmail.com'}
                        company={'AuszTech'}
                        role={'Game Designers'}
                    />
                    <UserCard
                        name={'Asad Don'}
                        username={'asadon_Al_Qaeda'}
                        email={'asad@gmail.com'}
                        company={'AuszTech'}
                        role={'Undercover Terrorist (UST)'}
                    />
                </Stack>
            </ScrollView>
            <Fab
                renderInPortal={false}
                label={'Add New User'}
                size={'sm'}
                icon={<Icon as={AntDesign} name={'plus'} />}
                shadow={2}
                onPress={() => navigation.navigate('Add User Screen')}
            />
        </Box>
    )
}

export default UsersScreen