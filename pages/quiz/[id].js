/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';
import Head from 'next/head';

export default function QuizDaGaleraPage({ externDB }) {
    return (
        <ThemeProvider theme={externDB.theme}>
            <Head>
                <title>{externDB.title}</title>
            </Head>
            <QuizScreen questions={externDB.questions} bg={externDB.bg} />
        </ThemeProvider>
    );
}

//executando no servidor
export async function getServerSideProps(context) {
    const [projectName, gitHubUser] = context.query.id.split('___');
    const externDB = await fetch(
        `https://${projectName}.${gitHubUser}.vercel.app/api/db`
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            throw new Error('Erro ao buscar os dados na API');
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
    return {
        props: { externDB },
    };
}

                    
                
                    
                
                    
                
                    
                