import React from 'react'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Native Base
import { Box, Fab, Icon, ScrollView, Stack } from 'native-base'

//icons
import AntDesign from 'react-native-vector-icons/AntDesign'


// Components
import Header from '../../../../components/Header'
import AnimatedCard from '../../../../components/Management/AnimatedCard'

const SitesScreen = () => {

    const navigation = useNavigation()

    return (
        <Box variant={'container'} safeAreaTop >

            <Header>Sites</Header>
            <ScrollView>
                <Stack variant={'container'} space={4} >
                    <AnimatedCard
                        heading={'Arqam Solutions'}
                        text1={'Parent Site'}
                        text2={'_'}
                    />
                </Stack>
            </ScrollView>



            <Fab
                renderInPortal={false}
                size={'sm'}
                shadow={'2'}
                label={'Add New Site'}
                icon={<Icon as={AntDesign} name={'plus'} />}
                onPress={() => navigation.navigate("Add Site Screen")}
            />
        </Box>
    )
}

export default SitesScreen