import {
    GET_ALL_TEMPLATES,
    CLEAR_ACTIVE_TEMPLATE,
    ADD_SECTION,
    UPDATE_SECTION,
    DELETE_SECTION,
    ADD_QUESTION,
    MOVE_QUESTIONS,
    UPDATE_QUESTION,
    DELETE_QUESTION,
    ADD_OPTION,
    UPDATE_OPTION,
    DELETE_OPTION,
    ADD_SUBQUESTION,
    UPDATE_SUBQUESTION,
    DELETE_SUBQUESTION,
    ADD_SUBQUESTION_OPTION,
    UPDATE_SUBQUESTION_OPTION,
    DELETE_SUBQUESTION_OPTION,
    LOAD_TEMPLATE,
    MOVE_SUBQUESTIONS,
    UPDATE_CONDITION,
    DELETE_CONDITION,
    MOVE_SECTIONS,
    COPY_SECTION,
    UPDATE_TEMPLATE,
} from "../actions/actionTypes"

const initialState = {
    templates: [],
    activeTemplate: null
}

const templates = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_TEMPLATES:
            return {
                ...state,
                templates: action.payload.templates
            }

        case LOAD_TEMPLATE:
            return {
                ...state,
                activeTemplate: {
                    id: action.payload.id,
                    name: action.payload.name,
                    sections: action.payload.sections.map((section) => ({
                        id: section.id,
                        name: section.name,
                        questions: action.payload.questions.filter(item => item.sectionID === section.id).map((question) => {
                            return {
                                id: question.id,
                                questionTxt: question.questionTxt,
                                isMandatory: question.isMandatory,
                                questionType: question.questionType,
                                temperatureMin: question.temperatureMin,
                                temperatureMax: question.temperatureMax,
                                score: question.score,
                                showCommentsPopup: question.showCommentsPopup,
                                showActionPopup: question.showActionPopup,
                                priority: question.priority,
                                mayNotApplicable: question.mayNotApplicable,
                                sortOrder: question.sortOrder,
                                options: question.options.map((option) => ({
                                    id: option.optionID,
                                    optionTxt: option.optionTxt,
                                    score: option.optionScore,
                                    isCompliant: option.isCompliant
                                })),
                                subquestions: question.subquestions.map((subquestion) => ({
                                    id: subquestion.id,
                                    parentID: subquestion.parentID,
                                    questionTxt: subquestion.questionTxt,
                                    isMandatory: subquestion.isMandatory,
                                    questionType: subquestion.questionType,
                                    temperatureMin: subquestion.temperatureMin,
                                    temperatureMax: subquestion.temperatureMax,
                                    score: subquestion.score,
                                    showCommentsPopup: subquestion.showCommentsPopup,
                                    showActionPopup: subquestion.showActionPopup,
                                    priority: subquestion.priority,
                                    mayNotApplicable: subquestion.mayNotApplicable,
                                    sortOrder: subquestion.sortOrder,
                                    condition: subquestion.condition,
                                    options: subquestion.options.map((subquestionOption) => ({
                                        id: subquestionOption.optionID,
                                        optionTxt: subquestionOption.optionTxt,
                                        score: subquestionOption.optionScore,
                                        isCompliant: subquestionOption.isCompliant
                                    }))
                                })),
                                conditions: question.conditions
                            }
                        })
                    }))
                }
            }

        case CLEAR_ACTIVE_TEMPLATE:
            return {
                ...state,
                activeTemplate: {}
            }

        case UPDATE_TEMPLATE:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    name: action.payload.name
                }
            }

        case ADD_SECTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: [
                        ...state.activeTemplate.sections,
                        {
                            ...action.payload,
                            questions: []
                        }
                    ]
                }
            }

        case COPY_SECTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: [
                        ...state.activeTemplate.sections.slice(0, action.payload.index + 1),
                        {
                            id: action.payload.sections[0].id,
                            name: action.payload.sections[0].name,
                            questions: action.payload.questions.map((question) => {
                                return {
                                    id: question.id,
                                    questionTxt: question.questionTxt,
                                    isMandatory: question.isMandatory,
                                    questionType: question.questionType,
                                    temperatureMin: question.temperatureMin,
                                    temperatureMax: question.temperatureMax,
                                    score: question.score,
                                    showCommentsPopup: question.showCommentsPopup,
                                    showActionPopup: question.showActionPopup,
                                    priority: question.priority,
                                    mayNotApplicable: question.mayNotApplicable,
                                    sortOrder: question.sortOrder,
                                    options: question.options.map((option) => ({
                                        id: option.optionID,
                                        optionTxt: option.optionTxt,
                                        score: option.optionScore,
                                        isCompliant: option.isCompliant
                                    })),
                                    subquestions: question.subquestions.map((subquestion) => ({
                                        id: subquestion.id,
                                        parentID: subquestion.parentID,
                                        questionTxt: subquestion.questionTxt,
                                        isMandatory: subquestion.isMandatory,
                                        questionType: subquestion.questionType,
                                        temperatureMin: subquestion.temperatureMin,
                                        temperatureMax: subquestion.temperatureMax,
                                        score: subquestion.score,
                                        showCommentsPopup: subquestion.showCommentsPopup,
                                        showActionPopup: subquestion.showActionPopup,
                                        priority: subquestion.priority,
                                        mayNotApplicable: subquestion.mayNotApplicable,
                                        sortOrder: subquestion.sortOrder,
                                        condition: subquestion.condition,
                                        options: subquestion.options.map((subquestionOption) => ({
                                            id: subquestionOption.optionID,
                                            optionTxt: subquestionOption.optionTxt,
                                            score: subquestionOption.optionScore,
                                            isCompliant: subquestionOption.isCompliant
                                        }))
                                    })),
                                    conditions: question.conditions
                                }
                            })
                        },
                        ...state.activeTemplate.sections.slice(action.payload.index + 1)
                    ]
                }
            }

        case UPDATE_SECTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((item) => {
                        if (item.id === action.payload.id) {
                            return {
                                ...item,
                                name: action.payload.name
                            }
                        } else {
                            return item
                        }
                    })
                }
            }

        case DELETE_SECTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.filter(item => item.id !== action.payload.id)
                }
            }

        case MOVE_SECTIONS:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: action.payload.sections
                }
            }

        case ADD_QUESTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((item) => {
                        if (item.id === action.payload.sectionID) {
                            return {
                                ...item,
                                questions: [
                                    ...item.questions,
                                    {
                                        id: action.payload.id,
                                        questionTxt: action.payload.questionTxt,
                                        isMandatory: action.payload.isMandatory,
                                        questionType: action.payload.questionType,
                                        temperatureMin: action.payload.temperatureMin,
                                        temperatureMax: action.payload.temperatureMax,
                                        score: action.payload.score,
                                        showCommentsPopup: action.payload.showCommentsPopup,
                                        showActionPopup: action.payload.showActionPopup,
                                        priority: action.payload.priority,
                                        mayNotApplicable: action.payload.mayNotApplicable,
                                        sortOrder: action.payload.sortOrder,
                                        options: action.payload.options ? action.payload.options : [],
                                        subquestions: []
                                    }
                                ]
                            }
                        } else {
                            return item
                        }
                    })
                }
            }

        case UPDATE_QUESTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.id) {
                                        return {
                                            ...question,
                                            questionTxt: action.payload.questionTxt,
                                            isMandatory: action.payload.isMandatory,
                                            questionType: action.payload.questionType,
                                            temperatureMin: action.payload.temperatureMin,
                                            temperatureMax: action.payload.temperatureMax,
                                            score: action.payload.score,
                                            showCommentsPopup: action.payload.showCommentsPopup,
                                            showActionPopup: action.payload.showActionPopup,
                                            priority: action.payload.priority,
                                            mayNotApplicable: action.payload.mayNotApplicable,
                                            options: action.payload.options,
                                            subquestions: action.payload.subquestions
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case DELETE_QUESTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.filter(item => item.id !== action.payload.questionID)
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case MOVE_QUESTIONS:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: action.payload.questions
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case ADD_OPTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.questionID) {
                                        return {
                                            ...question,
                                            options: [
                                                ...question.options,
                                                {
                                                    id: action.payload.optionID,
                                                    optionTxt: action.payload.optionTxt,
                                                    score: action.payload.optionScore,
                                                    isCompliant: action.payload.isCompliant
                                                }
                                            ]
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case UPDATE_OPTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.questionID) {
                                        return {
                                            ...question,
                                            options: question.options.map((option) => {
                                                if (option.id === action.payload.optionID) {
                                                    return {
                                                        ...option,
                                                        optionTxt: action.payload.optionTxt,
                                                        score: action.payload.score,
                                                        isCompliant: action.payload.isCompliant
                                                    }
                                                } else {
                                                    return option
                                                }
                                            })
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }


        case DELETE_OPTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.questionID) {
                                        return {
                                            ...question,
                                            options: question.options.filter(item => item.id !== action.payload.optionID)
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case ADD_SUBQUESTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.parentID) {
                                        return {
                                            ...question,
                                            subquestions: [
                                                ...question.subquestions,
                                                {
                                                    id: action.payload.id,
                                                    parentID: action.payload.parentID,
                                                    questionTxt: action.payload.questionTxt,
                                                    isMandatory: action.payload.isMandatory,
                                                    questionType: action.payload.questionType,
                                                    temperatureMin: action.payload.temperatureMin,
                                                    temperatureMax: action.payload.temperatureMax,
                                                    score: action.payload.score,
                                                    showCommentsPopup: action.payload.showCommentsPopup,
                                                    showActionPopup: action.payload.showActionPopup,
                                                    priority: action.payload.priority,
                                                    mayNotApplicable: action.payload.mayNotApplicable,
                                                    sortOrder: action.payload.sortOrder,
                                                    condition: action.payload.condition,
                                                    options: []
                                                }
                                            ]
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case UPDATE_SUBQUESTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.parentID) {
                                        return {
                                            ...question,
                                            subquestions: question.subquestions.map((subquestion) => {
                                                if (subquestion.id === action.payload.id) {
                                                    return {
                                                        ...subquestion,
                                                        questionTxt: action.payload.questionTxt,
                                                        isMandatory: action.payload.isMandatory,
                                                        questionType: action.payload.questionType,
                                                        temperatureMin: action.payload.temperatureMin,
                                                        temperatureMax: action.payload.temperatureMax,
                                                        score: action.payload.score,
                                                        showCommentsPopup: action.payload.showCommentsPopup,
                                                        showActionPopup: action.payload.showActionPopup,
                                                        priority: action.payload.priority,
                                                        mayNotApplicable: action.payload.mayNotApplicable,
                                                        sortOrder: action.payload.sortOrder,
                                                        options: action.payload.options
                                                    }
                                                } else {
                                                    return subquestion
                                                }
                                            })
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case DELETE_SUBQUESTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.parentID) {
                                        return {
                                            ...question,
                                            subquestions: question.subquestions.filter((subQuestion) => subQuestion.id !== action.payload.questionID)
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case MOVE_SUBQUESTIONS:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.parentID) {
                                        return {
                                            ...question,
                                            subquestions: [
                                                ...action.payload.subquestions,
                                                ...action.payload.remainingSubquestions
                                            ]
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case ADD_SUBQUESTION_OPTION:
            console.log(action.payload)
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.parentID) {
                                        return {
                                            ...question,
                                            subquestions: question.subquestions.map((subQuestion) => {
                                                if (subQuestion.id === action.payload.questionID) {
                                                    return {
                                                        ...subQuestion,
                                                        options: [
                                                            ...subQuestion.options,
                                                            {
                                                                id: action.payload.optionID,
                                                                optionTxt: action.payload.optionTxt,
                                                                score: action.payload.optionScore,
                                                                isCompliant: action.payload.isCompliant
                                                            }
                                                        ]
                                                    }
                                                } else {
                                                    return subQuestion
                                                }
                                            })
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case UPDATE_SUBQUESTION_OPTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.parentID) {
                                        return {
                                            ...question,
                                            subquestions: question.subquestions.map((subQuestion) => {
                                                if (subQuestion.id === action.payload.questionID) {
                                                    return {
                                                        ...subQuestion,
                                                        options: subQuestion.options.map((option) => {
                                                            if (option.id === action.payload.optionID) {
                                                                return ({
                                                                    ...option,
                                                                    optionTxt: action.payload.optionTxt,
                                                                    score: action.payload.score,
                                                                    isCompliant: action.payload.isCompliant
                                                                })
                                                            } else {
                                                                return option
                                                            }
                                                        })
                                                    }
                                                } else {
                                                    return subQuestion
                                                }
                                            })
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case DELETE_SUBQUESTION_OPTION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.parentID) {
                                        return {
                                            ...question,
                                            subquestions: question.subquestions.map((subQuestion) => {
                                                if (subQuestion.id === action.payload.questionID) {
                                                    return {
                                                        ...subQuestion,
                                                        options: subQuestion.options.filter(item => item.id !== action.payload.optionID)
                                                    }
                                                } else {
                                                    return subQuestion
                                                }
                                            })
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case UPDATE_CONDITION:
            return {
                ...state,
                activeTemplate: {
                    ...state.activeTemplate,
                    sections: state.activeTemplate.sections.map((section) => {
                        if (section.id === action.payload.sectionID) {
                            return {
                                ...section,
                                questions: section.questions.map((question) => {
                                    if (question.id === action.payload.questionID) {
                                        return {
                                            ...question,
                                            subquestions: question.subquestions.map((subQuestion) => {
                                                const updateSubquestion = action.payload.subquestions.find((payloadSubQuestion) => subQuestion.id === payloadSubQuestion.id)
                                                if (updateSubquestion) {
                                                    return {
                                                        ...subQuestion,
                                                        condition: {
                                                            conditionID: action.payload.condition.id,
                                                            initialValue: action.payload.condition.initialValue,
                                                            finalValue: action.payload.condition.finalValue
                                                        }
                                                    }
                                                }
                                                return subQuestion
                                            }),
                                            conditions: action.payload.updatedConditions
                                        }
                                    } else {
                                        return question
                                    }
                                })
                            }
                        } else {
                            return section
                        }
                    })
                }
            }

        case DELETE_CONDITION:



        default:
            return state
    }
}

export default templates