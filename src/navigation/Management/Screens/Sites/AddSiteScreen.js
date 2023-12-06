import React from 'react'

// Native Base
import { Box, Button, Card, FormControl, Heading, HStack, Input, Select, Stack } from 'native-base'

// Component
import BackHeader from '../../../../components/BackHeader'

const AddSiteScreen = () => {
    return (
        <Box variant={'container'} safeAreaTop >
            <BackHeader>Site</BackHeader>
            <Stack padding={4} space={4} >
                <Box variant={'card'} >
                    <Stack space={4} >
                        <Heading size={'md'} >Add Site</Heading>
                        <Stack space={2} >
                            <FormControl>
                                <FormControl.Label>Company {"(Region)"}</FormControl.Label>
                                <Select variant='underlined' >
                                    <Select.Item></Select.Item>
                                </Select>
                            </FormControl>
                            <HStack space={2} >
                                <FormControl w={'75%'} >
                                    <FormControl.Label>Site Name</FormControl.Label>
                                    <Input variant={'underlined'} />
                                </FormControl>
                                <FormControl w={'23%'} >
                                    <FormControl.Label>Code</FormControl.Label>
                                    <Input variant={'underlined'} />
                                </FormControl>
                            </HStack>
                            <FormControl>
                                <FormControl.Label>Time zone</FormControl.Label>
                                <Select variant={'underlined'} >
                                    <Select.Item></Select.Item>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Address</FormControl.Label>
                                <Input variant={'underlined'} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Email {"(Optional)"}</FormControl.Label>
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

export default AddSiteScreen