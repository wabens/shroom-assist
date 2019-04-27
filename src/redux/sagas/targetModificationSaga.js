import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



// payload for POST and PUT contains whole target object
// on server modification values and target row if PUT are pulled from target object
function* postTarget(action) {
  try { 
    console.log(`post table mod`, action.payload);
    yield axios.post('api/process/insert', action.payload);
    
  } catch (error) {
      console.log('Error posting target modification', error);
      alert('Sorry error sending data.')
  }
}

function* putTarget(action) {
    try { 
        console.log(`put table mod`, action.payload);
        yield axios.put('api/process/update', action.payload);
    
    } catch (error) {
      console.log('Error PUT target modification', error);
      alert('Sorry error sending data.')
    }

}

function* getTaskInfoSaga() {
  yield takeLatest('TARGET_POST', postTarget);
  yield takeLatest('TARGET_PUT', putTarget);

}

export default getTaskInfoSaga;
