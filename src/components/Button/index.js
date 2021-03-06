import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.contrastText};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 0;
    width: 100%;
    padding: 12px 16px;
    font-weight: bold;
    font-size: 14px;
    line-height: 1;
    text-transform: uppercase;
    outline: 0;
    transition: 0.3s;
    cursor: pointer;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
    &:hover,
    &:focus {
        opacity: 0.7;
    }
    &:disabled {
        background-color: #979797;
        cursor: not-allowed;
    }
`;

Button.propTypes = {
    type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
    children: PropTypes.node.isRequired,
};

export default Button;
