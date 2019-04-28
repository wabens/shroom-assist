import { combineReducers } from 'redux';

const incubatorTypes = (state = [], action) => {
    if (action.type === 'SET_INCUBATOR_TYPES') {
        return action.payload
    }
    else{
        return state
    }
};

const growingRoomTypes = (state = [], action) => {
    if (action.type === 'SET_GROWING_ROOM_TYPES') {
        return action.payload
    } else {
        return state
    }
};



export default combineReducers({
    incubatorTypes,
    growingRoomTypes
});