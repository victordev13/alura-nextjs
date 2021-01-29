import React from 'react';

export default function QuizDaGaleraPage(props) {
    return <div>{JSON.stringify(props)}</div>;
}

//executando no servidor
export async function getServerSideProps(context) {
    const externDB = await fetch()
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
