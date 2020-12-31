
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import styles from './styles';
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid';
import { STATUSES } from './../../constants/index'
import TaskList from './../../components/TaskList/index'
import TaskForm from './../TaskForm/index'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import * as taskActions from './../../actions/task'
import * as modalActions from './../../actions/modal'
import SearchBox from '../../components/SearchBox/index'
import { Box } from '@material-ui/core';
// import { toast } from 'react-toastify'


class TaskBoard extends Component {
    state = {
        open: false
    }
    // được gọi sau khi component mount
    componentDidMount() {
        const { taskActionsCreators } = this.props;
        // const { getListTaskRequest } = taskActionsCreators;
        // getListTaskRequest();

        const { getListTask } = taskActionsCreators;
        getListTask();
    }

    renderBoard() {
        const { listTask } = this.props
        let xhtml = null
        xhtml = (
            <Grid container spacing={2}>
                {
                    STATUSES.map((status) => {
                        const taskFiltered = listTask.filter(task => task.status === status.value);
                        return (
                            <TaskList
                                key={status.value}
                                tasks={taskFiltered}
                                status={status}
                                onClickEdit={this.handleEditTask}
                                onClickDelete={this.showModalDeleteTask} />
                        )
                    })
                }
            </Grid>
        );
        return xhtml
    }

    handleChange = (e) => {
        const { value } = e.target;
        const { taskActionsCreators } = this.props;
        const { filterTask } = taskActionsCreators;
        filterTask(value)
    }

    handleEditTask = (task) => {
        // console.log('task: ', task)
        const { taskActionsCreators, modalActionsCreator } = this.props;
        const { taskEditting } = taskActionsCreators;
        taskEditting(task);
        const { showModal, changModalTitle, changeModalContent } = modalActionsCreator;
        showModal();
        changModalTitle('Cập nhật công việc');
        changeModalContent(<TaskForm />)
    }

    showModalDeleteTask = (task) => {
        const { modalActionsCreator, classes } = this.props;
        const { showModal, hideModal, changModalTitle, changeModalContent } = modalActionsCreator;
        showModal();
        changModalTitle('Xóa công việc');
        changeModalContent(
            <div className={classes.modalDelete}>
                <div className={classes.modalConfirmText}>
                    Bạn chắc chắn muốn xóa <span className={classes.modalConfirmTextBold}>{task.title}</span>?
                </div>
                <Box display="flex" flexDirection="row-reverse" mt={2}>
                    <Box ml={1}>
                        <Button variant="contained" onClick={hideModal}>
                            Hủy Bỏ
                        </Button>
                    </Box>
                    <Box>
                        <Button variant="contained" color="primary" onClick={() => this.handleDeleteTask(task)}>
                            Xóa
                        </Button>
                    </Box>
                </Box>
            </div>
        )
    }

    handleDeleteTask = (task) => {
        // console.log('task: ', task)
        const {id} = task
        const { taskActionsCreators } = this.props;
        const { deleteTask } = taskActionsCreators;
        deleteTask(id);
    }

    renderSearch() {
        let xhtml = null;
        xhtml = (
            <SearchBox handleChange={this.handleChange} />
        );
        return xhtml
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    openForm = () => {
        const { modalActionsCreator, taskActionsCreators } = this.props;
        const { taskEditting } = taskActionsCreators;
        taskEditting(null);
        const { showModal, changModalTitle, changeModalContent } = modalActionsCreator;
        showModal();
        changModalTitle('Thêm mới công việc');
        changeModalContent(<TaskForm />)

    }

    // renderForm() {
    //     const { open } = this.state
    //     let xhtml = null;
    //     xhtml = (
    //         <TaskForm open={open} onClose={this.handleClose} />
    //     )
    //     return xhtml
    // }


    // loadData = () => {
    //     const { taskActionsCreators } = this.props;
    //     const { getListTask } = taskActionsCreators;
    //     getListTask();
    // }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.taskBoard}>
                {/* <Button variant="contained" color="primary" className={classes.button}
                    onClick={this.loadData}
                    style={{
                        marginRight: 20
                    }}
                >
                    Load Data
               </Button> */}
                <Button variant="contained" color="primary" className={classes.button} onClick={this.openForm}>
                    <AddIcon /> Thêm mới công việc
               </Button>
                {/* <Box ml="1" >
                    <Button variant="contained" color="primary" onClick={this.showToast}>
                        Hiển thị thông báo
                    </Button>
                </Box> */}
                {this.renderSearch()}
                {this.renderBoard()}
                {/* {this.renderForm()} */}
            </div>
        );
    }
}

TaskBoard.propTypes = {
    classes: PropTypes.object,
    taskActionsCreators: PropTypes.shape({
        // getListTaskRequest: PropTypes.func
        getListTask: PropTypes.func,
        filterTask: PropTypes.func,
        deleteTask: PropTypes.func,
        taskEditting: PropTypes.func

    }),
    modalActionsCreator: PropTypes.shape({
        showModal: PropTypes.func,
        hideModal: PropTypes.func,
        changModalTitle: PropTypes.func,
        changeModalContent: PropTypes.func
    }),
    listTask: PropTypes.array,
    
};

const mapStateToProps = (state) => {
    return {
        listTask: state.task.listTask
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        taskActionsCreators: bindActionCreators(taskActions, dispatch),
        modalActionsCreator: bindActionCreators(modalActions, dispatch)
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskBoard));