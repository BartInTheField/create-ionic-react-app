import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type ThemeColor = "light" | "dark";

export enum TodoActionTypes {
    AddTodo = "TODO/ADD_TODO"
}

export interface TodoState {
    readonly list: string[];
}

export type TodoActions = ActionType<typeof actions>;
