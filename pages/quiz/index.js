/* eslint-disable react/prop-types */
import React from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import QuestionWidget from '../../src/components/QuestionWidget';

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
function ResultWidget({ results }) {
    return (
        <Widget>
            <Widget.Header>Resultado</Widget.Header>
            <Widget.Content>
                {/* <p>Parabéns, {getPlayerName}!</p> */}
                <p>
                    Você acertou {results.filter((result) => result).length}{' '}
                    questões
                </p>
                <ul>
                    {results.map((result, index) => {
                        return (
                            <li key={index}>
                                #{index <= 9 ? 0 : ''}
                                {index + 1}:{' '}
                                {result === true ? 'Acertou' : 'Errou'}
                            </li>
                        );
                    })}
                </ul>
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
    const [results, setResult] = React.useState([true, false, true]);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    function pushResult(result) {
        setResult([...results, result]);
    }

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
                        pushResult={pushResult}
                    />
                )}

                {screenState === screenStates.LOADING && <LoadingWidget />}

                {screenState === screenStates.RESULT && (
                    <ResultWidget results={results} />
                )}
                {/* <Widget>
                    <Widget.Content>
                        <h1>Quizes da Galera</h1>
                        <p>lorem ipsum dolor sit amet...</p>
                    </Widget.Content>
                </Widget> */}
            </QuizContainer>
        </QuizBackground>
    );
}
