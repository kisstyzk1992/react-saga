import * as TaskConstants from './../constants/task'
import {STATUSES} from './../constants'


export const getListTask = (params = {}) => {
    return {
        type: TaskConstants.GET_TASK,
        payload: {
            params
        }
    }
}

export const getListTaskSuccess = (data) => {
    return {
        type: TaskConstants.GET_TASK_SUCCESS,
        payload: {
            data
        }
    }
}

export const getListTaskFailed = (error) => {
    return {
        type: TaskConstants.GET_TASK_FAILED,
        payload: {
            error
        }
    }
}
//============= SEARCH ==================
export const filterTask = (keyword) => ({
    type: TaskConstants.FILTER_TASK,
    payload: {
        keyword
    }
})

export const filterTaskSuccess = (data) => ({
    type: TaskConstants.FILTER_TASK_SUCCESS,
    payload: {
        data
    }
})

//======= ADD =================

export const addTask = (title, description) => {
    return {
        type: TaskConstants.ADD_TASK,
        payload: {
            title,
            description
        }
    }
}

export const addTaskSuccess = (data) => {
    return {
        type: TaskConstants.ADD_TASK_SUCCESS,
        payload: {
            data
        }
    }
}

export const addTaskFailed = (error) => {
    return {
        type: TaskConstants.ADD_TASK_FAILED,
        payload: {
            error
        }
    }
}

//===========Display Task Edit===============

export const taskEditting = (task) => {
    return {
        type: TaskConstants.TASK_EDITTING,
        payload: {
            task
        }
    }
}

//===========Update Task====================

export const updateTask = (title, description, status = STATUSES[0].value) => {
    return {
        type: TaskConstants.UPDATE_TASK,
        payload: {
            title,
            description,
            status
        }
    }
}

export const updateTaskSuccess = (data) => {
    return {
        type: TaskConstants.UPDATE_TASK_SUCCESS,
        payload: {
            data
        }
    }
}

export const updateTaskFailed = (error) => {
    return {
        type: TaskConstants.UPDATE_TASK_FAILED,
        payload: {
            error
        }
    }
}

// ============= DELETE TASK =================
export const deleteTask = (id) => {
    return {
        type: TaskConstants.DELETE_TASK,
        payload: {
            id
        }
    }
}

export const deleteTaskSuccess = (data) => {
    return {
        type: TaskConstants.DELETE_TASK_SUCCESS,
        payload: {
            data
        }
    }
}

export const deleteTaskFailed = (error) => {
    return {
        type: TaskConstants.DELETE_TASK_FAILED,
        payload: {
            error
        }
    }
}








/**
 * B1: gọi getListTaskRequest()
 * B2: Reset: state tasks => []
 * B3: dispatch getListTaskSuccess (data respone)
 */
// export const getListTaskRequest = () => {
//     return dispatch => {
//         dispatch(getListTask());
//         taskApis.getList().then(response => {
//             const {data} = response;
//             dispatch(getListTaskSuccess(data));
//         }).catch(error => {
//             dispatch(getListTaskFailed(error));
//         })
//     }
// }