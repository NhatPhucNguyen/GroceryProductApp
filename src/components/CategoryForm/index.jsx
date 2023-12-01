/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { API,APIKey } from "../../config/API";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
    width: 30rem;
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 10px;
    position: relative;
`;
const Form = styled.form`
    padding: 1rem;
    width: 100%;
`;
const Title = styled.h2`
    text-align: center;
`;
const Input = styled.input`
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 14px;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: #eeeeee;
    margin-bottom: 1rem;
`;
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const Button = styled.button`
    padding: 0.5rem 1rem;
    background-color: #d99c0f;
    border: none;
    outline: none;
    color: #ffffff;
    border-radius: 10px;
    font-size: 16px;
    &:hover {
        cursor: pointer;
    }
`;
const IconContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    color: red;
    &:hover {
        cursor: pointer;
    }
`;
const CategoryForm = (props) => {
    const navigate = useNavigate();
    const [category, setCategory] = useState(
        props.category ? props.category : { name: "", description: "" }
    );
    const handleChange = (e) => {
        setCategory((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const addCategory = async () => {
        //HTTP POST method to add a new category
        const response = await fetch(API + "/categories", {
            method: "POST",
            body: JSON.stringify(category),
            headers: {
                "Content-Type": "application/json-patch+json",
                "apikey":APIKey
            },
        });
        if (response.ok) {
            navigate(0);
        }
    };

    const updateCategory = async (id) => {
        //HTTP PUT method to update a category
        const response = await fetch(API + `/categories/${id}`, {
            method: "PUT",
            body: JSON.stringify(category),
            headers: {
                "Content-Type": "application/json-patch+json",
                "apikey":APIKey
            },
        });
        if (response.ok) {
            navigate(0);
        }
    };

    const patchCategoryName = async (id, name) => {
        //HTTP PATCH method to update a category's name
        const bodyPatch = [{
            operationType: 0,
            path: "/name",
            op: "replace",
            value: name,
        }];
        const response = await fetch(API + `/categories/${id}`, {
            method: "PATCH",
            body: JSON.stringify(bodyPatch),
            headers: {
                "Content-Type": "application/json-patch+json",
                "apikey":APIKey
            },
        });
        if (response.ok) {
            navigate(0);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.category) {
            if (
                props.category.name != category.name &&
                props.category.description == category.description
            ) {
                patchCategoryName(props.category.categoryId, category.name);
            } else {
                updateCategory(props.category.categoryId);
            }
        } else {
            addCategory();
        }
    };

    return (
        <Container>
            <IconContainer
                onClick={() => {
                    props.close();
                }}
            >
                <FontAwesomeIcon icon={faXmark} size="xl" />
            </IconContainer>
            <Title>
                {props.category ? "Edit Category" : "Add New Category"}
            </Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    placeholder="Name"
                    value={category.name}
                    name="name"
                    onChange={handleChange}
                />
                <Input
                    placeholder="Description"
                    value={category.description}
                    name="description"
                    onChange={handleChange}
                />
                <ButtonContainer>
                    <Button type="submit">Submit</Button>
                </ButtonContainer>
            </Form>
        </Container>
    );
};

export default CategoryForm;
