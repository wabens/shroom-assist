import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateTargetValue(action) {
  try {

    yield axios.put('api/task/target/value', action.payload);
    
    //yield put({ type: 'GET_TARGET_LIST'});
    
  } catch (error) {
      console.log('Error updating target data', error);
      alert('Sorry error updating data.')
  }
}

function* targetFormSaga() {
  yield takeLatest('UPDATE_TARGET_VALUE', updateTargetValue);
}

export default targetFormSaga;
