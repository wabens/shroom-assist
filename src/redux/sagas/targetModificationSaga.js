import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



// Splits put from post in both cases the action.payload contains a target
// the .target_table will be sent as a param to determine which table is modified
// the .modification_value contains a stringified object with the values
function* postTarget(action) {
  try { 
    let response = yield axios.POST('api/proccess/');
    console.log(`taskList `, response);
    
    yield put({ type: 'SET_TASK_LIST', payload: response.data });
    
  } catch (error) {
      console.log('Error getting task data', error);
      alert('Sorry error getting data.')
  }
}

function* putTarget(action) {
  try {
    let response = yield axios.get('api/task/target');
    console.log(`targetList `, response);
    
    yield put({ type: 'SET_TARGET_LIST', payload: response.data });
    
  } catch (error) {
      console.log('Error getting target list', error);
      alert('Sorry error getting data.')
  }
}

function* getTaskInfoSaga() {
  yield takeLatest('GET_TASK_LIST', getTaskList);
  yield takeLatest('GET_TARGET_LIST', getTargetList);

}

export default getTaskInfoSaga;
