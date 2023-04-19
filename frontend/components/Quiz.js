import React from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import * as actionCreators from '../state/action-creators'


export function Quiz() {
  const dispatch = useDispatch();
  const quizState = useSelector(state => state.quiz);
  const selectedAnswerState = useSelector(state => state.selectedAnswer);

  const handleSelect = (answer_id) => {
    dispatch(actionCreators.selectAnswer(answer_id));
  }

  const handleSubmit = () => {
    dispatch(actionCreators.postAnswer(quizState.quiz_id, selectedAnswerState));
  }

  if (!quizState) {
    dispatch(actionCreators.fetchQuiz())
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quizState ? (
          <>
            <h2>{quizState.question}</h2>
            <div id="quizAnswers">
              <div className={`answer ${selectedAnswerState === (quizState.answers[0].answer_id) ? 'selected' : ""}`}>
                {quizState.answers[0].text}
                <button onClick={() => handleSelect(quizState.answers[0].answer_id)}>
                {selectedAnswerState === (quizState.answers[0].answer_id)?'SELECTED':'Select'}
                </button>
              </div>
              <div className={`answer ${selectedAnswerState === (quizState.answers[1].answer_id) ? 'selected' : ""}`}>
              {quizState.answers[1].text}
                <button onClick={() => handleSelect(quizState.answers[1].answer_id)}>
                {selectedAnswerState === (quizState.answers[1].answer_id)?'SELECTED':'Select'}
                </button>
              </div>
            </div>

            <button 
              id="submitAnswerBtn" 
              disabled={!selectedAnswerState}
              onClick={handleSubmit}
            >
              Submit answer
            </button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  );
}

export default connect(st => st, actionCreators)(Quiz)