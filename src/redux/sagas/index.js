import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import getGrowingRoomSaga from './getGrowingRoomSaga';
import getIncubatorSaga from './getIncubatorSaga';
import taskInfoSaga from './taskInfoSaga';
import targetModificationSaga from './targetModificationSaga';
import updateTargetValue from './targetFormSaga';
import taskCreatorSaga from './taskCreatorSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    getGrowingRoomSaga(),
    getIncubatorSaga(),
    taskInfoSaga(),
    targetModificationSaga(),
    updateTargetValue(),
    taskCreatorSaga()
  ]);
}
