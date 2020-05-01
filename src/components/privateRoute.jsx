import React from "react";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (!props.user ? <Component /> : <Redirect to="/" />)}
  />
);

export default PrivateRoute;
