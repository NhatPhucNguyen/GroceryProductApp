/* eslint-disable react/prop-types */
import styled from "styled-components";
import ModalLayout from "../../layout/ModalLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
    width: 30rem;
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    position: relative;
`;
const DeleteIcon = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    color: red;
    &:hover {
        cursor: pointer;
    }
`;

const Message = styled.span`
    width: 100%;
    display: block;
`;
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 1rem;
    margin-top: 1rem;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    outline: none;
    color: #ffffff;
    border-radius: 10px;
    font-size: 16px;
    &:hover {
        cursor: pointer;
    }
`;
const ConfirmButton = styled(Button)`
    background-color: #d82626;
`;
const CancelButton = styled(Button)`
    background-color: #cfd826;
`;
const DeleteConfirmation = ({ message, method, close }) => {
    return (
        <ModalLayout>
            <Container>
                <DeleteIcon
                    onClick={() => {
                        close();
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} size="xl" />
                </DeleteIcon>
                <Message>{message}</Message>
                <ButtonContainer>
                    <ConfirmButton
                        onClick={() => {
                            method();
                        }}
                    >
                        Delete
                    </ConfirmButton>
                    <CancelButton
                        onClick={() => {
                            close();
                        }}
                    >
                        Cancel
                    </CancelButton>
                </ButtonContainer>
            </Container>
        </ModalLayout>
    );
};

export default DeleteConfirmation;
