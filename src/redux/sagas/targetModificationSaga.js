import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



// Splits put from post in both cases the action.payload contains a target
// the .target_table will be sent as a param to determine which table is modified
// the .modification_value contains a stringified object with the values
function* postTarget(action) {
  try { 
    console.log(`post table mod`, action.payload);
    yield axios.post('api/process/growing_room', action.payload);
    
  } catch (error) {
      console.log('Error posting target modification', error);
      alert('Sorry error sending data.')
  }
}

function* putTarget(action) {
    console.log(`put table mod`, action.payload);
    
//   try {
//     let response = yield axios.get('api/task/target');
//     console.log(`targetList `, response);
    
//     yield put({ type: 'SET_TARGET_LIST', payload: response.data });
    
//   } catch (error) {
//       console.log('Error getting target list', error);
//       alert('Sorry error getting data.')
//   }
}

function* getTaskInfoSaga() {
  yield takeLatest('TARGET_POST', postTarget);
  yield takeLatest('TARGET_PUT', putTarget);

}

export default getTaskInfoSaga;
