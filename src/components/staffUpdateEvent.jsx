import React, { useReducer, useState, useEffect } from "react";
import { actFetchEventsBasedOnUserIdRequest } from "../actions/getAllEventsAction";
import Axios from "axios";
import { Button } from "antd";
import rootReducer from "../reducers/rootReducer";
const StaffUpdateEvent = ({ user }) => {
  const [state, dispatch] = useReducer(rootReducer, { events: [] });
  const [events, setState] = useState([]);
  useEffect(() => {
    actFetchEventsBasedOnUserIdRequest(user.jti, user.jwtCode)(dispatch);
    setState(state.events);
  }, [events]);
  const deleteEvent = async (eventDetails) => {
    setState(events.filter((e) => e.name !== eventDetails.name));

    Axios({
      method: "DELETE",
      url: `http://localhost:8080/api/events/${user.jti}/${eventDetails.id}`,
      headers: {
        Authorization: `Bearer ${user.jwtCode}`,
      },
    });

    Axios({
      method: "DELETE",
      url: `http://localhost:8080/api/events/${eventDetails.id}`,
      headers: {
        Authorization: `Bearer ${user.jwtCode}`,
      },
    });
  };
  console.log(state.events);
  return (
    <div className="container mt-4">
      <h3 style={{ color: "#4096e6" }}>Managing your created events</h3>
      <h6> You have created {state.events.length} events</h6>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> Name</th>
            <th scope="col"> Description</th>
            <th scope="col"> Date</th>
            <th scope="col"> Location</th>
            <th scope="col"> Price</th>
            <th scope="col"> Action</th>
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
                <Button onClick={() => deleteEvent(e)}>Cancel Event</Button>
              </td>
              <td>{!e.launched ? "Pending" : "Approved"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffUpdateEvent;
