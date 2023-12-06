import React, { useState } from 'react'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { activeTemplateNavigate } from '../../../assets/common/Nav'

// Native Base
import { Button, HStack, Icon, IconButton, Menu, Modal, Spinner, Stack, Text, useToast } from 'native-base'

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// Redux
import { connect } from 'react-redux'
import { addQuestion, copySection, moveQuestions, moveSections } from '../../../redux/actions/templateActions'

// Draggable Flatlist
import { NestableDraggableFlatList } from 'react-native-draggable-flatlist'

// Components
import QuestionCard from './QuestionCard'

const TemplateSection = (props) => {

    const {
        section,
        sectionIndex,
        copyID,
        setCopyID,
        onDelete,
        onEdit,
        activeTemplate,
        copySection,
        moveSections,
        addQuestion,
        moveQuestions
    } = props

    const toast = useToast()
    const navigation = useNavigation()

    /*
    * States
    */

    // Sections
    const [open, setOpen] = useState(true)
    const [copyLoading, setCopyLoading] = useState(false)

    // Questions
    const [addQuestionLoading, setAddQuestionLoading] = useState(false)

    const handleAddQuestion = async () => {
        setAddQuestionLoading(true)
        try {
            const res = await addQuestion({
                templateID: activeTemplate.id,
                sectionID: section.id,
                questionType: "YES/NO"
            })
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!'
            })
        } finally {
            setAddQuestionLoading(false)
        }
    }

    const handleMoveQuestion = async (questions) => {
        try {
            moveQuestions({ sectionID: section.id, questions })
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!' + e
            })
        }
    }

    const handleCopySection = async () => {
        setCopyLoading(true)
        try {
            const res = await copySection({ sectionID: copyID, index: sectionIndex })
            // const res2 = await moveSections(activeTemplate.sections)
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!' + e
            })
        } finally {
            setCopyLoading(false)
            setCopyID(null)

        }
    }

    return (
        <Stack space={4} key={sectionIndex} >
            <HStack justifyContent={'space-between'} alignItems={'center'} mx={4} mt={4} >
                <HStack space={2} alignItems={'center'} >
                    <IconButton variant={'subtle'} size={'sm'} colorScheme={'info'} icon={<Icon as={AntDesign} name={open ? 'down' : 'right'} />} onPress={() => setOpen(prev => !prev)} />
                    <Text fontSize={16} color={'primary.800'} >{section.name.length > 25 ? section.name.substring(0, 25) + '...' : section.name}</Text>
                </HStack>
                <HStack justifyContent={'space-evenly'} alignItems={'center'} space={2} >
                    {addQuestionLoading && (<Spinner color={'success.600'} />)}
                    {copyLoading && (<Spinner color={'primary.600'} />)}
                    {sectionIndex !== activeTemplate.sections.length - 1 && (
                        <IconButton
                            variant={'subtle'}
                            size={'sm'}
                            colorScheme={'success'}
                            icon={<Icon as={AntDesign} name={'plus'} />}
                            isLoading={addQuestionLoading}
                            onPress={handleAddQuestion}
                        />
                    )}
                    <Menu placement='left top' trigger={triggerProps => {
                        return <IconButton
                            variant={'subtle'}
                            size={'sm'}
                            colorScheme={'info'}
                            icon={<Icon as={MaterialCommunityIcons} name={'dots-vertical'} />}
                            {...triggerProps}
                        />;
                    }}>
                        {Boolean(copyID) && (
                            <>
                                <Menu.Item onPress={handleCopySection} >Paste</Menu.Item>
                            </>
                        )}
                        <Menu.Item onPress={() => setCopyID(section.id)} >Copy</Menu.Item>
                        <Menu.Item onPress={onEdit} >Edit</Menu.Item>
                        <Menu.Item onPress={onDelete} >Delete</Menu.Item>
                        <Menu.Item onPress={() => navigation.navigate("Manage Section Screen")} >Reorder Sections</Menu.Item>
                    </Menu>
                </HStack>
            </HStack>
            <Stack space={2} >
                {open && (
                    <NestableDraggableFlatList
                        data={section.questions}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, getIndex, drag, isActive }) => (
                            <QuestionCard
                                sectionID={section.id}
                                sectionIndex={sectionIndex}
                                question={item}
                                questionIndex={getIndex()}
                                drag={drag}
                                isActive={isActive}
                            />
                        )}
                        onDragEnd={({ data }) => handleMoveQuestion(data)}
                    />
                )}
            </Stack>
        </Stack >
    )
}

const mapStateToProps = state => {
    return {
        activeTemplate: state.templates.activeTemplate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        copySection: (data) => dispatch(copySection(data)),
        moveSections: (data) => dispatch(moveSections(data)),
        addQuestion: (data) => dispatch(addQuestion(data)),
        moveQuestions: (data) => dispatch(moveQuestions(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateSection)