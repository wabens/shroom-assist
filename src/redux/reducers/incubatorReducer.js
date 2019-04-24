const incubatorData = (state = [], action) => {
    if (action.type === 'SET_INCUBATOR') {
        console.log(`in incubator reducer `);

        return action.payload;
    } else {
        return state
    }
};

export default incubatorData;