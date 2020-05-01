import React, { useEffect, useState } from "react";
import NavBar from "./components/navBar";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import EventContent from "./components/eventContent";
import { createStore, applyMiddleware, combineReducers } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { Layout } from "antd";
import LoginPage from "./components/loginPage";
import jwtDecode from "jwt-decode";
import Logout from "./components/logout";
import SignUp from "./components/signUp";
import DashBoard from "./components/dashBoard";
import Profile from "./components/profile";
import CreateEvent from "./components/createEvent";
import StaffUpdateEvent from "./components/staffUpdateEvent";
import AdminUpdateEvent from "./components/adminUpdateEvent";

const allReducers = combineReducers({ events: rootReducer });
const store = createStore(allReducers, applyMiddleware(thunk));
function App() {
  const [user, setState] = useState("");
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      user.jwtCode = jwt;
      setState(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar user={user} />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <EventContent user={user} {...props} />}
          />
          <Route
            path="/login"
            exact
            render={(props) => {
              if (user) return <Redirect to="/" />;
              else return <LoginPage />;
            }}
          />
          <Route path="/logout" exact component={Logout} />
          <Route
            path="/signup"
            exact
            exact
            render={(props) => {
              if (user) return <Redirect to="/" />;
              else return <SignUp />;
            }}
          />
          <Route
            path="/dashboard"
            exact
            render={(props) => {
              if (user.aud === "ROLE_USER") return <DashBoard user={user} />;
              else return <Redirect to="/login" />;
            }}
          />

          <Route
            path="/createEvent"
            exact
            render={(props) => {
              if (user.aud === "ROLE_STAFF") return <CreateEvent user={user} />;
              else return <Redirect to="/" />;
            }}
          />

          <Route
            path="/staff/updateEvent"
            exact
            render={(props) => {
              if (user.aud === "ROLE_STAFF")
                return <StaffUpdateEvent user={user} />;
              else return <Redirect to="/" />;
            }}
          />
          <Route
            path="/admin/updateEvent"
            exact
            render={(props) => {
              if (user.aud === "ROLE_ADMIN")
                return <AdminUpdateEvent user={user} />;
              else return <Redirect to="/" />;
            }}
          />

          <Route
            path="/profile"
            exact
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              else return <Profile user={user} />;
            }}
          />
        </Switch>

        <Layout.Footer
          style={{ position: "fixed", left: "0", bottom: "0", width: "100%" }}
        >
          @Developed By Tien-Loc Le - 2020
        </Layout.Footer>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
