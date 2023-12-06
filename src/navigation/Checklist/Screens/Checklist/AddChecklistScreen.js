import React from 'react'

//navigation
import { useNavigation } from '@react-navigation/native'

//Native base 
import { Box,Text,Stack,HStack, } from 'native-base'
import BackHeader from '../../../../components/BackHeader'

const AddChecklistScreen = () => {
  return (
    <Box variant={'conatiner'} safeAreaTop  >
      <BackHeader>Create Checklist</BackHeader>
    </Box>
  )
}

export default AddChecklistScreen
