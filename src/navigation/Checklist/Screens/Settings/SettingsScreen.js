import React, { useState } from 'react'

// Native Base
import { Box, Center, Heading, HStack, Radio, Stack, Text } from 'native-base'
import Header from '../../../../components/Header'
import { connect } from 'react-redux'
import { setTemplateTheme, setToolbarPosition } from '../../../../redux/actions/commonActions'

const SettingsScreen = ({ templateTheme, toolbarPosition, setTemplateTheme, setToolbarPosition }) => {

    // const [templateTheme, setTemplateTheme] = useState('interactive')
    // const [toolBarPosition, setToolBarPosition] = useState('top')
    // console.log(toolbarPosition)

    return (
        <Box variant={'container'} safeAreaTop >
            <Header>Settings</Header>

            <Stack p={4} >
                <Box variant={'card'} >
                    <Stack space={4} >
                        <Heading size={'sm'} color={'black'} >Template</Heading>
                        <Stack space={2} >
                            <HStack justifyContent={'space-between'} >
                                <Text>Template theme</Text>
                                <Box w={120} >
                                    <Radio.Group w={'190'} value={templateTheme} onChange={(value) => setTemplateTheme(value)} >
                                        <Radio size={'sm'} my={1} value={'interactive'} >Interactive</Radio>
                                        <Radio size={'sm'} my={1} value={'toolbar'} >Toolbar</Radio>
                                    </Radio.Group>
                                </Box>
                            </HStack>
                            {templateTheme === 'toolbar' && (
                                <HStack justifyContent={'space-between'} >
                                    <Text>Toolbar position</Text>
                                    <Box w={120} >
                                        <Radio.Group value={toolbarPosition} onChange={(value) => setToolbarPosition(value)} >
                                            <Radio size={'sm'} my={1} value={'top'} >Top</Radio>
                                            <Radio size={'sm'} my={1} value={'left'} >Left</Radio>
                                            <Radio size={'sm'} my={1} value={'right'} >Right</Radio>
                                        </Radio.Group>
                                    </Box>
                                </HStack>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        templateTheme: state.common.templateTheme,
        toolbarPosition: state.common.toolbarPosition
    };
};

const mapDispatchToProps = (dispatch) => {
    // console.log(dispatch)
    return {
        setTemplateTheme: (theme) => dispatch(setTemplateTheme(theme)),
        setToolbarPosition: (position) => dispatch(setToolbarPosition(position))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)