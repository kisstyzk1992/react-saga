import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import DashBoard from '../../../components/Dashboard';
import PropTypes from 'prop-types';

class AdminLayoutRoute extends Component {
    render() {
        const { component: TasksComponent, ...remainProps } = this.props;
        // console.log('remainProps: ', remainProps);
        return (
            <Route
                {...remainProps}
                render={
                    routeProps => {
                        return (
                            <DashBoard {...remainProps}>
                                <TasksComponent {...routeProps} />
                            </DashBoard>
                        );
                    }
                }
            />
        );
    }
}

AdminLayoutRoute.propTypes = {
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string
}

export default AdminLayoutRoute;