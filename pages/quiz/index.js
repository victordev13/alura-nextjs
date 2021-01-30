/* eslint-disable react/prop-types */
import React from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import Button from '../../src/components/Button';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import QuestionWidget from '../../src/components/QuestionWidget';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from '../../src/components/Link';

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
const ReturnMessage = styled.p`
    color: ${({ theme }) => theme.colors.contrastText};
    background-color: ${({ theme }) => `${theme.colors.primary}40`};
    padding: 10px 15px;
    margin-bottom: 8px;
    border-radius: ${({ theme }) => theme.borderRadius};
    transition: 0.3s;
    display: block;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

function ResultWidget({ results, questions }) {
    const totalQuestions = results.filter((result) => result).length;
    const playerName =
        getPlayerName().charAt(0).toUpperCase() + getPlayerName().slice(1);
    return (
        <Widget>
            <Widget.Header>Resultado</Widget.Header>
            <Widget.Content>
                {!totalQuestions >= questions.length * 0.6 && (
                    <ReturnMessage>
                        <img src="hands.gif" width="40px" />
                        <b>Parabéns, {playerName}!</b>
                    </ReturnMessage>
                )}
                {totalQuestions < questions.length * 0.6 && (
                    <ReturnMessage>
                        <b>{playerName}, você precisa ler um pouco mais :)!</b>
                    </ReturnMessage>
                )}
                <p>
                    Você acertou {totalQuestions} questões de {questions.length}
                    !
                </p>
                <ul>
                    {results.map((result, index) => {
                        let currentQuestion = questions[index].title;
                        const currentColor =
                            result === true
                                ? db.theme.colors.success
                                : db.theme.colors.wrong;
                        if (currentQuestion.length >= 30) {
                            currentQuestion = currentQuestion
                                .slice(0, 27)
                                .padEnd(30, '...');
                        }

                        return (
                            <li key={index} style={{ color: currentColor }}>
                                {index + 1} - {currentQuestion}
                               
                            </li>
                        );
                    })}
                </ul>
                <Link href={'/'} passHref>
                    <Button type="button">Voltar para o início</Button>
                </Link>
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
    const [results, setResult] = React.useState([]);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    function pushResult(result) {
        setResult([...results, result]);
    }
    const router = useRouter();

    React.useEffect(() => {
        if (!router.query.name) {
            router.push('/');
        } else {
            setTimeout(() => {
                setScreenState(screenStates.QUIZ);
            }, 200);
        }
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
                    <ResultWidget results={results} questions={db.questions} />
                )}
            </QuizContainer>
        </QuizBackground>
    );
}

function getPlayerName() {
    return localStorage.getItem('player');
}
