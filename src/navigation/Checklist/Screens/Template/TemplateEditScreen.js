import React, { useCallback, useState } from 'react'

// Navigation
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { activeTemplateNavigate } from '../../../../assets/common/Nav'

// Native Base
import {
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    Icon,
    IconButton,
    Input,
    Modal,
    Stack,
    Text,
    TextArea,
    useToast
} from 'native-base'

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign'

// Redux
import { connect } from 'react-redux'
import {
    addQuestion,
    addSection,
    clearActiveTemplate,
    createTemplate,
    deleteSection,
    updateSection,
    updateTemplate
} from '../../../../redux/actions/templateActions'

// Draggable Flatlist
import { NestableScrollContainer } from 'react-native-draggable-flatlist'

// Components
import TemplateSection from '../../../../components/Checklist/Template/TemplateSection'


const TemplateEditScreen = (props) => {

    const {
        activeTemplate,
        createTemplate,
        updateTemplate,
        clearActiveTemplate,
        addSection,
        updateSection,
        deleteSection,
        addQuestion
    } = props

    const navigation = useNavigation()
    const toast = useToast()

    /*
    * States
    */

    // Template
    const [open, setOpen] = useState(activeTemplate?.name ? false : true)
    const [createLoading, setCreateLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)

    // Section
    const [addSectionModal, setAddSectionModal] = useState(false)
    const [addSectionLoading, setAddSectionLoading] = useState(false)
    const [copyID, setCopyID] = useState(null)
    const [editSectionID, setEditSectionID] = useState(null)
    const [editSectionLoading, setEditSectionLoading] = useState(false)
    const [deleteSectionID, setDeleteSectionID] = useState(null)
    const [deleteSectionLoading, setDeleteSectionLoading] = useState(false)

    // Question
    const [addQuestionLoading, setAddQuestionLoading] = useState(false)

    // General
    const [fields, setFields] = useState({
        template: '',
        section: ''
    })

    /*
    * Navigator 
    */

    useFocusEffect(
        useCallback(() => {
            return () => {
                activeTemplateNavigate(clearActiveTemplate, 'Option Edit Screen', 'Manage Section Screen')
            };
        }, [])
    );


    /*
    * Functions
    */

    const handleChange = (key, text) => {
        setFields(prev => ({
            ...prev,
            [key]: text
        }))
    }

    const handleCreateTemplate = async () => {
        setCreateLoading(true)
        try {
            const res = await createTemplate(fields.template)
            if (res) {
                setOpen(false)
            }
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!' + e
            })
        } finally {
            setCreateLoading(false)
        }
    }

    const handleUpdateTemplate = async (text) => {
        setUpdateLoading(true)
        try {
            const res = await updateTemplate(text)
        } catch (e) {
            console.log(e)
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!'
            })
        } finally {
            setUpdateLoading(false)
        }
    }

    const handleAddSection = async () => {
        setAddSectionLoading(true)
        try {
            const res = await addSection(fields.section)
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!' + e
            })
        } finally {
            handleChange('section', '')
            setAddSectionLoading(false)
            setAddSectionModal(false)
        }
    }

    const handleEditSection = async () => {
        setEditSectionLoading(true)
        try {
            const res = await updateSection({ sectionName: fields.section, sectionID: editSectionID })
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!' + e
            })
        } finally {
            handleChange('section', '')
            setEditSectionLoading(false)
            setEditSectionID(null)
        }
    }

    const handleDeleteSection = async () => {
        setDeleteSectionLoading(true)
        try {
            const res = await deleteSection(deleteSectionID)
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!' + e
            })
        } finally {
            setDeleteSectionLoading(false)
            setDeleteSectionID(null)
        }
    }

    const handleAddQuestion = async () => {
        setAddQuestionLoading(true)
        const sectionID = activeTemplate.sections[activeTemplate.sections.length - 1].id
        const questionType = 'YES/NO'
        try {
            const res = await addQuestion({ templateID: activeTemplate.id, sectionID, questionType })
        } catch (e) {
            toast.show({
                title: 'Error',
                description: 'An Error Occured, Try Again Later!'
            })
        } finally {
            setAddQuestionLoading(false)
        }
    }

    return (
        <Box variant={'container'} safeAreaTop >

            {/* Header */}
            <HStack px={5} p={2} justifyContent={'space-between'} >
                <IconButton
                    icon={<Icon as={AntDesign} name={'left'} />}
                    onPress={() => navigation.goBack()}
                />
                <HStack>
                    <Button
                        shadow={'none'}
                        borderRightRadius={0}
                        variant={'subtle'}
                        size={'sm'}
                        _text={{
                            fontSize: 14
                        }}
                        onPress={() => navigation.goBack()}
                    >Publish</Button>
                    <IconButton borderLeftRadius={0} variant={'subtle'} icon={<Icon as={AntDesign} name={'down'} />} />
                </HStack>
            </HStack>

            {/* Body */}
            <Stack space={6} >
                <Input
                    variant={'unstyled'}
                    fontSize={22}
                    fontWeight={'500'}
                    defaultValue={activeTemplate ? activeTemplate.name : 'Untitled'}
                    onEndEditing={(e) => handleUpdateTemplate(e.nativeEvent.text)}
                />
                <NestableScrollContainer>
                    {activeTemplate?.sections && activeTemplate?.sections.map((section, sectionIndex) => (
                        <TemplateSection
                            section={section}
                            sectionIndex={sectionIndex}
                            copyID={copyID}
                            setCopyID={setCopyID}
                            onEdit={() => {
                                handleChange('section', section.name)
                                setEditSectionID(section.id)
                            }}
                            onDelete={() => setDeleteSectionID(section.id)}
                        />
                    ))}
                    <HStack justifyContent={'center'} mx={4} mt={2} style={{
                        marginBottom: 150
                    }} >
                        <Button
                            bgColor={'white'}
                            _pressed={{
                                opacity: 0.6
                            }}
                            variant={'subtle'}
                            w={'48%'}
                            isLoading={addQuestionLoading}
                            onPress={handleAddQuestion}
                            borderRightRadius={0}
                            shadow={'none'}
                        >
                            <HStack space={4} alignItems={'center'} >
                                <Icon as={AntDesign} name={'plus'} color={'green.600'} size={'lg'} />
                                <Text fontSize={'18'} >Question</Text>
                            </HStack>
                        </Button>
                        <Divider orientation='vertical' />
                        <Button
                            bgColor={'white'}
                            _pressed={{
                                opacity: 0.6
                            }} variant={'subtle'}
                            w={'48%'}
                            onPress={() => setAddSectionModal(true)}
                            borderLeftRadius={0}
                            shadow={'none'}
                        >
                            <HStack space={4} alignItems={'center'} >
                                <Icon as={AntDesign} name={'plus'} color={'primary.600'} size={'lg'} />
                                <Text fontSize={'18'} >Section</Text>
                            </HStack>
                        </Button>
                    </HStack>
                </NestableScrollContainer>

            </Stack>

            {/* Add Section Modal */}
            <Modal isOpen={addSectionModal} onClose={() => setAddSectionModal(false)} >
                <Modal.Content>
                    <Modal.Header>
                        <Heading>Add Section</Heading>
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            placeholder='Section Name'
                            value={fields.section}
                            onChangeText={(text) => handleChange('section', text)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            isLoading={addSectionLoading}
                            onPress={() => handleAddSection(fields.section)}
                        >Save</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            {/* Edit & Delete Section Modal */}
            <Modal isOpen={Boolean(deleteSectionID || editSectionID)} onClose={() => {
                setEditSectionID(null)
                setDeleteSectionID(null)
            }} >
                <Modal.Content>
                    <Modal.Header>
                        {editSectionID && <Heading>Edit Section</Heading>}
                        {deleteSectionID && <Heading>Delete Section</Heading>}
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body>
                        {editSectionID && <Input
                            value={fields.section}
                            onChangeText={(text) => handleChange('section', text)}
                        />}
                        {deleteSectionID && <Text>Are you sure want to delete this section?</Text>}
                    </Modal.Body>
                    <Modal.Footer>
                        {editSectionID && <Button
                            isLoading={editSectionLoading}
                            onPress={handleEditSection}
                        >Edit</Button>}
                        {deleteSectionID && <Button
                            isLoading={deleteSectionLoading}
                            onPress={handleDeleteSection}
                        >Delete</Button>}
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            {/* Create Template Modal */}
            <Modal isOpen={open} _backdrop={{
                opacity: 0.55,

            }}
                onClose={() => {
                    setOpen(false)
                    navigation.goBack()
                }}
            >
                <Modal.Content>
                    <Modal.Header>
                        <Heading>Create Template</Heading>
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body>
                        <Stack space={4} >
                            <Stack space={2} >
                                <Input
                                    placeholder='Template Name...'
                                    value={fields.template}
                                    onChangeText={(text) => handleChange('template', text)}
                                />
                                <TextArea
                                    placeholder='Template Description'
                                />
                            </Stack>
                            {/* <HStack justifyContent={'space-between'} >
                                <Button
                                    colorScheme={'error'}
                                    variant={'subtle'}
                                    w={'48%'}
                                    isDisabled={createLoading}
                                >Cancel</Button>
                                
                            </HStack> */}
                        </Stack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant={'subtle'}
                            w={'48%'}
                            isLoading={createLoading}
                            onPress={handleCreateTemplate}
                        >Save</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
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
        createTemplate: (data) => dispatch(createTemplate(data)),
        updateTemplate: (data) => dispatch(updateTemplate(data)),
        clearActiveTemplate: () => dispatch(clearActiveTemplate()),
        addSection: (data) => dispatch(addSection(data)),
        updateSection: (data) => dispatch(updateSection(data)),
        deleteSection: (data) => dispatch(deleteSection(data)),
        addQuestion: (data) => dispatch(addQuestion(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateEditScreen)