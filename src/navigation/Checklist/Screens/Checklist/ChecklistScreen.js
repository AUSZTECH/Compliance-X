import React from 'react'

//natvigation
import { useNavigation } from '@react-navigation/native'

// Native Base
import { Box, Center, Fab, Heading, Icon, Stack } from 'native-base'

//icons
import AntDesign from 'react-native-vector-icons/AntDesign'

// Components
import Header from '../../../../components/Header'
import AnimatedCard from '../../../../components/Management/AnimatedCard'

const ChecklistScreen = () => {

    const navigation = useNavigation()

    return (
        <Box variant={'container'} safeAreaTop >
            <Header>Checklist</Header>
            <Stack space={4} p={4}>
                <AnimatedCard
                    heading={'Checklist'}
                    text1={'parent'}
                />
            </Stack>
            <Fab
                renderInPortal={false}
                size={'sm'}
                shadow={'2'}
                label={'Add New Checklist'}
                icon={<Icon as={AntDesign} name={'plus'} />}
                onPress={() => navigation.navigate("Add Checklist Screen")}
            />
        </Box>
    )
}

export default ChecklistScreen