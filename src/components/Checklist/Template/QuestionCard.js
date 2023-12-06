import React, { useState } from 'react'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Native Base
import {
    Box,
    HStack,
    Icon,
    IconButton,
    Input,
    Menu,
    Pressable,
    Spinner,
    Stack,
    Text,
    TextArea,
    useToast
} from 'native-base'

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'

// Redux
import { connect } from 'react-redux'
import { deleteQuestion, updateQuestion } from '../../../redux/actions/templateActions'

// Draggable Flatlist
import { OpacityDecorator, ScaleDecorator } from 'react-native-draggable-flatlist'

const QuestionCard = (props) => {

    const {
        sectionID,
        sectionIndex,
        question,
        questionIndex,
        drag,
        updateQuestion,
        deleteQuestion,
    } = props

    const navigation = useNavigation()
    const toast = useToast()

    const questionTypes = [
        {
            id: 1,
            name: 'Signature',
            value: 'SIGNATURE',
            color: 'red',
            icon: FontAwesome5,
            iconName: 'signature',
        },
        {
            id: 2,
            name: 'Photo',
            value: 'PHOTO',
            color: 'orange',
            icon: MaterialIcons,
            iconName: 'insert-photo',
        },
        {
            id: 3,
            name: 'Temperature',
            value: 'TEMPERATURE',
            color: 'amber',
            icon: FontAwesome5,
            iconName: 'temperature-high',
        },
        {
            id: 4,
            name: 'Multiselect',
            value: 'MULTISELECT',
            color: 'lime',
            icon: MaterialCommunityIcons,
            iconName: 'checkbox-multiple-marked',
        },
        {
            id: 5,
            name: 'Time',
            value: 'TIME',
            color: 'teal',
            icon: MaterialCommunityIcons,
            iconName: 'clock-time-one',
        },
        {
            id: 6,
            name: 'Numeric',
            value: 'NUMERIC',
            color: 'cyan',
            icon: Octicons,
            iconName: 'number',
        },
        {
            id: 7,
            name: 'Date',
            value: 'DATE',
            color: 'darkBlue',
            icon: MaterialCommunityIcons,
            iconName: 'calendar-multiselect',
        },
        {
            id: 8,
            name: 'Single Line Text',
            value: 'SINGLELINETEXT',
            color: 'indigo',
            icon: Ionicons,
            iconName: 'text',
        },
        {
            id: 9,
            name: 'Yes/No',
            value: 'YES/NO',
            color: 'violet',
            icon: AntDesign,
            iconName: 'check',
        },
        {
            id: 10,
            name: 'Multi Line Text',
            value: 'MULTILINETEXT',
            color: 'fuchsia',
            icon: MaterialCommunityIcons,
            iconName: 'text',
        },
    ]

    /*
    * States
    */

    // const [updateQuestionLoading, setUpdateQuestionLoading] = useState(false)
    const [deleteQuestionLoading, setDeleteQuestionLoading] = useState(false)

    // Question
    const [activeQuestionType, setActiveQuestionType] = useState(questionTypes.findIndex((item) => item.value === question.questionType))

    // Question Type
    const [activeType, setActiveType] = useState(8)
    const [typeButtonPressed, setTypeButtonPressed] = useState(false)


    /*
    *  Functions
    */

    const handleDelete = async (questionID) => {
        setDeleteQuestionLoading(true)
        try {
            const res = await deleteQuestion({ sectionID, question })
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!' + e
            })
        } finally {
            setDeleteQuestionLoading(false)
        }
    }

    const updateQuestionText = async (questionTxt) => {
        try {
            const res = await updateQuestion({ sectionIndex, question, questionTxt })
        } catch (e) {
            toast.show({
                title: e,
                description: 'An Error Occured, Try Again Later!'
            })
        }
    }

    const updateQuestionScore = async (score) => {
        try {
            const res = await updateQuestion({ sectionIndex, question, score })
        } catch (e) {
            toast.show({
                title: e,
                description: 'An Error Occured, Try Again Later!'
            })
        }
    }

    const updateQuestionType = async (questionType) => {
        try {
            const res = await updateQuestion({ sectionIndex, question, questionType })
        } catch (e) {
            toast.show({
                title: e,
                description: 'An Error Occured, Try Again Later!'
            })
        } finally {
            setActiveQuestionType(questionTypes.findIndex((item) => item.value === questionType))
        }
    }

    /* 
    * Data
    */

    return (
        <OpacityDecorator>
            <ScaleDecorator>
                <Box variant={'card'} p={2} mx={4} my={2} >
                    <HStack>
                        <Stack space={2} >
                            <HStack space={4} alignItems={'center'} >
                                <Text>{questionIndex + 1}.</Text>
                                <Input
                                    variant={'underlined'}
                                    w={['80%', '90%', '90%']}
                                    multiline
                                    placeholder='Question'
                                    textAlignVertical='top'
                                    fontSize={16}
                                    defaultValue={question.questionTxt}
                                    onEndEditing={(e) => updateQuestionText(e.nativeEvent.text)}
                                />
                            </HStack>
                            <HStack justifyContent={'space-between'} alignItems={'center'} >
                                <HStack alignItems={'center'} ml={6} space={4} >
                                    <Menu
                                        trigger={triggerProps => {
                                            return (
                                                <Pressable
                                                    w={"120"}
                                                    {...triggerProps}
                                                    onPressIn={() => setTypeButtonPressed(true)}
                                                    onPressOut={() => setTypeButtonPressed(false)}
                                                    opacity={typeButtonPressed ? 0.5 : 1}
                                                >
                                                    <Box
                                                        backgroundColor={`${questionTypes[activeQuestionType].color}.100`}
                                                        p={2}
                                                        borderRadius={10}
                                                    >
                                                        <HStack alignItems={'center'} justifyContent={'center'} space={2} >
                                                            <Icon
                                                                as={questionTypes[activeQuestionType].icon}
                                                                name={questionTypes[activeQuestionType].iconName}
                                                                color={`${questionTypes[activeQuestionType].color}.600`}
                                                            />
                                                            <Text
                                                                fontSize={12}
                                                                color={`${questionTypes[activeQuestionType].color}.600`}
                                                            >{questionTypes[activeQuestionType].name.length >= 12 ? questionTypes[activeQuestionType].name.substring(0, 12) + '...' : questionTypes[activeQuestionType].name}</Text>
                                                        </HStack>
                                                    </Box>
                                                </Pressable>
                                            )
                                        }}
                                        bg={'transparent'}
                                        _backdrop={{
                                            backgroundColor: '#000',
                                            opacity: 0.55
                                        }}
                                        shadow={'none'}
                                        shouldOverlapWithTrigger
                                    >
                                        {questionTypes.map((item, index) => (
                                            <Menu.Item key={index} onPress={() => updateQuestionType(item.value)} >
                                                <HStack alignItems={'center'} space={2} >
                                                    <Box
                                                        backgroundColor={`${item.color}.100`}
                                                        p={2}
                                                        borderRadius={10}
                                                    >
                                                        <Icon as={item.icon} name={item.iconName} color={`${item.color}.600`} />
                                                    </Box>
                                                    <Box
                                                        backgroundColor={`${item.color}.100`}
                                                        px={4}
                                                        py={1.5}
                                                        borderRadius={10}
                                                    >
                                                        <Text color={`${item.color}.600`} bold >{item.name}</Text>
                                                    </Box>
                                                </HStack>
                                            </Menu.Item>
                                        ))}
                                    </Menu>
                                    <Input
                                        w={"16"}
                                        placeholder={'Score'}
                                        variant={'underlined'}
                                        fontSize={14}
                                        keyboardType={'numeric'}
                                        isDisabled={Boolean(question.questionType === 'YES/NO' || question.questionType === 'MULTISELECT')}
                                        defaultValue={question?.score?.toString()}
                                        onEndEditing={(e) => updateQuestionScore(e.nativeEvent.text)}
                                    />
                                </HStack>
                                <HStack space={2} >
                                    {deleteQuestionLoading && <Spinner color={'error.600'} />}
                                    <IconButton
                                        size={'sm'}
                                        colorScheme={'error'}
                                        icon={<Icon as={AntDesign} name={'delete'} />}
                                        onPress={() => handleDelete()}
                                    />

                                </HStack>
                            </HStack>
                        </Stack>
                        <Stack justifyContent={'space-evenly'} alignItems={'center'} >
                            <IconButton
                                size={'md'}
                                icon={<Icon as={MaterialIcons} name={'drag-indicator'} />}
                                onLongPress={drag}
                            />
                            <IconButton
                                size={'sm'}
                                icon={<Icon as={MaterialCommunityIcons} name={'dots-vertical'} />}
                                onPress={() => {
                                    if (!question.parentID) {
                                        navigation.push("Option Edit Screen", { sectionIndex, question, header: 'Question Configuration' })
                                    } else {
                                        navigation.push("Option Edit Screen", { sectionIndex, question, header: 'Sub-Question Configuration' })
                                    }
                                }}
                            />
                        </Stack>
                    </HStack>
                </Box >
            </ScaleDecorator>
        </OpacityDecorator>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateQuestion: (data) => dispatch(updateQuestion(data)),
        deleteQuestion: (data) => dispatch(deleteQuestion(data))
    }
}

export default connect(null, mapDispatchToProps)(QuestionCard)