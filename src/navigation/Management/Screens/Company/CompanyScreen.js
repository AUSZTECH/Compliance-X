import React from 'react'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Native Base
import { Box, Button, Card, Divider, Fab, Heading, HStack, Icon, ScrollView, Stack, Text } from 'native-base'

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign'

// Component
import Header from '../../../../components/Header'
import AnimatedCard from '../../../../components/Management/AnimatedCard'

const CompanyScreen = () => {

    const navigation = useNavigation()

    return (
        <Box variant={'container'} safeAreaTop  >
            <Header >Company</Header>

            <ScrollView >
                <Stack variant={'container'} space={4} >
                    <AnimatedCard
                        heading={'Cakes and Bakes'}
                        text1={'Parent'}
                        text2={'-'}
                    />
                     <AnimatedCard
                        heading={'Cakes and Bakes'}
                        text1={'Parent'}
                        text2={'-'}
                    />
                </Stack>
            </ScrollView>

            <Fab
                renderInPortal={false}
                size={'sm'}
                shadow={'2'}
                label={'Add New Company'}
                icon={<Icon as={AntDesign} name={'plus'} />}
                onPress={() => navigation.navigate("Add Company Screen")}
            />
        </Box>
    )
}

export default CompanyScreen