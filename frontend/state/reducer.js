// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from "redux";
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from "./action-types";

const initialWheelState = 0;
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      if (state >= 0 && state < 5) {
        return state + 1;
      } else if (state === 5) {
        return 0;
      }
      break;
    case MOVE_COUNTERCLOCKWISE:
      if (state > 0 && state <= 5) {
        return state - 1;
      } else if (state === 0) {
        return 5;
      }
      break;
    default:
      return state;
  }
}

const initialQuizState = null;
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return action.payload;
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;
function selectedAnswer(state = initialSelectedAnswerState, action) {

  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return action.payload;
    default:
      return state;
  }
}

const initialMessageState = null;
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: "",
  newTrueAnswer: "",
  newFalseAnswer: "",
};
function form(state = initialFormState, action) {
  let value, id;
  switch (action.type) {
    case INPUT_CHANGE: 
    value = action.payload.value;
    id = action.payload.id;
    if (id === "newQuestion"){
      return {...state, newQuestion: value}
    } else if (id === "newTrueAnswer"){
      return {...state, newTrueAnswer: value}
    } else if (id === "newFalseAnswer"){
      return {...state, newFalseAnswer: value}
    }
    break;
    case RESET_FORM: 
      return initialFormState;
    default:
      return state;
  }
}

export default combineReducers({
  wheel,
  quiz,
  selectedAnswer,
  infoMessage,
  form,
});
