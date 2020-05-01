import * as Types from "../constants/actionTypes";
const initialState = [];

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_EVENTS:
      return {
        ...state,
        // whenever we want to fetch the whiskies, set isLoading to true to show a spinner
        isLoading: true,
        error: null,
      };
    case Types.GET_ALL_EVENTS_SUCCESS:
      return {
        events: [...action.payload],
        // whenever the fetching finishes, we stop showing the spinner and then show the data
        isLoading: false,
        error: null,
      };
    case Types.GET_ALL_EVENTS_FAILURE:
      return {
        events: [],
        isLoading: false,
        // same as FETCH_WHISKIES_SUCCESS, but instead of data we will show an error message
        error: action.payload,
      };
    default:
      return state;
  }
}
