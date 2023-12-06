import React from 'react'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Native Base
import { Box, Fab, Icon, ScrollView, Stack } from 'native-base'

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign'

// Component
import Header from '../../../../components/Header'
import AnimatedCard from '../../../../components/Management/AnimatedCard'

const RolesScreen = () => {

    const navigation = useNavigation()

    return (
        <Box variant={'container'} safeAreaTop >
            <Header>Roles</Header>
            <ScrollView>
                <Stack variant={'container'} space={4}  >
                    <AnimatedCard
                        heading={'Role'}
                        text1={'Parent'}
                        text2={'-'}
                    />
                </Stack>
            </ScrollView>

            <Fab
                renderInPortal={false}
                size={'sm'}
                shadow={'2'}
                label={'Add New Role'}
                icon={<Icon as={AntDesign} name={'plus'} />}
                onPress={() => navigation.navigate('Add Role Screen')}
            />
        </Box>
    )
}

export default RolesScreen