import React from 'react'

// Native Base
import { Box, Button, Card, FormControl, Heading, HStack, Input, ScrollView, Stack, Switch, Text } from 'native-base'
import BackHeader from '../../../../components/BackHeader'

const AddRoleScreen = () => {
    return (
        <ScrollView>
            <Box variant={'container'} safeAreaTop >
                    <BackHeader>Role</BackHeader>
                <Stack p={4}  space={4} >
                    <Box variant={'card'}>
                        <Stack space={4} >
                            <Heading size={'md'} >Add Role</Heading>
                            <Stack space={2} >
                                <FormControl>
                                    <FormControl.Label>Role Name</FormControl.Label>
                                    <Input variant={'underlined'} />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Code</FormControl.Label>
                                    <Input variant={'underlined'} />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Role Type</FormControl.Label>
                                    <Input variant={'underlined'} />
                                </FormControl>
                            </Stack>
                            <Button>Next</Button>
                        </Stack>
                    </Box>
                    <HStack justifyContent={'space-between'} >
                        <Heading>Admin</Heading>
                        <Switch isChecked />
                    </HStack>
                    <Box variant={'card'} >
                        <Stack space={2} >
                            <HStack justifyContent={'space-between'} >
                                <Text>Allow to create user</Text>
                                <Switch isChecked />
                            </HStack>
                            <HStack justifyContent={'space-between'} >
                                <Text>Allow to create role</Text>
                                <Switch isChecked />
                            </HStack>
                            <HStack justifyContent={'space-between'} >
                                <Text>Allow to create site</Text>
                                <Switch isChecked />
                            </HStack>
                        </Stack>
                    </Box>
                    <HStack justifyContent={'space-between'} >
                        <Heading>Site Manager</Heading>
                        <Switch isChecked />
                    </HStack>
                    <Box variant={'card'} >
                        <Stack space={2} >
                            <HStack justifyContent={'space-between'} >
                                <Text>Allow to create user</Text>
                                <Switch isChecked />
                            </HStack>
                            <HStack justifyContent={'space-between'} >
                                <Text>Allow to create role</Text>
                                <Switch />
                            </HStack>
                            <HStack justifyContent={'space-between'} >
                                <Text>Allow to create site</Text>
                                <Switch />
                            </HStack>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </ScrollView>
    )
}

export default AddRoleScreen