import { combineReducers } from 'redux';

const dataSelected = (state = [], action) => {
    if(action.type==="DATA_SELECTED"){
        return action.payload
    }
    else{
        return state
    }
};

const currentTable = (state = [], action) => {
    if (action.type === "CURRENT_TABLE") {
        return action.payload
    } else {
        return state
    }
};



export default combineReducers({
    dataSelected,
    currentTable
});