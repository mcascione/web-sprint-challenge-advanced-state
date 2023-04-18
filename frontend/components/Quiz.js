import React, {useEffect} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { fetchQuiz, selectAnswer, postAnswer, setMessage} from '../state/action-creators';

export function Quiz() {
  const dispatch = useDispatch();
  const quizState = useSelector(state => state.quiz);
  const selectedAnswer = useSelector(state => state.selectedAnswer);
  const infoMessage = useSelector((state) => state.infoMessage);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  useEffect(() => {
    if (infoMessage && selectedAnswer) {
      dispatch(setMessage(null));
    }
  }, [infoMessage, selectedAnswer, dispatch]);

  const handleSelect = (answer_id) => {
    dispatch(selectAnswer(answer_id));
  }

  const handleSubmit = () => {
    dispatch(postAnswer(quizState.quiz_id, selectedAnswer));
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
       quizState ?   (
          <>
            <h2>{quizState.question}</h2>
            <div id="quizAnswers">
              <div className={`answer ${selectedAnswer === (quizState.answers[0].answer_id) ? 'selected' : ""}`}>
                {quizState.answers[0].text}
                <button onClick={() => handleSelect(quizState.answers[0].answer_id)}>
                {selectedAnswer === (quizState.answers[0].answer_id)?'Selected':'Select'}
                </button>
              </div>
              <div className={`answer ${selectedAnswer === (quizState.answers[1].answer_id) ? 'selected' : ""}`}>
              {quizState.answers[1].text}
                <button onClick={() => handleSelect(quizState.answers[1].answer_id)}>
                {selectedAnswer === (quizState.answers[1].answer_id)?'Selected':'Select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={!selectedAnswer}onClick={handleSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }

    </div>
  )
}

export default connect(st => st, actionCreators)(Quiz)