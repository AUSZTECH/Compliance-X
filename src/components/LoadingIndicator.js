import { Box, Spinner } from 'native-base'
import React from 'react'

const LoadingIndicator = ({ loading, children }) => {
    return loading ? (
        <Box
            flex={1}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Spinner />
        </Box>
    ) : (
        <>
            {children}
        </>
    )

}

export default LoadingIndicator