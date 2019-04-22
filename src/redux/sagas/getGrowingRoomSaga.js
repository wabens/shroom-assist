import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getGrowingRoom(action) {
  try {
    // get growing room data
    let response = yield axios.get('api/process/growing_room');
    console.log(`growing room `, response);
    
    // set table to redux state
    //yield put({ type: 'LOGIN', payload: action.payload });
    
  } catch (error) {
      console.log('Error getting data', error);
      alert('Sorry error getting data.')
  }
}

function* getGrowingRoomSaga() {
  yield takeLatest('GET_GROWING_ROOM', getGrowingRoom);
}

export default getGrowingRoomSaga;
