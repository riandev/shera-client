import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userContext } from '../../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loginInfo, setLoginInfo]=useContext(userContext);
    
    const agent = sessionStorage.getItem('agent');
    return (
        <Route
        {...rest}
        render={({ location }) =>
          (loginInfo.email || agent) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;