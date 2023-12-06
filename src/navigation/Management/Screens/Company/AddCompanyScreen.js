import { Box, Button, Card, FormControl, Heading, Input, Stack } from 'native-base'
import React from 'react'
import BackHeader from '../../../../components/BackHeader'

const AddCompanyScreen = () => {
    return (
        <Box variant={'container'} safeAreaTop >
            <BackHeader >Company/Sub-Group</BackHeader>
            <Stack padding={3} space={4} >
                <Box variant={'card'} >
                    <Stack space={4} >
                        <Heading size={'md'} >Create Company</Heading>
                        <Stack space={2} >
                            <FormControl>
                                <FormControl.Label>Company Name</FormControl.Label>
                                <Input variant={'underlined'} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Registered Address</FormControl.Label>
                                <Input variant={'underlined'} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Company Email</FormControl.Label>
                                <Input variant={'underlined'} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Country Level</FormControl.Label>
                                <Input variant={'underlined'} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Type {"(Main or Sub)"}</FormControl.Label>
                                <Input variant={'underlined'} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Select Company</FormControl.Label>
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

export default AddCompanyScreen