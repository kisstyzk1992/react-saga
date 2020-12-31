import * as TaskConstants from './../constants/task'
import { toastError, toastSuccess } from './../helpers/toastHepers'

const initialState = {
    listTask: [],
    taskEditting: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TaskConstants.GET_TASK: {
            return {
                ...state,
                listTask: [],
            }
        }
        case TaskConstants.GET_TASK_SUCCESS: {
            const { data } = action.payload
            return {
                ...state,
                listTask: data,
            }
        }
        case TaskConstants.GET_TASK_FAILED: {
            const { error } = action.payload;
            toastError(error)
            return {
                ...state,
                listTask: [],
            }
        }
        //====== SEARCH ======
        case TaskConstants.FILTER_TASK_SUCCESS: {
            const { data } = action.payload
            return {
                ...state,
                listTask: data
            }
        }
        //======= ADD ======
        case TaskConstants.ADD_TASK: {
            // const {title, description} = action.payload
            return {
                ...state,
                // taskEditting: null
            }
        }
        case TaskConstants.ADD_TASK_SUCCESS: {
            const { data } = action.payload
            toastSuccess('Thêm công việc thành công');
            return {
                ...state,
                // listTask: state.listTask.concat([data])
                listTask: [data].concat(state.listTask)
            }
        }
        case TaskConstants.ADD_TASK_FAILED: {
            const { error } = action.payload
            toastError(error)
            return {
                ...state,
            }
        }
        //===================Display task Edit=============
        case TaskConstants.TASK_EDITTING: {
            const { task } = action.payload
            return {
                ...state,
                taskEditting: task
            }
        }
        //===================UPDATE==================
        case TaskConstants.UPDATE_TASK: {
            return {
                ...state
            }
        }
        case TaskConstants.UPDATE_TASK_SUCCESS: {
            const { data } = action.payload;
            const { listTask } = state
            
            const index = listTask.findIndex(item => item.id === data.id)
            if (index !== -1) {
                const newList = [
                    ...listTask.slice(0, index),
                    data,
                    ...listTask.slice(index + 1),
                ];
                toastSuccess('Cập nhật công việc thành công');
                return {
                    ...state,
                    listTask: newList
                }
            }
            return {
                ...state,
            }

        }
        case TaskConstants.UPDATE_TASK_FAILED: {
            const { error } = action.payload
            toastError(error)
            return {
                ...state,
            }
        }
        case TaskConstants.DELETE_TASK: {
            return {
                ...state
            }
        }
        case TaskConstants.DELETE_TASK_SUCCESS: {
            const { data: taskId } = action.payload; // task id
            toastSuccess('Xóa công việc thành công');
            return {
              ...state,
              listTask: state.listTask.filter(item => item.id !== taskId),
            };

        }
        case TaskConstants.DELETE_TASK_FAILED: {
            const { error } = action.payload
            toastError(error)
            return {
                ...state,
            }
        }
        default:
            return state;
    }
};

export default reducer