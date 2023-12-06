import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'


// Navigation
import { useNavigation } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

// Native Base
import { Box, Button, Heading, Hidden, HStack, Icon, IconButton, Image, PresenceTransition, Stack, VStack } from 'native-base'

//Icons
import AntDesign from 'react-native-vector-icons/AntDesign'

// Screen
import Dashboard from './Dashboard/Dashboard'
import ChecklistContainer from './Checklist/ChecklistContainer'
import ManagementContainer from './Management/ManagementContainer'
import COLORS from '../theme/COLORS'

const Drawer = createDrawerNavigator()

const DashboardDrawer = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name={'Dashboard'} component={Dashboard} />
            <Drawer.Screen name={'Checklist Container'} component={ChecklistContainer} options={{
                drawerLabel: 'Checklist'
            }} />
            <Drawer.Screen name={'Management Container'} component={ManagementContainer} options={{
                drawerLabel: 'Management'
            }} />
        </Drawer.Navigator>
    )
}


const CustomDrawerContent = (props) => {

    const navigation = useNavigation()

    const options = [
         {
             title: 'Dashboard',
             route: 'Dashboard'
        },
         {
             title: 'Checklist',
             route: 'Checklist Container',
    //         children: [
    //             {
    //                 title: 'Home',
    //                 route: 'Home'
    //             },
    //             {
    //                 title: 'Checklist',
    //                 route: 'Checklist'
    //             },
    //             {
    //                 title: 'Template',
    //                 route: 'Template'
    //             },
    //             {
    //                 title: 'Settings',
    //                 route: 'Settings'
    //             },
    //         ]
         },
        {
            title: 'Management',
             route: 'Management Container',
    //         children: [
    //             {
    //                 title: 'Company',
    //                 route: 'Company'
    //             },
    //             {
    //                 title: 'Sites',
    //                 route: 'Sites'
    //             },
    //             {
    //                 title: 'Roles',
    //                 route: 'Roles'
    //             },
    //             {
    //                 title: 'Users',
    //                 route: 'Users'
    //             },
    //         ]
         }
     ]

    return (
        <DrawerContentScrollView {...props} >
            <Box p={8} >
                <Image
                    source={require('../assets/images/logoColored.png')}
                    style={{
                        height: 50
                    }}
                    resizeMode={'contain'}
                    alt={'ComplianceX'}
                />{/*  */}
            </Box>
            {options.map((item, index) => {

                const [isOpen, setOpen] = useState(false)

                return (
                    props.state.index === index ? (
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.navigate(item.route)}
                            key={index}
                            style={{
                                backgroundColor: COLORS.primary,
                                justifyContent: 'center',
                                paddingHorizontal: 12,
                                height: 50
                            }}
                        >
                            <Heading
                                size={'sm'}
                                color={'white'}
                            >
                                {item.title}
                            </Heading>
                        </TouchableOpacity>
                    ) : (
                        <Box
                            key={index}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate(item.route)}
                                style={{
                                    justifyContent: 'center',
                                    paddingHorizontal: 12,
                                    height: 50,
                                }}
                            >
                                <HStack justifyContent={'space-between'} alignItems={'center'} >
                                    <Heading size={'sm'} >
                                        {item.title}
                                    </Heading>

                                    {item.children && (
                                        <IconButton
                                            size={'sm'}
                                            icon={<Icon as={AntDesign} name={isOpen ? 'up' : 'down'} size={'sm'} />}
                                            onPress={() => setOpen(prev => !prev)}
                                        />
                                    )}
                                </HStack>

                            </TouchableOpacity>
                            {isOpen && (
                                <PresenceTransition
                                    key={index}
                                    visible={isOpen}
                                    initial={{
                                        opacity: 0,
                                        scale: 0
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        transition: {
                                            duration: 250
                                        }
                                    }}
                                >
                                    <VStack paddingX={2} space={2}  >
                                        {item.children?.map((childItem, childIndex) => (
                                            <Button
                                                variant={'subtle'}
                                                size={'sm'}
                                                borderRadius={3}
                                                key={childIndex}
                                                onPress={() => navigation.navigate(item.route, {
                                                    screen: childItem.route
                                                })}
                                            >{childItem.title}</Button>
                                        ))}
                                    </VStack>
                                </PresenceTransition>
                            )}
                        </Box>
                    )
                )
            })}
          
        </DrawerContentScrollView>
    )
}

export default DashboardDrawer