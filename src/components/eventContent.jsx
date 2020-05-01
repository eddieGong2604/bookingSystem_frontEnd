import React, { useReducer, useEffect } from "react";
import rootReducer from "../reducers/rootReducer";
import { actFetchAllEventsRequest } from "../actions/getAllEventsAction";
import EventCard from "./eventCard";

const EventContent = (props) => {
  const [state, dispatch] = useReducer(rootReducer, {
    events: [{}, {}, {}, {}, {}, {}, {}, {}],
  });
  useEffect(() => {
    actFetchAllEventsRequest()(dispatch);
  }, []);

  return (
    <div className="container mt-4 mb-5">
      <h3 style={{ color: "#4096e6" }}>Upcoming Events</h3>
      <div className="row">
        {state.events.map(
          (event) =>
            event.launched && (
              <div className="col-md-4 mt-3">
                <EventCard
                  isFetching={state.isLoading}
                  eventDetails={event}
                  user={props.user}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default EventContent;
