import React, { useState } from 'react'
import { Switch } from 'react-native'

// Native Base
import {
    Box,
    HStack,
    Icon,
    IconButton,
    Input,
    Spinner,
    Stack,
    Text,
    useTheme,
    useToast
} from 'native-base'

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign'

// Redux
import { connect } from 'react-redux'
import { deleteOption, updateOption } from '../../../../redux/actions/templateActions'

const OptionCard = (props) => {

    const {
        sectionIndex,
        question,
        optionIndex,
        option,
        key,
        updateOption,
        deleteOption
    } = props

    const theme = useTheme()
    const toast = useToast()

    /*
    * State
    */

    const [deleteOptionLoading, setDeleteOptionLoading] = useState(false)

    /*
    * Functions
    */

    const handleUpdateText = async (optionTxt) => {
        try {
            const res = await updateOption({
                sectionIndex,
                question,
                optionIndex,
                optionID: option.id,
                optionTxt
            })
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!'
            })
        } finally {

        }
    }

    const handleUpdateScore = async (score) => {
        try {
            const res = await updateOption({
                sectionIndex,
                question,
                optionIndex,
                optionID: option.id,
                score
            })
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!'
            })
        } finally {

        }
    }

    const handleCompliant = async (isCompliant) => {
        try {
            const res = await updateOption({
                sectionIndex,
                question,
                optionIndex,
                optionID: option.id,
                isCompliant
            })
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!'
            })
        } finally {

        }
    }

    const handleDeleteOption = async () => {
        setDeleteOptionLoading(true)
        try {
            const res = await deleteOption({ sectionIndex, question, optionID: option.id })
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!' + e
            })
        } finally {
            setDeleteOptionLoading(false)
        }
    }

    return (
        <Box variant={'card'} key={key} >
            <Stack space={2} >
                <HStack space={2} >
                    <Input
                        w={'77.5%'}
                        defaultValue={option.optionTxt}
                        onEndEditing={(e) => handleUpdateText(e.nativeEvent.text)}
                    />
                    <Input
                        w={'20%'}
                        placeholder={'Score'}
                        keyboardType={'numeric'}
                        defaultValue={option.score?.toString()}
                        onEndEditing={(e) => handleUpdateScore(e.nativeEvent.text)}
                    />

                </HStack>
                <HStack justifyContent={'space-between'} alignItems={'center'} >
                    <HStack space={4} alignItems={'center'} >
                        <Switch
                            value={option.isCompliant}
                            thumbColor={theme.colors.primary[600]}
                            trackColor={{
                                false: theme.colors.primary[100],
                                true: theme.colors.primary[300]
                            }}
                            onValueChange={(value) => handleCompliant(value)}
                        />
                        <Text>Compliant</Text>
                    </HStack>
                    <HStack space={2} >
                        {deleteOptionLoading && <Spinner />}
                        <IconButton
                            colorScheme={'error'}
                            variant={'subtle'}
                            size={'sm'}
                            icon={<Icon as={AntDesign} name={'delete'} />}
                            onPress={handleDeleteOption}
                        />
                    </HStack>
                </HStack>
            </Stack>
        </Box>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateOption: (data) => dispatch(updateOption(data)),
        deleteOption: (data) => dispatch(deleteOption(data))
    }
}

export default connect(null, mapDispatchToProps)(OptionCard)