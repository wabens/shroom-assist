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

function* deleteTask(action) {
  try {
    console.log(`delete `, action.payload);

    yield axios.delete(`api/task/${action.payload.task_id}`);
    
    yield put({ type: 'GET_TASK_LIST'});
    yield put({ type: 'GET_TARGET_LIST'});
    yield put({ type: 'GET_CONSTRAINT_LIST'});

  } catch (error) {
      console.log('Error deleting', error);
      alert('Sorry error deleting task.')
  }
}

function* completeTask(action) {
  try {
    console.log(`update `, action.payload);

    yield axios.put(`api/task/${action.payload.task_id}`);
    
    yield put({ type: 'GET_TASK_LIST'});
    yield put({ type: 'GET_TARGET_LIST'});
    yield put({ type: 'GET_CONSTRAINT_LIST'});

  } catch (error) {
      console.log('Error deleting', error);
      alert('Sorry error deleting task.')
  }
}

function* getTaskInfoSaga() {
  yield takeLatest('GET_TASK_LIST', getTaskList);
  yield takeLatest('GET_TARGET_LIST', getTargetList);
  yield takeLatest('GET_CONSTRAINT_LIST', getConstraintList);
  yield takeLatest('DELETE_TASK', deleteTask);
  yield takeLatest('COMPLETE_TASK', completeTask)

}

export default getTaskInfoSaga;
