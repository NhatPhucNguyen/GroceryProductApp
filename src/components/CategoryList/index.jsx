/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API, APIKey } from "../../config/API";
import ModalLayout from "../../layout/ModalLayout";
import CategoryForm from "../CategoryForm";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import DeleteConfirmation from "../DeleteConfirmation";

const Container = styled.div`
    padding: 2rem;
    background-color: #ffffff;
    width: fit-content;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const Table = styled.table`
    width: 50rem;
    margin: auto;
    border-collapse: collapse;
    margin-top: 1rem;
    background-color: #ffffff;
`;
const TableHead = styled.thead``;
const TableBody = styled.tbody``;
const Row = styled.tr`
    text-align: left;
    background-color: #efefef;
    &:nth-child(even) {
        background-color: #bde2bd;
    }
`;
const Head = styled.th`
    padding: 8px;
    min-width: 7rem;
    background-color: #6dd76d;
`;
const Data = styled.td`
    padding: 8px;
    font-size: 14px;
    font-weight: 400;
    border: none;
`;
const Title = styled.h2`
    text-align: center;
`;
const Button = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;
const ButtonContainer = styled(Data)`
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
    border: none;
`;
const DeleteButton = styled(Button)`
    background-color: #f32b2b;
    color: #ffffff;
`;
const EditButton = styled(Button)`
    background-color: #585899;
    color: #ffffff;
`;
const AddButton = styled(Button)`
    background-color: #1bbc1b;
    color: #ffffff;
`;
const AddButtonWrapper = styled.div`
    width: 100%;
`;
const CategoryLink = styled(Link)``;
const CategoryList = () => {
    const navigate = useNavigate();
    const [isShowLoader, setShowLoader] = useState(false);
    const [showModal, setShowModal] = useState({
        isShow: false,
        category: { name: "", description: "" },
    });
    const [confirmation, setConfirmation] = useState({
        isShowModal: false,
        method: () => {},
        message: "",
    });
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        //HTTP Get method to get all categories
        const getCategories = async () => {
            setShowLoader(true);
            const response = await fetch(API + "/categories", {
                headers: {
                    apikey: APIKey,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
                setShowLoader(false);
            }
        };
        void getCategories();
    }, []);

    const closeModal = () => {
        setShowModal((prev) => {
            return { ...prev, isShow: false };
        });
    };
    return (
        <>
            <Container>
                <Title>Category List</Title>
                <AddButtonWrapper>
                    <AddButton
                        onClick={() => {
                            setShowModal({ isShow: true, category: "" });
                        }}
                    >
                        Add new category
                    </AddButton>
                </AddButtonWrapper>
                <Table>
                    <TableHead>
                        <Row>
                            <Head>Category ID</Head>
                            <Head>Name</Head>
                            <Head>Description</Head>
                        </Row>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => {
                            return (
                                <Row key={category.categoryId}>
                                    <Data>{category.categoryId}</Data>
                                    <Data>
                                        <CategoryLink
                                            to={`/?category=${category.categoryId}`}
                                        >
                                            {category.name}
                                        </CategoryLink>
                                    </Data>
                                    <Data>{category.description}</Data>
                                    <ButtonContainer>
                                        <EditButton
                                            onClick={() => {
                                                const getSingleCategory =
                                                    async () => {
                                                        //HTTP Get method to get a category
                                                        const response =
                                                            await fetch(
                                                                API +
                                                                    `/categories/${category.categoryId}`,
                                                                {
                                                                    headers: {
                                                                        "apikey":APIKey
                                                                    },
                                                                }
                                                            );
                                                        if (response.ok) {
                                                            const data =
                                                                await response.json();
                                                            setShowModal({
                                                                isShow: true,
                                                                category: data,
                                                            });
                                                        } else {
                                                            console.log(
                                                                response
                                                            );
                                                        }
                                                    };
                                                void getSingleCategory();
                                            }}
                                        >
                                            Edit
                                        </EditButton>
                                        <DeleteButton
                                            onClick={() => {
                                                const deleteCategory =
                                                    async () => {
                                                        const response =
                                                            await fetch(
                                                                API +
                                                                    `/categories/${category.categoryId}`,
                                                                {
                                                                    method: "DELETE",
                                                                    headers:{
                                                                        "apikey":APIKey
                                                                    }
                                                                }
                                                            );
                                                        if (response.ok) {
                                                            navigate(0);
                                                        }
                                                    };
                                                setConfirmation({
                                                    isShowModal: true,
                                                    method: deleteCategory,
                                                    message: `Are you sure to delete category ${category.name}`,
                                                });
                                            }}
                                        >
                                            Delete
                                        </DeleteButton>
                                    </ButtonContainer>
                                </Row>
                            );
                        })}
                    </TableBody>
                </Table>
            </Container>
            {showModal.isShow && (
                <ModalLayout
                    children={
                        <CategoryForm
                            close={closeModal}
                            category={showModal.category}
                        />
                    }
                />
            )}
            {isShowLoader && <Loader />}
            {confirmation.isShowModal && (
                <DeleteConfirmation
                    message={confirmation.message}
                    method={confirmation.method}
                    close={() => {
                        setConfirmation({ isShowModal: false });
                    }}
                />
            )}
        </>
    );
};

export default CategoryList;
