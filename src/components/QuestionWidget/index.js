/* eslint-disable react/prop-types */
import React from 'react';
import Widget from '../Widget';
import Button from '../Button';

// eslint-disable-next-line object-curly-newline
export default function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
    console.log(question.image)
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

              <form
                  onSubmit={(infosDoEvento) => {
                      infosDoEvento.preventDefault();
                      onSubmit();
                  }}>
                  {question.alternatives.map(
                      (alternative, alternativeIndex) => {
                          const alternativeId = `alternative__${alternativeIndex}`;
                          return (
                              <Widget.Topic
                                  as="label"
                                  htmlFor={alternativeId}
                                  key={alternativeId}>
                                  <input
                                      style={{ display: 'none' }}
                                      id={alternativeId}
                                      name={questionId}
                                      type="radio"
                                  />
                                  {alternative}
                              </Widget.Topic>
                          );
                      }
                  )}

                  <Button type="submit">Confirmar</Button>
              </form>
          </Widget.Content>
          <p style={{  textAlign: 'center'  }}>por Victor Carvalho</p>
      </Widget>
  );
}
