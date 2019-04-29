import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createTask(action) {
  try {

    yield axios.post('api/task/', action.payload);
    
    
  } catch (error) {
      console.log('Error adding task ', error);
      alert('Sorry error adding task.')
  }
}

function* taskCreatorSaga() {
  yield takeLatest('ADD_TASK', createTask);
}

export default taskCreatorSaga;
