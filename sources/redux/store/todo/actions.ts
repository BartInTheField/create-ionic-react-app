import { action } from "typesafe-actions";
import { TodoActionTypes } from "./types";

export const addTodo = (todo: string) => action(TodoActionTypes.AddTodo, {
    todo
});
