import { combineReducers } from "redux";
import FoodRequestReducer from "./FoodRequestReducer";

export default combineReducers({
  data: FoodRequestReducer,
});
