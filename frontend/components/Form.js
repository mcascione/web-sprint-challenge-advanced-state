import React from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form() {
  const dispatch = useDispatch();
  const formState = useSelector(state => state.form);
  const {newQuestion, newTrueAnswer, newFalseAnswer} = formState;
  
  const onChange = evt => {
    const value = evt.target.value;
    const id = evt.target.id;
    dispatch(actionCreators.inputChange(value, id));
  }

  const onSubmit = evt => {
    evt.preventDefault();
    dispatch(actionCreators.postQuiz(newQuestion, newTrueAnswer, newFalseAnswer));
  }


  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={newQuestion}/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={newTrueAnswer}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={newFalseAnswer}/>
      <button id="submitNewQuizBtn" disabled={!(newQuestion.trim() && newTrueAnswer.trim() && newFalseAnswer.trim())}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
