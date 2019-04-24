import { combineReducers } from 'redux';

const taskList = (state = [], action) => {
    if(action.type==="SET_TASK_LIST"){
        return action.payload
    }
    else{
        return state
    }
};

const targetList = (state = [], action) => {
    if (action.type === "SET_TARGET_LIST") {
        return action.payload
    } else {
        return state
    }
};

const constraintList = (state = [], action) => {
    if (action.type === "SET_CONSTRAINT_LIST") {
        return action.payload
    } else {
        return state
    }
};


export default combineReducers({
    constraintList,
    taskList,
    targetList
});