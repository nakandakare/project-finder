import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.saga';
import { projectSagas} from './project/project.saga';

export default function* rootSaga() {
    yield all([call(userSagas), call(projectSagas)]); //all is for run multiple gen functions concurrencially
}