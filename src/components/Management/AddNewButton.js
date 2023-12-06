import React from 'react'

// Native Base
import { Button, HStack, Icon } from 'native-base'

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign'

const AddNewButton = ({ children, onPress }) => {
    return (
        <HStack justifyContent={'flex-end'} >
            <Button onPress={onPress} variant={'subtle'} leftIcon={<Icon as={AntDesign} name={'plus'} />} >{children}</Button>
        </HStack>
    )
}

export default AddNewButton