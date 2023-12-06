import API from "../../assets/common/API";

import {
    GET_ALL_TEMPLATES,
    CREATE_TEMPLATE,
    LOAD_TEMPLATE,
    SET_ACTIVE_TEMPLATE,
    CLEAR_ACTIVE_TEMPLATE,
    ADD_SECTION,
    ADD_QUESTION,
    UPDATE_SECTION,
    MOVE_QUESTIONS,
    UPDATE_QUESTION,
    UPDATE_OPTION,
    DELETE_SECTION,
    DELETE_QUESTION,
    ADD_OPTION,
    DELETE_OPTION,
    ADD_SUBQUESTION,
    ADD_SUBQUESTION_OPTION,
    DELETE_SUBQUESTION,
    UPDATE_SUBQUESTION,
    MOVE_SUBQUESTIONS,
    UPDATE_SUBQUESTION_OPTION,
    DELETE_SUBQUESTION_OPTION,
    UPDATE_CONDITION,
    MOVE_SECTIONS,
    COPY_SECTION,
    UPDATE_TEMPLATE,
} from "./actionTypes";

/*
* Templates Functions
*/

export const getAllTemplates = ({ FromDate, ToDate, SiteIds, Search }) => async (dispatch, getState) => {

    const authData = getState().auth

    try {
        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/TemplateListGetAll',
            requireAuth: true,
            requestConfig: {
                FromDate: null,
                ToDate: null,
                CompanyId: authData.user.CompanyId,
                SiteId: authData.user.SiteId,
                SiteIds: [],
                Search: '',
                AccessLevel: "GROUP",
                ActiveStatus: "ACTIVE",
                FetchNext: 10000
            }
        })
        if (res.responseMsg === 'Template List Displayed Successfully') {
            dispatch({
                type: GET_ALL_TEMPLATES,
                payload: {
                    templates: res.result.lstTemplates
                }
            })
        } else {
            throw new Error('Network Error')
        }
    } catch (e) {
        throw new Error('Error')
    }

}

export const createTemplate = (templateName) => async (dispatch, getState) => {

    const authData = getState().auth

    try {
        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/SaveTemplate',
            requireAuth: true,
            requestConfig: {
                CompanyId: authData.user.CompanyId,
                SiteId: authData.user.SiteId,
                AccessLevel: "GROUP",
                TemplateName: templateName,
                TemplateDescription: '',
                CopyFromTemplateID: 0,
                NoScoringRequired: true
            }
        })
        if (res.responseMsg === 'Template Created Successfully') {
            await dispatch({
                type: LOAD_TEMPLATE,
                payload: {
                    id: res.templateId,
                    name: templateName,
                    sections: [],
                    questions: []
                }
            })
            await dispatch({
                type: ADD_SECTION,
                payload: {
                    id: res.result.loadObj.lstSections[0].tltSectionID,
                    name: res.result.loadObj.lstSections[0].sectionName
                }
            })
            await dispatch({
                type: ADD_QUESTION,
                payload: {
                    id: res.result.loadObj.lstQuestions[0].tltQuestionId,
                    question: res.result.loadObj.lstQuestions[0].questionTxt,
                    isMandatory: res.result.loadObj.lstQuestions[0].isMandatory,
                    questionType: res.result.loadObj.lstQuestions[0].questionType,
                    sectionID: res.result.loadObj.lstQuestions[0].tltSectionId,
                    options: res.result.loadObj.lstQuestions[0].questionDetail.map((option) => ({
                        optionID: option.tltQuestionDetailId,
                        optionTxt: option.tltQuestionDetailText,
                        optionScore: option.tltScore,
                        isCompliant: option.tltIsCompliant
                    }))
                }
            })

            return true
        } else {
            throw new Error('Network Error')
        }
    } catch (e) {
        throw new Error('Error')
    }
}

export const updateTemplate = (templateName) => async (dispatch, getState) => {
    try {
        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/UpdateTemplateDetail',
            requestConfig: {
                TLTCheckListID: getState().templates.activeTemplate.id,
                templateName,
                AccessLevel: "",
                TemplateDescription: ""
            }
        })
        if (res.responseMsg === 'Template Updated Successfully') {
            dispatch({
                type: UPDATE_TEMPLATE,
                payload: {
                    name: templateName
                }
            })
        }
    } catch (e) {
        throw new Error(e)
    }
}

export const deleteTemplate = (templateID) => async (dispatch, getState) => {
    try {
        const res = await API({
            method: 'GET',
            url: `CXTemplateAPI/api/Template/deleteTemplateByTemplateId?templateId=${templateID}`,
            requireAuth: true
        })
        if (res.responseMsg === 'Template Deleted Successfully') {
            return true
        } else {
            throw new Error('Network Error')
        }
    } catch (e) {
        throw new Error('Error')
    }
}

export const loadTemplate = (templateID) => async (dispatch, getState) => {
    try {
        const res = await API({
            method: 'GET',
            url: `CXTemplateAPI/api/Template/GetTemplateDataByTemplateId?templateId=${templateID}`,
            requireAuth: true
        })
        if (res.responseMsg === 'Template Data Displayed Successfully') {
            await dispatch({
                type: LOAD_TEMPLATE,
                payload: {
                    id: res.result.loadObj.ckTemplateObj.tltCheckListID,
                    name: res.result.loadObj.ckTemplateObj.templateName,
                    sections: res.result.loadObj.lstSections.map((section) => ({
                        id: section.tltSectionID,
                        name: section.sectionName
                    })),
                    questions: res.result.loadObj.lstQuestions.filter(item => item.tltParentQuestionId === 0).map((question) => {
                        return {
                            id: question.tltQuestionId,
                            sectionID: question.tltSectionId,
                            parentID: question.tltParentQuestionId,
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
                            options: question.questionDetail.map((option) => ({
                                optionID: option.tltQuestionDetailId,
                                optionTxt: option.tltQuestionDetailText,
                                optionScore: option.tltScore,
                                isCompliant: option.tltIsCompliant
                            })),
                            subquestions: res.result.loadObj.lstQuestions.filter(item => item.tltParentQuestionId !== 0 && item.tltParentQuestionId === question.tltQuestionId).map((subquestion) => {
                                return {
                                    id: subquestion.tltQuestionId,
                                    parentID: subquestion.tltParentQuestionId,
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
                                    options: subquestion.questionDetail.map((subquestionOption) => ({
                                        optionID: subquestionOption.tltQuestionDetailId,
                                        optionTxt: subquestionOption.tltQuestionDetailText,
                                        optionScore: subquestionOption.tltScore,
                                        isCompliant: subquestionOption.tltIsCompliant
                                    })),
                                    condition: question.questionType === 'YES/NO' || question.questionType === 'MULTISELECT' ? question.conditionalValue : {
                                        conditionID: subquestion.conditionId,
                                        initialValue: subquestion.initialValue,
                                        finalValue: subquestion.finalValue
                                    }
                                }
                            }),
                            conditions: res.result.loadObj.lstConditions.filter(item => item.tltParentQuestionId === question.tltQuestionId).map((condition) => {
                                return {
                                    conditionID: condition.conditionId,
                                    initialValue: condition.initialValue,
                                    finalValue: condition.finalValue,
                                }
                            })
                        }
                    })
                }
            })
        } else {
            throw new Error('Network Error')
        }
    } catch (e) {
        throw new Error('Error')
    }
}

export const clearActiveTemplate = () => ({
    type: CLEAR_ACTIVE_TEMPLATE,
})

/*
* Sections Functions
*/

export const addSection = (sectionName) => async (dispatch, getState) => {
    try {
        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/SaveSectionDetail',
            requireAuth: true,
            requestConfig: {
                SectionName: sectionName,
                TLTCheckListID: getState().templates.activeTemplate.id,
            }
        })
        if (res.responseMsg === 'Section Saved Successfully') {
            dispatch({
                type: ADD_SECTION,
                payload: {
                    id: res.result.tltSectionID,
                    name: sectionName
                }
            })
        } else {
            throw new Error('Network Error')
        }
    } catch (e) {
        throw new Error('Error')
    }
}

export const copySection = ({ sectionID, index }) => async (dispatch, getState) => {
    try {
        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/CopySection',
            requestConfig: {
                TLTCheckListID: getState().templates.activeTemplate.id,
                TLTSectionID: sectionID
            }
        })
        if (res.responseMsg === 'Section Copied Successfully') {
            dispatch({
                type: COPY_SECTION,
                payload: {
                    index,
                    sections: res.result.loadObj.lstSections.map((section) => ({
                        id: section.tltSectionID,
                        name: section.sectionName
                    })),
                    questions: res.result.loadObj.lstQuestions.filter(item => item.tltParentQuestionId === 0).map((question) => {
                        return {
                            id: question.tltQuestionId,
                            sectionID: question.tltSectionId,
                            parentID: question.tltParentQuestionId,
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
                            options: question.questionDetail.map((option) => ({
                                optionID: option.tltQuestionDetailId,
                                optionTxt: option.tltQuestionDetailText,
                                optionScore: option.tltScore,
                                isCompliant: option.tltIsCompliant
                            })),
                            subquestions: res.result.loadObj.lstQuestions.filter(item => item.tltParentQuestionId !== 0 && item.tltParentQuestionId === question.tltQuestionId).map((subquestion) => {
                                return {
                                    id: subquestion.tltQuestionId,
                                    parentID: subquestion.tltParentQuestionId,
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
                                    options: subquestion.questionDetail.map((subquestionOption) => ({
                                        optionID: subquestionOption.tltQuestionDetailId,
                                        optionTxt: subquestionOption.tltQuestionDetailText,
                                        optionScore: subquestionOption.tltScore,
                                        isCompliant: subquestionOption.tltIsCompliant
                                    })),
                                    condition: subquestion.questionType === 'YES/NO' || subquestion.questionType === 'MULTISELECT' ? subquestion.conditionalValue : {
                                        conditionID: subquestion.conditionId,
                                        initialValue: subquestion.initialValue,
                                        finalValue: subquestion.finalValue
                                    }
                                }
                            }),
                            conditions: res.result.loadObj.lstConditions.filter(item => item.tltParentQuestionId === question.tltQuestionId).map((condition) => {
                                return {
                                    conditionID: condition.conditionId,
                                    initialValue: condition.initialValue,
                                    finalValue: condition.finalValue,
                                }
                            })
                        }
                    })
                }
            })
        }
    } catch (e) {
        throw new Error(e)
    }
}

export const updateSection = ({ sectionName, sectionID }) => async (dispatch, getState) => {
    try {
        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/UpdateSectionDetail',
            requireAuth: true,
            requestConfig: {
                SectionName: sectionName,
                TLTSectionID: sectionID,
                TLTCheckListID: getState().templates.activeTemplate.id,
            }
        })
        if (res.responseMsg === 'Section Updated Successfully') {
            dispatch({
                type: UPDATE_SECTION,
                payload: {
                    id: sectionID,
                    name: res.result.sectionName
                }
            })
        } else {
            throw new Error('Network Error')
        }
    } catch (e) {
        throw new Error('Error')
    }
}

export const deleteSection = (sectionID) => async (dispatch, getState) => {
    try {
        const res = await API({
            method: 'GET',
            url: `CXTemplateAPI/api/Template/DeleteSectionBySectionId?TLTsectionId=${sectionID}`,
            requireAuth: true
        })
        if (res.responseMsg === 'Section Deleted Successfully') {
            await dispatch({
                type: DELETE_SECTION,
                payload: {
                    id: sectionID
                }
            })
        } else {
            throw new Error('Network Error')
        }
    } catch (e) {
        throw new Error('Error')
    }
}

export const moveSections = (sections) => async (dispatch, getState) => {
    try {
        const res = API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/SaveSectionSortOrder',
            requestConfig: sections.map((item, index) => ({
                TLTCheckListID: getState().templates.activeTemplate.id,
                tltSectionId: item.id,
                sortOrder: index + 1
            }))
        })
        dispatch({
            type: MOVE_SECTIONS,
            payload: {
                sections
            }
        })
    } catch (e) {
        throw new Error(e)
    }
}

/*
* Questions Functions
*/

export const addQuestion = ({ templateID, sectionID, sectionIndex, questionType }) => async (dispatch, getState) => {
    try {
        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/CreateNewQuestion',
            requireAuth: true,
            requestConfig: {
                TLTChecklistID: templateID,
                TLTSectionID: sectionID,
                TLTQuestionType: questionType,
                InitialValue: "",
                FinalValue: "",
                ConditionalValue: ""
            }
        })
        if (res.responseMsg === 'Question Created Successfully') {
            await dispatch({
                type: ADD_QUESTION,
                payload: {
                    id: res.result.tltQuestionId,
                    sectionID: res.result.tltSectionId,
                    questionTxt: res.result.questionTxt,
                    isMandatory: res.result.isMandatory,
                    questionType: res.result.questionType,
                    temperatureMin: res.result.temperatureMin,
                    temperatureMax: res.result.temperatureMax,
                    score: res.result.score,
                    showCommentPopup: res.result.showCommentPopup,
                    showActionPopup: res.result.showActionPopup,
                    priority: res.result.priority,
                    mayNotApplicable: res.result.mayNotApplicable,
                    sortOrder: res.result.sortOrder
                }
            })
            res.result.questionDetail.forEach(async (item) => {
                await dispatch({
                    type: ADD_OPTION,
                    payload: {
                        sectionID: res.result.tltSectionId,
                        questionID: res.result.tltQuestionId,
                        optionID: item.tltQuestionDetailId,
                        optionTxt: item.tltQuestionDetailText,
                        optionScore: item.tltScore,
                        isCompliant: item.tltIsCompliant
                    }
                })
            })
        } else {
            throw new Error('Network Error')
        }
    } catch (e) {
        throw new Error('Error')
    }
}

export const updateQuestion = (data) => async (dispatch, getState) => {
    const {
        question,
        questionTxt,
        isMandatory,
        questionType,
        temperatureMin,
        temperatureMax,
        score,
        priority,
        mayNotApplicable
    } = data

    try {
        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/UpdateQuestion',
            requireAuth: true,
            requestConfig: {
                TLTQuestionID: question.id,
                questionTxt: questionTxt ? questionTxt : question.questionTxt,
                isMandatory: typeof isMandatory !== "undefined" ? isMandatory : question.isMandatory,
                questionType: questionType ? questionType : question.questionType,
                temperatureMin: temperatureMin ? temperatureMin : question.temperatureMin,
                temperatureMax: temperatureMax ? temperatureMax : question.temperatureMax,
                Score: score ? score : question.score,
                Priority: priority ? priority : question.priority,
                mayNotApplicable: typeof mayNotApplicable !== "undefined" ? mayNotApplicable : question.mayNotApplicable
            }
        })
        if (res.responseMsg === 'Question Updated Successfully') {
            if (!question.parentID) {
                dispatch({
                    type: UPDATE_QUESTION,
                    payload: {
                        id: res.result.tltQuestionId,
                        sectionID: res.result.tltSectionId,
                        questionTxt: res.result.questionTxt,
                        isMandatory: res.result.isMandatory,
                        questionType: res.result.questionType,
                        temperatureMin: res.result.temperatureMin,
                        temperatureMax: res.result.temperatureMax,
                        score: res.result.score,
                        showCommentsPopup: res.result.showCommentsPopup,
                        showActionPopup: res.result.showActionPopup,
                        priority: res.result.priority,
                        mayNotApplicable: res.result.mayNotApplicable,
                        subquestions: typeof questionType === 'undefined' ? question.subquestions : [],
                        options: typeof questionType === 'undefined' ? question.options : []
                    }
                })
                if (typeof questionType !== 'undefined') {
                    res.result.questionDetail.forEach((option) => {
                        dispatch({
                            type: ADD_OPTION,
                            payload: {
                                sectionID: res.result.tltSectionId,
                                questionID: res.result.tltQuestionId,
                                optionID: option.tltQuestionDetailId,
                                optionTxt: option.tltQuestionDetailText,
                                optionScore: option.tltScore,
                                isCompliant: option.tltIsCompliant
                            }
                        })
                    })
                }
            } else {
                dispatch({
                    type: UPDATE_SUBQUESTION,
                    payload: {
                        id: res.result.tltQuestionId,
                        parentID: res.result.tltParentQuestionId,
                        sectionID: res.result.tltSectionId,
                        questionTxt: res.result.questionTxt,
                        isMandatory: res.result.isMandatory,
                        questionType: res.result.questionType,
                        temperatureMin: res.result.temperatureMin,
                        temperatureMax: res.result.temperatureMax,
                        score: res.result.score,
                        showCommentsPopup: res.result.showCommentsPopup,
                        showActionPopup: res.result.showActionPopup,
                        priority: res.result.priority,
                        mayNotApplicable: res.result.mayNotApplicable,
                        options: typeof questionType === 'undefined' ? question.options : []
                    }
                })
                if (typeof questionType !== 'undefined') {
                    res.result.questionDetail.forEach((option) => {
                        dispatch({
                            type: ADD_SUBQUESTION_OPTION,
                            payload: {
                                sectionID: res.result.tltSectionId,
                                parentID: res.result.tltParentQuestionId,
                                questionID: res.result.tltQuestionId,
                                optionID: option.tltQuestionDetailId,
                                optionTxt: option.tltQuestionDetailText,
                                optionScore: option.tltScore,
                                isCompliant: option.tltIsCompliant
                            }
                        })
                    })
                }
            }
        }
    } catch (e) {
        throw new Error('Error')
    }
}

export const deleteQuestion = ({ sectionID, question }) => async (dispatch, getState) => {
    try {
        const res = await API({
            method: 'GET',
            url: `CXTemplateAPI/api/Template/DeleteQuestionbyQuestionId?TLTQuestionID=${question.id}`,
            requireAuth: true
        })
        if (res.responseMsg === 'Question Deleted Successfully') {
            if (!question.parentID) {
                await dispatch({
                    type: DELETE_QUESTION,
                    payload: {
                        sectionID,
                        questionID: question.id,
                    }
                })
            } else {
                await dispatch({
                    type: DELETE_SUBQUESTION,
                    payload: {
                        sectionID,
                        parentID: question.parentID,
                        questionID: question.id,
                    }
                })
            }
        } else {
            throw new Error('Network Error')
        }
    } catch (e) {
        throw new Error(e)
    }

}

export const moveQuestions = ({ sectionID, questions }) => async (dispatch, getState) => {
    try {
        const res = API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/SaveQuestionSortOrder',
            requireAuth: true,
            requestConfig: questions.map((item, index) => ({
                ID: item.id,
                sortOrder: index + 1
            }))
        })
        dispatch({
            type: MOVE_QUESTIONS,
            payload: {
                sectionID,
                questions
            }
        })
        return {
            questions
        }
    } catch (e) {
        throw new Error(e)
    }
}

/*
* Options Functions
*/

export const addOption = (data) => async (dispatch, getState) => {

    const {
        sectionID,
        question
    } = data

    try {
        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/saveQuestionMultiSelectDetails',
            requireAuth: true,
            requestConfig: {
                TLTQuestionID: question.id,
                TLTQuestionDetailText: "",
                TLTScore: 0,
                TLTIsCompliant: false
            }
        })
        if (res.responseMsg === 'Multiselect Question Saved Successfully') {
            if (!question.parentID) {
                await dispatch({
                    type: ADD_OPTION,
                    payload: {
                        sectionID,
                        questionID: question.id,
                        optionID: res.result.tltQuestionDetailId,
                        optionTxt: res.result.tltQuestionDetailText,
                        optionScore: res.result.tltScore,
                        isCompliant: res.result.tltIsCompliant
                    }
                })
            } else {
                await dispatch({
                    type: ADD_SUBQUESTION_OPTION,
                    payload: {
                        sectionID,
                        parentID: question.parentID,
                        questionID: question.id,
                        optionID: res.result.tltQuestionDetailId,
                        optionTxt: res.result.tltQuestionDetailText,
                        optionScore: res.result.tltScore,
                        isCompliant: res.result.tltIsCompliant
                    }
                })
            }
        } else {
            throw new Error('Network Error')
        }
    } catch (e) {
        throw new Error('Error')
    }
}

export const updateOption = (data) => async (dispatch, getState) => {

    const {
        sectionIndex,
        question,
        optionIndex,
        optionID,
        optionTxt,
        score,
        isCompliant
    } = data

    const section = getState().templates.activeTemplate.sections[sectionIndex]

    try {
        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/saveQuestionMultiSelectDetails',
            requireAuth: true,
            requestConfig: {
                TLTQuestionID: question.id,
                TLTQuestionDetailID: optionID,
                TLTQuestionDetailText: typeof optionTxt !== 'undefined' ? optionTxt : question.options[optionIndex].optionTxt,
                TLTScore: typeof score !== 'undefined' ? score : -1,
                TLTIsCompliant: typeof isCompliant !== 'undefined' ? isCompliant : question.options[optionIndex].isCompliant
            }
        })
        if (res.responseMsg === "Multiselect Question Saved Successfully") {

            if (!question.parentID) {
                dispatch({
                    type: UPDATE_OPTION,
                    payload: {
                        sectionID: section.id,
                        questionID: question.id,
                        optionID: res.result.tltQuestionDetailId,
                        optionTxt: res.result.tltQuestionDetailText,
                        score: res.result.tltScore,
                        isCompliant: res.result.tltIsCompliant
                    }
                })
            } else {
                dispatch({
                    type: UPDATE_SUBQUESTION_OPTION,
                    payload: {
                        sectionID: section.id,
                        parentID: question.parentID,
                        questionID: question.id,
                        optionID: res.result.tltQuestionDetailId,
                        optionTxt: res.result.tltQuestionDetailText,
                        score: res.result.tltScore,
                        isCompliant: res.result.tltIsCompliant
                    }
                })
            }
        }
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export const deleteOption = ({ sectionIndex, question, optionID }) => async (dispatch, getState) => {
    try {

        const section = getState().templates.activeTemplate.sections[sectionIndex]

        const res = await API({
            method: 'GET',
            url: `CXTemplateAPI/api/Template/DeleteQuestionMultiselectDetails?TLTQuestionDetailId=${optionID}`,
            requireAuth: true
        })
        if (res.responseMsg === "Multiselect Detail Deleted Successfully") {
            if (!question.parentID) {
                dispatch({
                    type: DELETE_OPTION,
                    payload: {
                        sectionID: section.id,
                        questionID: question.id,
                        optionID
                    }
                })
            } else {
                dispatch({
                    type: DELETE_SUBQUESTION_OPTION,
                    payload: {
                        sectionID: section.id,
                        parentID: question.parentID,
                        questionID: question.id,
                        optionID
                    }
                })
            }
        }
    } catch (e) {
        console.log(e)
        throw new Error('Error')
    }
}

/*
* SubQuestions Functions
*/

export const addSubQuestion = (data) => async (dispatch, getState) => {
    const {
        sectionIndex,
        question,
        conditionalValue,
        conditionID,
        initialValue,
        finalValue
    } = data

    try {
        const template = getState().templates.activeTemplate
        const section = getState().templates.activeTemplate.sections[sectionIndex]

        console.log(question.questionType)

        const getCondition = () => {
            if (question.questionType === 'YES/NO'
                || question.questionType === 'MULTISELECT') {
                return conditionalValue
            } else if (question.questionType === 'NUMERIC'
                || question.questionType === 'TEMPERATURE'
                || question.questionType === 'DATE'
                || question.questionType === 'TIME') {
                return {
                    conditionID,
                    initialValue,
                    finalValue
                }
            } else {
                return undefined
            }
        }

        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/CreateNewQuestion',
            requireAuth: true,
            requestConfig: {
                TLTChecklistID: template.id,
                TLTSectionID: section.id,
                TLTParentQuestionId: question.id,
                TLTQuestionType: 'YES/NO',
                InitialValue: typeof initialValue !== 'undefined' ? initialValue : "",
                FinalValue: typeof finalValue !== 'undefined' ? finalValue : "",
                ConditionalValue: typeof conditionalValue !== 'undefined' ? conditionalValue : "",
                ConditionId: typeof conditionID !== 'undefined' ? conditionID : undefined
            }
        })
        if (res.responseMsg === 'Question Created Successfully') {
            dispatch({
                type: ADD_SUBQUESTION,
                payload: {
                    id: res.result.tltQuestionId,
                    parentID: res.result.tltParentQuestionId,
                    sectionID: res.result.tltSectionId,
                    condition: getCondition(),
                    questionTxt: res.result.questionTxt,
                    isMandatory: res.result.isMandatory,
                    questionType: res.result.questionType,
                    temperatureMin: res.result.temperatureMin,
                    temperatureMax: res.result.temperatureMax,
                    score: res.result.score,
                    showCommentPopup: res.result.showCommentPopup,
                    showActionPopup: res.result.showActionPopup,
                    priority: res.result.priority,
                    mayNotApplicable: res.result.mayNotApplicable,
                    sortOrder: res.result.sortOrder
                }
            })
            res.result.questionDetail.forEach(async (option) => {
                await dispatch({
                    type: ADD_SUBQUESTION_OPTION,
                    payload: {
                        sectionID: section.id,
                        parentID: question.id,
                        questionID: res.result.tltQuestionId,
                        optionID: option.tltQuestionDetailId,
                        optionTxt: option.tltQuestionDetailText,
                        optionScore: option.tltScore,
                        isCompliant: option.tltIsCompliant
                    }
                })
            })
        } else {
            throw new Error('Network Error')
        }
    } catch (e) {
        throw new Error('Error')
    }
}

export const moveSubQuestions = ({ sectionID, parentID, subquestions, remainingSubquestions }) => async (dispatch, getState) => {
    try {
        const res = API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/SaveQuestionSortOrder',
            requireAuth: true,
            requestConfig: subquestions.map((item, index) => ({
                ID: item.id,
                sortOrder: index + 1
            }))
        })
        dispatch({
            type: MOVE_SUBQUESTIONS,
            payload: {
                sectionID,
                parentID,
                subquestions,
                remainingSubquestions
            }
        })
    } catch (e) {
        throw new Error(e)
    }
}

export const updateCondition = ({ section, question, subquestions, condition, updatedConditions }) => async (dispatch, getState) => {
    try {
        const res = await API({
            method: 'POST',
            url: 'CXTemplateAPI/api/Template/UpdateMultipleQuestions',
            requestConfig: subquestions.map((subquestion) => {
                return {
                    TLTQuestionID: subquestion.id,
                    ConditionId: condition.id,
                    InitialValue: condition.initialValue,
                    FinalValue: condition.finalValue,
                    TLTQuestionType: subquestion.questionType,
                }
            })
        })
        if (res.responseMsg === 'Multiple Questions Updated Successfully') {
            dispatch({
                type: UPDATE_CONDITION,
                payload: {
                    sectionID: section.id,
                    questionID: question.id,
                    subquestions,
                    condition,
                    updatedConditions,
                }
            })
            return true
        } else {
            throw new Error('Error')
        }
    } catch (e) {
        throw new Error(e)
    }
}

export const deleteCondition = () => async (dispatch, getState) => {

}



