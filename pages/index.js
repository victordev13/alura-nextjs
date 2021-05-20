import React from 'react';
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
import Link from '../src/components/Link';

export default function Home() {
    const router = useRouter();
    const [name, setName] = React.useState('');

    const handleSubmitName = (e) => {
        e.preventDefault();
        router.push(`/quiz?name=${name}`);

        savePlayerName(name);
    };

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
                    transition={{ delay: 0, duration: 0.5 }}
                >
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
                            <Button
                                as={motion.button}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={name.length === 0}
                            >
                                {` Jogar ${name}`}
                            </Button>
                        </form>
                    </Widget.Content>
                </Widget>

                <Widget
                    as={motion.section}
                    variants={{
                        show: { opacity: 1, y: '0' },
                        hidden: { opacity: 0, y: '100%' },
                    }}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {/* <Widget.Content>
                        <h1>Veja outros quizes</h1>
                        <ul>
                            {db.external.map((item, index) => {
                                const [projectName, gitHubUser] = item
                                    .replace(/\//g, '')
                                    .replace('https:', '')
                                    .replace('.vercel.app', '')
                                    .split('.');

                                return (
                                    <li key={index}>
                                        <Widget.Topic
                                            as={Link}
                                            href={`/quiz/${projectName}___${gitHubUser}`}
                                        >
                                            {`${gitHubUser}/${projectName}`}
                                        </Widget.Topic>
                                    </li>
                                );
                            })}
                        </ul>
                    </Widget.Content> */}
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

function savePlayerName(name) {
    localStorage.setItem('player', name);
}
