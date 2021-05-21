import React, { useState } from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import { motion } from 'framer-motion';
import api from '../src/utils/api';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmitName = (e) => {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);

    savePlayerName(name);
  };

  async function savePlayerName(name) {
    const response = await api.post('/player/register', {
      player: name,
      score: 0,
    });

    if (response.status !== 200) {
      setError(response.data.message);
    }
    localStorage.setItem('player', name);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
          transition={{ delay: 0, duration: 0.5 }}>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={handleSubmitName}>
              <Input
                placeholder="Seu nome"
                name="NomeDoJogador"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength="10"
                autoComplete="off"
              />
              {error && (
                <p style={{ color: 'yellow', fontWeight: 600 }}>{error}</p>
              )}
              <Button
                as={motion.button}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={name.length === 0}>
                {` Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.section}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/victordev13/alura-nextjs" />
    </QuizBackground>
  );
}
