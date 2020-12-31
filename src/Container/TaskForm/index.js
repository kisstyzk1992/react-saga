import { Box, Grid, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import * as modalActions from '../../actions/modal';
import * as taskActions from '../../actions/task'
import renderSelectField from '../../components/FormHelper/SelectField';
import renderTextField from '../../components/FormHelper/TextField';
import styles from './styles';
import validate from './validate';

class TaskForm extends Component {

    handleSubmitForm = (data) => {
        console.log('data: ', data)
        const { taskActionCreator, taskEditting } = this.props
        const { addTask, updateTask } = taskActionCreator
        const { title, description, status } = data
        if(taskEditting && taskEditting.id){
            updateTask(title, description, status)
        }else{
            addTask(title, description)
        }
    }

    renderStatusSelection() {
        let xhtml = null;
        const { taskEditting, classes, status } = this.props
        if (taskEditting && taskEditting.id) {
            xhtml = (
                <Field
                    id="status"
                    label="Trạng thái"
                    className={classes.TextField}
                    name="status"
                    component={renderSelectField}
                >
                    <MenuItem value={0}>Ready</MenuItem>
                    <MenuItem value={1}>In Progress</MenuItem>
                    <MenuItem value={2}>Completed</MenuItem>
                </Field>

            )
        }
        return xhtml
    }
    render() {
        // console.log('taskEditting: ', this.props.taskEditting)
        const { classes, modalActionCreator, handleSubmit, invalid, submitting, taskEditting } = this.props
        const { hideModal } = modalActionCreator
        return (
            <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                <Grid container>
                    <Grid item md={12}>
                        <Field
                            id="title"
                            label="Tiêu đề"
                            className={classes.TextField}
                            margin="normal"
                            name="title"
                            component={renderTextField}
                            value={taskEditting ? taskEditting.title : ''}
                        ></Field>
                    </Grid>
                    <Grid item md={12}>
                        <Field
                            id="description"
                            label="Mô tả"
                            className={classes.TextField}
                            margin="normal"
                            name="description"
                            multiline
                            rowsMax="4"
                            margin="normal"
                            component={renderTextField}
                            value={taskEditting ? taskEditting.description : ''}
                        ></Field>
                    </Grid>
                    {this.renderStatusSelection()}
                    <Grid item md={12}>
                        <Box display="flex" flexDirection="row-reverse" mt={2}>
                            <Box ml={1}>
                                <Button variant="contained" onClick={hideModal}>
                                    Hủy Bỏ
                </Button>
                            </Box>
                            <Button disabled={invalid || submitting} variant="contained" color="primary" type="submit">
                                Lưu lại
                </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        );

    }
}

TaskForm.propTypes = {
    classes: PropTypes.object,

    modalActionCreator: PropTypes.shape({
        hideModal: PropTypes.func,
    }),

    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,

    taskActionCreator: PropTypes.shape({
        addTask: PropTypes.func,
        updateTask: PropTypes.func
    }),
    taskEditting: PropTypes.object
}


const mapStateToProps = (state) => {
    return {
        taskEditting: state.task.taskEditting,
        initialValues: {
            title: state.task.taskEditting ? state.task.taskEditting.title : null,
            description: state.task.taskEditting ? state.task.taskEditting.description : null,
            status: state.task.taskEditting ? state.task.taskEditting.status : null,
        } // lấy value từ store
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        modalActionCreator: bindActionCreators(modalActions, dispatch),
        taskActionCreator: bindActionCreators(taskActions, dispatch)
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps)

const FORM_NAME = 'TASK_MANAGEMENT';
const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate
})


export default compose(
    withStyles(styles),
    withConnect,
    withReduxForm
)(TaskForm);