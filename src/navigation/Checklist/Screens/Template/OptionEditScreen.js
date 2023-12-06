import React, { useState } from 'react'
import { Switch } from 'react-native'

// Native Base
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Divider,
    Heading,
    Hidden,
    HStack,
    Icon,
    IconButton,
    Input,
    ScrollView,
    Spinner,
    Stack,
    Text,
    useTheme,
    useToast
} from 'native-base'


// Redux
import { connect } from 'react-redux'
import { updateQuestion } from '../../../../redux/actions/templateActions'

// Components
import BackHeader from '../../../../components/BackHeader'
import QuestionType from '../../../../components/Checklist/Template/QuestionType'
import { NestableScrollContainer } from 'react-native-draggable-flatlist'
import Temperature from '../../../../components/Checklist/Template/QuestionDetail/QuestionTypes/Temperature'

const OptionEditScreen = (props) => {

    const {
        route,
        activeTemplate,
        updateQuestion
    } = props

    const { sectionIndex, question, header } = route.params

    const toast = useToast()
    const theme = useTheme()

    /*
    * Initialization
    */

    const isSubQuestion = question.parentID ? true : false
    const questionIndex = isSubQuestion
        ? activeTemplate.sections[sectionIndex].questions.findIndex(item => item.id === question.parentID)
        : activeTemplate.sections[sectionIndex].questions.findIndex(item => item.id === question.id)

    const subquestionIndex = isSubQuestion
        && activeTemplate.sections[sectionIndex].questions[questionIndex].subquestions.findIndex(item => item.id === question.id)

    /*
    * States
    */

    const [loading, setLoading] = useState(false)
    const [isMandatory, setMandatory] = useState(Boolean(question.isMandatory))
    const [notApplicable, setNotApplicable] = useState(Boolean(question.notApplicable))

    /*
    * Functions
    */

    const updateIsMandatory = async (value) => {
        setLoading(true)
        try {
            const res = await updateQuestion({ question, isMandatory: value })
            setMandatory(value)
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!' + e
            })
        } finally {
            setLoading(false)
        }
    }

    const updateNotApplicable = async (value) => {
        setLoading(true)
        try {
            const res = await updateQuestion({ question, mayNotApplicable: value })
            setNotApplicable(value)
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!' + e
            })
        } finally {
            setLoading(false)
        }
    }

    const getQuestionType = () => {
        return isSubQuestion ?
            activeTemplate.sections[sectionIndex].questions[questionIndex].subquestions[subquestionIndex].questionType
            : activeTemplate.sections[sectionIndex].questions[questionIndex].questionType
    }

    return (
        <Box variant={'container'} safeAreaTop >
            <BackHeader loading={loading} >{header}</BackHeader>
            <Box mx={4} my={2} >
                <Text bold >{question.sortOrder}. {question.questionTxt}</Text>
            </Box>
            <NestableScrollContainer>
                <Stack space={4} px={4} >
                    <Stack space={2} >
                        <HStack justifyContent={'space-between'} alignItems={'center'} >
                            <Text fontSize={14} >Is Mandatory</Text>
                            <Switch
                                thumbColor={theme.colors.primary[600]}
                                trackColor={{
                                    false: theme.colors.primary[50],
                                    true: theme.colors.primary[300]
                                }}
                                value={isMandatory}
                                onValueChange={(value) => updateIsMandatory(value)}
                            />
                        </HStack>
                        <HStack justifyContent={'space-between'} alignItems={'center'} >
                            <Text fontSize={14} >Not Applicable</Text>
                            <Switch
                                thumbColor={theme.colors.primary[600]}
                                trackColor={{
                                    false: theme.colors.primary[50],
                                    true: theme.colors.primary[300]
                                }}
                                value={notApplicable}
                                onValueChange={(value) => updateNotApplicable(value)}
                            />
                        </HStack>
                    </Stack>



                    {getQuestionType() === 'TEMPERATURE' && (
                        <>
                            <Divider />
                            <Temperature
                                question={isSubQuestion ?
                                    activeTemplate.sections[sectionIndex].questions[questionIndex].subquestions[subquestionIndex]
                                    : activeTemplate.sections[sectionIndex].questions[questionIndex]}
                            />
                        </>
                    )}

                    <Divider />

                    <QuestionType
                        sectionIndex={sectionIndex}
                        section={activeTemplate.sections[sectionIndex]}
                        question={isSubQuestion ?
                            activeTemplate.sections[sectionIndex].questions[questionIndex].subquestions[subquestionIndex]
                            : activeTemplate.sections[sectionIndex].questions[questionIndex]}
                    />

                    {/* <HStack justifyContent={'space-between'} alignItems={'center'} >
                        <Heading size={'md'} >Responses</Heading>
                        <IconButton size={'sm'} variant={'subtle'} colorScheme={'success'} icon={<Icon as={AntDesign} name={'plus'} />} />
                    </HStack>
                    <Stack space={4} >
                        <Box variant={'card'} >
                            <Stack space={2} >
                                <HStack space={2} >
                                    <Input placeholder={'Response Text'} w={'70%'} />
                                    <Input placeholder={'Score'} w={'25%'} />
                                </HStack>
                                <Checkbox>
                                    Is Compliant
                                </Checkbox>
                            </Stack>
                        </Box>
                        <Box variant={'card'} >
                            <Stack space={2} >
                                <HStack space={2} >
                                    <Input placeholder={'Response Text'} w={'70%'} />
                                    <Input placeholder={'Score'} w={'25%'} />
                                </HStack>
                                <Checkbox>
                                    Is Compliant
                                </Checkbox>
                            </Stack>
                        </Box>
                    </Stack>
                    <Divider />
                    <Heading size={'md'} >Choose Condition for sub-question</Heading>
                    <Stack space={4} >
                        <Checkbox >Yes</Checkbox>
                        <Checkbox >No</Checkbox>
                        <Button variant={'subtle'} >Add Sub-Question</Button>
                        <Box variant={'card'} >
                            <HStack justifyContent={'space-between'} alignItems={'center'} >
                                <Heading size={'sm'} >Yes, No</Heading>
                                <IconButton size={'sm'} variant={'subtle'} colorScheme={'success'} icon={<Icon as={AntDesign} name={'plus'} />} />
                            </HStack>
                        </Box>
                    </Stack> */}
                </Stack>
            </NestableScrollContainer>
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        activeTemplate: state.templates.activeTemplate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateQuestion: (data) => dispatch(updateQuestion(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionEditScreen)