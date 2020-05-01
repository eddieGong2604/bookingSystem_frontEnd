import * as Types from "../constants/actionTypes";
import Axios from "axios";

export function actFetchAllEventsRequest() {
  return function (dispatch) {
    dispatch(getAllEvents());
    return Axios.get("http://localhost:8080/api/events/all")
      .then(({ data }) => {
        dispatch(getAllEventsActionSuccess(data));
      })
      .catch((err) => dispatch(getAllEventsActionFailure(err.message)));
  };
}

export function actFetchEventsBasedOnUserIdRequest(userId, jwtCode) {
  return function (dispatch) {
    dispatch(getAllEvents());
    return Axios.get(`http://localhost:8080/api/events/userEvent=${userId}`, {
      headers: {
        Authorization: `Bearer ${jwtCode}`,
      },
    })
      .then(({ data }) => {
        dispatch(getAllEventsActionSuccess(data));
      })
      .catch((err) => dispatch(getAllEventsActionFailure(err.message)));
  };
}

export const getAllEvents = () => ({
  type: Types.GET_ALL_EVENTS,
});

export const getAllEventsActionSuccess = (events) => ({
  type: Types.GET_ALL_EVENTS_SUCCESS,
  payload: events,
});

export const getAllEventsActionFailure = (message) => ({
  type: Types.GET_ALL_EVENTS_FAILURE,
  payload: message,
});
