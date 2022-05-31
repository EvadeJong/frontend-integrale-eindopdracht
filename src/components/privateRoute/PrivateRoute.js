import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function PrivateRoute({ login, children, ...rest }) {

    return (
        <Route {...rest} >
            {login === true ? children : <Redirect to="/login" />}
        </Route>
    );
}

export default PrivateRoute;