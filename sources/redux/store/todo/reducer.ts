import { TodoActions, TodoActionTypes, TodoState } from "./types";

export const initialState: TodoState = {
    list: [
        "Go develop!"
    ]
};

const reducer = (state: TodoState = initialState, action: TodoActions): TodoState => {
    switch (action.type) {
        case TodoActionTypes.AddTodo: {
            return { list: [...state.list, action.payload.todo]};
        }
        default: {
            return state;
        }
    }
};

export { reducer as todoReducer};
