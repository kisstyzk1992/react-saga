import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { TextField } from '@material-ui/core'
import styles from './styles'
import PropTypes from 'prop-types'

class SearchBox extends Component {
    render() {
        const { classes, handleChange } = this.props
        return (
            <h1>
                Search Box
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        className={classes.TextField}
                        onChange={handleChange}
                        margin="normal"
                        autoComplete="off"
                        placeholder="Nhập từ khóa"
                    />
                </form>
            </h1>
        );
    }
}

SearchBox.propTypes = {
    classes: PropTypes.object,
    handleChange: PropTypes.func
}

export default withStyles(styles)(SearchBox);