/* eslint-disable react/prop-types */
import React from 'react';
import Widget from '../Widget';
import Button from '../Button';
import AlternativesForm from '../AlternativeForm';
import db from '../../../db.json';

// eslint-disable-next-line object-curly-newline
function Success() {
    return (
        <div
            style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}
        >
            <div
                style={{
                    width: '30px',
                    height: '30px',
                    padding: '6px',
                    borderRadius: '50px',
                    backgroundColor: db.theme.colors.success,
                    marginRight: '5px',
                }}
            >
                <img src="/check.png" />
            </div>
            <p>Parabéns, você acertou!</p>
        </div>
    );
}

function Error() {
    return (
        <div
            style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}
        >
            <div
                style={{
                    width: '30px',
                    height: '30px',
                    padding: '5px 6px',
                    borderRadius: '50px',
                    backgroundColor: db.theme.colors.wrong,
                    marginRight: '5px',
                }}
            >
                <img src="/error.png" />
            </div>
            <p>Que pena, você errou!</p>
        </div>
    );
}
export default function QuestionWidget({
    question,
    questionIndex,
    totalQuestions,
    onSubmit,
    pushResult,
}) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(
        undefined
    );
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const hasAlternativeSelected = selectedAlternative !== undefined;
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative == question.answer;

    return (
        <Widget>
            <Widget.Header>
                {/* <BackLinkArrow href="/" /> */}
                <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
            </Widget.Header>
            {!!question.image && (
                <img
                    alt={question.title}
                    style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                    }}
                    src={question.image}
                />
            )}
            <Widget.Content>
                <h2>{question.title}</h2>
                <p>{question.description}</p>

                <AlternativesForm
                    onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault();
                        setIsQuestionSubmited(true);
                        pushResult(isCorrect);
                        setTimeout(() => {
                            onSubmit();
                            setIsQuestionSubmited(false);
                            setSelectedAlternative(undefined);
                        }, 1500);
                    }}
                >
                    {question.alternatives.map(
                        (alternative, alternativeIndex) => {
                            const alternativeId = `alternative__${alternativeIndex}`;
                            const alternativeStatus = isCorrect
                                ? 'SUCCESS'
                                : 'ERROR';
                            const isSelected =
                                selectedAlternative === alternativeIndex;
                            return (
                                <Widget.Topic
                                    as="label"
                                    htmlFor={alternativeId}
                                    key={alternativeId}
                                    data-selected={isSelected}
                                    data-status={
                                        isQuestionSubmited && alternativeStatus
                                    }
                                >
                                    <input
                                        style={{ display: 'none' }}
                                        id={alternativeId}
                                        name={questionId}
                                        type="radio"
                                        onClick={() => {
                                            setSelectedAlternative(
                                                alternativeIndex
                                            );
                                            console.log(
                                                `alternativa selecionada: ${selectedAlternative}`
                                            );
                                        }}
                                    />
                                    {alternative}
                                </Widget.Topic>
                            );
                        }
                    )}
                    <Button type="submit" disabled={!hasAlternativeSelected}>
                        Confirmar
                    </Button>
                    {isQuestionSubmited && isCorrect && <Success />}

                    {isQuestionSubmited && !isCorrect && <Error />}
                </AlternativesForm>
            </Widget.Content>
        </Widget>
    );
}
