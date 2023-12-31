/* eslint-disable react/prop-types */
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: rgb(55, 54, 54, 0.4);
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
`;
const ModalLayout = ({ children }) => {
    return <Container>{children}</Container>;
};

export default ModalLayout;
