/* eslint-disable react/prop-types */
import React from 'react';
import Widget from '../Widget';
import Button from '../Button';
import AlternativesForm from '../AlternativeForm';
import db from '../../../db.json';
import BackLinkArrow from '../BackLinkArrow';
import { motion } from 'framer-motion';

// eslint-disable-next-line object-curly-newline
function Success() {
  return (
    <motion.div
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '-100%' },
      }}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.2 }}
      style={{
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
      }}>
      <div
        style={{
          width: '30px',
          height: '30px',
          padding: '6px',
          borderRadius: '50px',
          backgroundColor: db.theme.colors.success,
          marginRight: '5px',
        }}>
        <img src="/check.png" />
      </div>
      <p>Parabéns, é isso mesmo!</p>
    </motion.div>
  );
}

function Error() {
  return (
    <motion.div
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '-100%' },
      }}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.2 }}
      style={{
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
      }}>
      <div
        style={{
          width: '30px',
          height: '30px',
          padding: '7px 7px',
          borderRadius: '50px',
          backgroundColor: db.theme.colors.wrong,
          marginRight: '5px',
        }}>
        <img src="/error.png" />
      </div>
      <p>Opa, foi quase!</p>
    </motion.div>
  );
}
export default function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  pushResult,
}) {
  const [selectedAlternative, setSelectedAlternative] =
    React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const hasAlternativeSelected = selectedAlternative !== undefined;
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative == question.answer;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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
            setDisabled(true);
            setIsQuestionSubmited(true);
            pushResult(isCorrect);
            setTimeout(() => {
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
              setDisabled(false);
            }, 1500);
          }}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            const correctAnswer =
              !isSelected && alternativeIndex === question.answer
                ? 'CORRECT'
                : '';

            return (
              <Widget.Topic
                as={motion.label}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-correct={isQuestionSubmited && correctAnswer}
                data-status={isQuestionSubmited && alternativeStatus}>
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  readOnly={disabled}
                  onClick={() => {
                    !disabled && setSelectedAlternative(alternativeIndex);
                  }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button
            as={motion.button}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <Success />}

          {isQuestionSubmited && !isCorrect && <Error />}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}
