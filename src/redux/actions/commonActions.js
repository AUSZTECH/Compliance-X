import {
    SET_TEMPLATE_THEME,
    SET_TOOLBAR_POSITION
} from "./actionTypes"

export const setTemplateTheme = (payload) => {
    return ({
        type: SET_TEMPLATE_THEME,
        payload
    })
}

export const setToolbarPosition = (payload) => {
    return ({
        type: SET_TOOLBAR_POSITION,
        payload
    })
}