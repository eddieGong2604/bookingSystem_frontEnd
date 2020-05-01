import React, { useReducer, useState, useEffect } from "react";
import {
  actFetchEventsBasedOnUserIdRequest,
  actFetchAllEventsRequest,
} from "../actions/getAllEventsAction";
import Axios from "axios";
import { Button } from "antd";
import rootReducer from "../reducers/rootReducer";
const AdminUpdateEvent = ({ user }) => {
  const [state, dispatch] = useReducer(rootReducer, { events: [] });
  const [events, setState] = useState([]);
  useEffect(() => {
    actFetchAllEventsRequest()(dispatch);
    setState(state.events);
  }, [events]);
  const deleteEvent = async (eventDetails) => {
    setState(events.filter((e) => e.name !== eventDetails.name));

    Axios({
      method: "DELETE",
      url: `http://localhost:8080/api/events/${eventDetails.id}`,
      headers: {
        Authorization: `Bearer ${user.jwtCode}`,
      },
    });
  };

  const approveEvent = async (eventDetails) => {
    await Axios({
      method: "PUT",
      url: `http://localhost:8080/api/events/launchEvent/${eventDetails.id}`,
      headers: {
        Authorization: `Bearer ${user.jwtCode}`,
      },
    });
    window.location = "/";
  };
  return (
    <div className="container mt-4">
      <h3 style={{ color: "#4096e6" }}>Managing all system events</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> Name</th>
            <th scope="col"> Description</th>
            <th scope="col"> Date</th>
            <th scope="col"> Location</th>
            <th scope="col"> Price</th>
            <th scope="col"> Delete</th>
            <th scope="col"> Approve</th>
            <th scope="col"> Status</th>
          </tr>
        </thead>
        <tbody>
          {state.events.map((e) => (
            <tr key={e.name}>
              <th scope="row"> {state.events.indexOf(e) + 1}</th>
              <td>{e.name}</td>
              <td>{e.description}</td>
              <td>{e.dateTime}</td>
              <td>{e.location}</td>
              <td>{e.price + "AUD"}</td>
              <td>
                <Button onClick={() => deleteEvent(e)}>Delete</Button>
              </td>
              <td>
                {" "}
                <Button type="primary" onClick={() => approveEvent(e)}>
                  Approve
                </Button>
              </td>
              <td>{!e.launched ? "Pending" : "Approved"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUpdateEvent;
