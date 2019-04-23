const growingRoomData = (state=[{}],action) => {
    if(action.type==='SET_GROWING_ROOM'){
        console.log(`in growing room reducer `);
        
        return action.payload.data;
    }
    else{
        return state
    }
};

export default growingRoomData;