import { fork, take, call, put, delay, takeLatest, select, takeEvery } from 'redux-saga/effects'
import * as TypeActions from '../constants/task'
import { addTask, deleteTask, getList, updateTask } from './../apis/task'
import { STATUSES, STATUS_CODE } from '../constants/index'
import {
    addTaskFailed,
    addTaskSuccess,
    deleteTaskFailed,
    deleteTaskSuccess,
    getListTask,
    getListTaskFailed,
    getListTaskSuccess,
    updateTaskFailed,
    updateTaskSuccess
} from '../actions/task';
import { hideLoading, showLoading } from './../actions/ui'
import { hideModal } from '../actions/modal';

/**
 * B1: thực thi action get task
 * B2: gọi API
 *  + hiển thị tiến trình (loading)
 * B3: kiểm tra status code
 * Nếu thành công ...
 * Nếu thất bại...
 * B4: tắt loading
 * B5: thực thi các công việc tiếp theo
 */
function* followGetListTaskActions() {
    while (true) { // vòng lập vô tận
        //lắng nghe action GET_TASK
        const action = yield take(TypeActions.GET_TASK);
        // dispatch action showloading
        yield put(showLoading())
        //  console.log('action: ', action)
        // ===============BLOCK cho đến khi nào dispatch action thì lệnh take mới được active và tham gia vào saga================
        // console.log('follow get list task action');
        const { params } = action.payload;
        const response = yield call(getList, params);
        // ===============BLOCK cho đến khi call API xong mới chạy tiếp các dòng bên dưới================
        const { status, data } = response
        if (status === STATUS_CODE.SUCCESS) {
            yield put(getListTaskSuccess(data))
            //dispatch action getListTaskSuccess
        } else {
            yield put(getListTaskFailed(error))
            //dispatch action getListTaskFailed
        }
        yield delay(1000)
        // dispatch action hideloading
        yield put(hideLoading())
    }
}

// function* followCreateListTaskActions() {
//     console.log('follow create get list task action')
// }

function* filterTaskSaga({ payload }) {
    yield delay(500);
    const { keyword } = payload
    yield put(getListTask({
        //  /tasks?search=task1 - search by all fields for string task1
        search: keyword

    })
    )
}

function* addTaskSaga({ payload }) {
    const { title, description } = payload
    yield put(showLoading());
    const response = yield call(addTask, {
        title,
        description,
        status: STATUSES[0].value
    });
    const { data, status } = response;
    if (status === STATUS_CODE.CREATED) {
        yield put(addTaskSuccess(data))
        yield put(hideModal());
    } else {
        yield put(addTaskFailed(error))
    }
    yield delay(500);
    yield put(hideLoading())
}

function* updateTaskSaga({ payload }) {
    const { title, description, status } = payload;
    const taskEditting = yield select(state => state.task.taskEditting);
    yield put(showLoading());
    const response = yield call(updateTask, { title, description, status }, taskEditting.id)
    const { data, status: statusCode } = response;
    if (statusCode === STATUS_CODE.SUCCESS) {
        yield put(updateTaskSuccess(data))
        yield put(hideModal());
    } else {
        yield put(updateTaskFailed(error))
    }
    yield delay(1000);
    yield put(hideLoading())
}

function* deleteTaskSaga({ payload }) {
    const { id } = payload;
    yield put(showLoading());
    const response = yield call(deleteTask, id);
    const { status: statusCode } = response;
    if (statusCode === STATUS_CODE.SUCCESS) {
        yield put(deleteTaskSuccess(id));
        yield put(hideModal());
    } else {
        yield put(deleteTaskFailed(error));
    }
    yield delay(1000);
    yield put(hideLoading());
}
// fork được sử dụng để theo dõi các action và là 1 generation function
function* rootsaga() {
    yield fork(followGetListTaskActions)
    // yield fork(followCreateListTaskActions)
    // chỉ thực thi và trả lại kết quả của actions cuối cùng
    yield takeLatest(TypeActions.FILTER_TASK, filterTaskSaga)
    yield takeEvery(TypeActions.ADD_TASK, addTaskSaga)
    yield takeLatest(TypeActions.UPDATE_TASK, updateTaskSaga)
    yield takeLatest(TypeActions.DELETE_TASK, deleteTaskSaga)
}

export default rootsaga