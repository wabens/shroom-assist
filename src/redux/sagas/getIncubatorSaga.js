import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getIncubator(action) {
  try {
    // get growing room data
    let response = yield axios.get('api/process/incubator');
    console.log(`incubator `, response);
    // set table to redux state
    yield put({ type: 'SET_INCUBATOR', payload: response.data });
    
    //get growing room data types
    let types = yield axios.get('api/process/incubator/types')
    yield put({type: 'SET_INCUBATOR_TYPES', payload: types.data})
    
  } catch (error) {
      console.log('Error getting data', error);
      alert('Sorry error getting data.')
  }
}

function* getIncubatorSaga() {
  yield takeLatest('GET_INCUBATOR', getIncubator);
}

export default getIncubatorSaga;
