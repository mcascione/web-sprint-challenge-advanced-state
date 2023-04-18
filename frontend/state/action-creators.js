import axios from "axios";
// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: "MOVE_CLOCKWISE" };
}

export function moveCounterClockwise() {
  return { type: "MOVE_COUNTERCLOCKWISE" };
}

export function selectAnswer(answer_id) {
  return { type: "SET_SELECTED_ANSWER", payload: answer_id};
}

export function setMessage(answer_message) {
  return { type: "SET_INFO_MESSAGE", payload: answer_message};
}

export function setQuiz(data) {
  return { type: "SET_QUIZ_INTO_STATE", payload: data};
}

export function inputChange() {}

export function resetForm() {}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null));
    
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setMessage("Error fetching quiz"));
      });
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}

export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
   
   const answerPayload = {
    quiz_id: quiz_id,
    answer_id: answer_id,
  };
    axios
    .post("http://localhost:9000/api/quiz/answer", answerPayload)

    .then((res) => {
      dispatch(selectAnswer(null));
      dispatch(setMessage(res.data.message))
      dispatch(fetchQuiz());
    })
    .catch(err => {
      console.log(err);
      dispatch(setMessage("Error submitting answer"));
    });
  
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
