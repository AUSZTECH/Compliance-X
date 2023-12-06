import React from 'react'

// Native Base
import {
    Box,
    Button,
    FormControl,
    Heading,
    HStack,
    Input,
    Select,
    Stack
} from 'native-base'

// Components
import BackHeader from '../../../../components/BackHeader'



const AddUserScreen = () => {
    return (
        <Box variant={'container'} safeAreaTop  >
            <BackHeader>User</BackHeader>
            <Stack p={4} space={4} >
                <Box variant={'card'}  >
                    <Stack space={4} >
                        <Heading size={'md'} >Add User</Heading>
                        <Stack space={2} >
                            <FormControl >
                                <FormControl.Label>Login ID {"(Email)"}</FormControl.Label>
                                <Input variant={'underlined'} />
                            </FormControl>
                            <HStack space={2} >
                                <FormControl w={'48%'} >
                                    <FormControl.Label>First Name</FormControl.Label>
                                    <Input variant={'underlined'} />
                                </FormControl>
                                <FormControl w={'48%'} >
                                    <FormControl.Label>Last Name</FormControl.Label>
                                    <Input variant={'underlined'} />
                                </FormControl>
                            </HStack>
                            <FormControl >
                                <FormControl.Label>Role</FormControl.Label>
                                <Select variant='underlined' >
                                    <Select.Item></Select.Item>
                                </Select>
                            </FormControl>
                            <FormControl >
                                <FormControl.Label>Contact</FormControl.Label>
                                <Input variant={'underlined'} />
                            </FormControl>
                            <Button>Save</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default AddUserScreen