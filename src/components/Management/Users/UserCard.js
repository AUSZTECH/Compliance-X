import React, { useState } from 'react'

// Native Base
import { Avatar, Badge, Box, Divider, HStack, Icon, IconButton, Stack, Switch, Text, VStack } from 'native-base'

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

// React Native Reanimated
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const UserCard = ({ name, username, email, company, role }) => {

    const [isActive, setActive] = useState(true)


    // Animations

    // -- Card Animation

    const [isFlipped, setIsFlipped] = useState(false)
    const [cardHeight, setCardHeight] = useState(null)

    const rotate = useSharedValue(0)

    const frontAnimatedStyles = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 1], [0, 180])
        return {
            transform: [
                {
                    rotateY: withTiming(`${rotateValue}deg`, { duration: 300 })
                }
            ]
        }
    })

    const backAnimatedStyles = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 1], [180, 360])
        return {
            transform: [
                {
                    rotateY: withTiming(`${rotateValue}deg`, { duration: 300 })
                }
            ]
        }
    })

    return (
        <Box>
            <Animated.View style={[{
                backfaceVisibility: "hidden"
            }, frontAnimatedStyles]} >
                <Box variant={'card'} onLayout={(event) => {
                    const { height } = event.nativeEvent.layout
                    setCardHeight(height)
                }}  >
                    <Stack space={6} >
                        <HStack justifyContent={'space-between'} alignItems={'center'} >
                            <HStack space={4} alignItems={'center'} opacity={1} >
                                <Avatar bg={'amber.400'} >AS</Avatar>
                                <Stack >
                                    <Text bold fontSize={18} >{name}</Text>
                                    <Text bold fontSize={12} >{username}</Text>
                                    <Text fontSize={12} >{email}</Text>
                                </Stack>
                            </HStack>
                            <Badge rounded={'xl'} colorScheme={isActive ? 'success' : 'error'} >{isActive ? 'Active' : 'Inactive'}</Badge>
                        </HStack>
                        <HStack justifyContent={'space-evenly'} >
                            <Stack alignItems={'center'} space={2} >
                                <Avatar
                                    size={'sm'}
                                    bg={'blue.400'}
                                >C</Avatar>
                                <Text fontSize={10} >{company}</Text>
                            </Stack>
                            <Divider orientation='vertical' />
                            <Stack alignItems={'center'} space={2} >
                                <Avatar size={'sm'} bg={'violet.400'} >R</Avatar>
                                <Text fontSize={10} >{role}</Text>
                            </Stack>
                            <Divider orientation='vertical' />
                            <VStack justifyContent={'center'} >
                                <IconButton
                                    icon={<Icon as={Entypo} name={'dots-three-horizontal'} />}
                                    onPress={() => {
                                        rotate.value = 1
                                        setIsFlipped(true)
                                    }}
                                />
                            </VStack>
                        </HStack>
                    </Stack>
                </Box>
            </Animated.View>

            <Animated.View style={[{
                position: 'absolute',
                width: '100%',
                backfaceVisibility: "hidden",
                display: isFlipped ? 'flex' : 'none'
            }, backAnimatedStyles]} >
                <Box variant={'card'} style={{
                    height: cardHeight,
                    justifyContent: 'space-between'
                }} >
                    <HStack
                        justifyContent={'space-evenly'}
                    >
                        <Stack space={1} alignItems={'center'} >
                            <IconButton
                                colorScheme={'info'}
                                icon={<Icon as={Entypo} name={'edit'} />}
                            />
                            <Text>Edit</Text>
                        </Stack>
                        <Stack space={1} alignItems={'center'} >
                            <IconButton
                                colorScheme={'error'}
                                icon={<Icon as={AntDesign} name={'delete'} />}
                            />
                            <Text>Delete</Text>
                        </Stack>
                        <Stack space={1} alignItems={'center'} >
                            <IconButton
                                icon={<Icon as={AntDesign} name={'check'} />}
                            />
                            <Text>Assign site</Text>
                        </Stack>
                    </HStack>

                    <HStack justifyContent={'space-evenly'} >
                        <HStack space={4} alignItems={'center'} >
                            <Text>Active</Text>
                            <Switch
                                value={isActive}
                                onValueChange={(value) => setActive(value)}
                            />
                        </HStack>

                        <HStack justifyContent={'flex-end'} >
                            <IconButton
                                icon={<Icon as={Entypo} name={'dots-three-horizontal'} />}
                                size={'lg'}
                                onPress={() => {
                                    rotate.value = 0
                                    setTimeout(() => setIsFlipped(false), 600)
                                }}
                            />
                        </HStack>
                    </HStack>
                </Box>
            </Animated.View>

        </Box>
    )
}

export default UserCard