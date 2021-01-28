/* eslint-disable react/prop-types */
import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuestionWidget from '../src/components/QuestionWidget';

function LoadingWidget() {
  return (
      <Widget>
          <Widget.Header>Carregando...</Widget.Header>

          <Widget.Content>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                      src="/spinner.gif"
                      style={{ width: '50px', marginRight: '10px' }}
                  />
                  Carregando...
              </div>
          </Widget.Content>
      </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
        setScreenState(screenStates.QUIZ);
    }, 200);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}
          
        {screenState === screenStates.LOADING && <LoadingWidget />}
        <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <p>lorem ipsum dolor sit amet...</p>
            </Widget.Content>
          </Widget>
        {screenState === screenStates.RESULT && (
          <div>Você acertou X questões, parabéns!</div>
        )}
      </QuizContainer>
      
    </QuizBackground>
  );
}
