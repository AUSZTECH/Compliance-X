import { combineReducers } from "redux"

import auth from "./auth"
import common from "./common"
import templates from "./templates"

const rootReducer = combineReducers({
    auth,
    common,
    templates
})

export default rootReducer