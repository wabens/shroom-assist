import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getTaskList(action) {
  try {
    let response = yield axios.get('api/task/');
    console.log(`taskList `, response);
    
    yield put({ type: 'SET_TASK_LIST', payload: response.data });
    
  } catch (error) {
      console.log('Error getting task data', error);
      alert('Sorry error getting data.')
  }
}

function* getTargetList(action) {
  try {
    let response = yield axios.get('api/task/target');
    console.log(`targetList `, response);
    
    yield put({ type: 'SET_TARGET_LIST', payload: response.data });
    
  } catch (error) {
      console.log('Error getting target list', error);
      alert('Sorry error getting data.')
  }
}

function* getConstraintList(action) {
  try {
    let response = yield axios.get('api/task/constraint');
    console.log(`constraintList `, response);
    
    yield put({ type: 'SET_CONSTRAINT_LIST', payload: response.data });
    
  } catch (error) {
      console.log('Error getting constraint list', error);
      alert('Sorry error getting data.')
  }
}
function* getTaskInfoSaga() {
  yield takeLatest('GET_TASK_LIST', getTaskList);
  yield takeLatest('GET_TARGET_LIST', getTargetList);
  yield takeLatest('GET_CONSTRAINT_LIST', getConstraintList);

}

export default getTaskInfoSaga;
