import { createNavigationContainerRef } from "@react-navigation/native"

export const navigationRef = createNavigationContainerRef()

export const activeTemplateNavigate = (clearActiveTemplate, optionScreenName, sectionsScreenName) => {
    if (navigationRef.getCurrentRoute().name !== optionScreenName && navigationRef.getCurrentRoute().name !== sectionsScreenName) {
        clearActiveTemplate()
    }
}