import styled from 'styled-components';

const Widget = styled.div`
    margin-top: 24px;
    margin-bottom: 24px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.mainBg};
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
    h1,
    h2,
    h3 {
        font-size: 16px;
        font-weight: 700;
        line-height: 1;
        margin-bottom: 0;
    }
    p {
        font-size: 14px;
        font-weight: 400;
        line-height: 1;
    }
`;

Widget.Header = styled.header`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 18px 32px;
    background-color: ${({ theme }) => theme.colors.primary};

    * {
        margin: 0;
    }
`;

Widget.Content = styled.div`
    padding: 24px 32px 32px 32px;
    & > *:first-child {
        margin-top: 0;
    }
    & > *:last-child {
        margin-bottom: 0;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    &::after {
        margin-left: 30%;
        display: flex;
        margin-top: 30px;
        margin-bottom: -10px;
        font-size: 8pt;
        content: 'por Victor Carvalho';
    }
`;

Widget.Topic = styled.a`
    outline: 0;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.contrastText};
    background-color: ${({ theme }) => `${theme.colors.primary}40`};
    padding: 10px 15px;
    margin-bottom: 8px;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius};
    transition: 0.3s;
    display: block;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => `${theme.colors.primary}70`};
    }
`;

export default Widget;
