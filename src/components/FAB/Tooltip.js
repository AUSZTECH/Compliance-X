import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'

// Native Base
import { Box, Pressable, Text } from 'native-base'

const Tooltip = ({ children, label }) => {

    const [isOpen, setOpen] = useState(false)
    const [position, setPosition] = useState(-200)

    const { width } = useWindowDimensions()

    return (

        <Pressable onLongPress={(event) => {
            const { pageX } = event.nativeEvent
            if (pageX > width / 2) {
                setPosition('-200%')
            } else {
                setPosition('100%')
            }
            setOpen(true)
        }} onPressOut={() => setOpen(false)}>
            {isOpen && (
                <Box
                    bgColor={'coolGray.800'}
                    position={'absolute'}
                    left={position}
                    top={'40%'}
                    w={100}
                    px={2}
                    py={1}
                    borderRadius={5}
                    alignItems={'center'}
                >
                    <Text color={'white'} fontSize={12} >{label}</Text>
                </Box>
            )}
            {children}
        </Pressable>
    )
}

export default Tooltip