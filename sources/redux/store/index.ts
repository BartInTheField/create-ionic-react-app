
// tslint:disable-next-line: no-submodule-imports
import { devToolsEnhancer } from "redux-devtools-extension/logOnlyInProduction";

import { combineReducers, createStore } from "redux";
import { todoReducer, TodoState } from "./todo";

export interface ApplicationState {
    todo: TodoState;
}

export default createStore<ApplicationState, any, any, any>(
     combineReducers({
        todo: todoReducer
    }),
    devToolsEnhancer({})
);
