import { useEffect, useState } from "react";
import styled from "styled-components";
import { API, APIKey } from "../../config/API";

const SelectContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 1rem;
    align-items: center;
`;
const Label = styled.span``;
const Select = styled.select`
    padding: 0.5rem 2rem;
    font-size: 16px;
`;
const Option = styled.option``;

// eslint-disable-next-line react/prop-types
const CategorySelect = ({ categoryFilter, setSearchParams }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getAllCategories = async () => {
            const response = await fetch(API + "/categories",{
                headers:{
                    "apikey":APIKey
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        };
        void getAllCategories();
    }, []);
    return (
        <SelectContainer>
            <Label>Filter:</Label>
            {categories.length > 0 && (
                <Select
                    onChange={(e) => {
                        if (e.target.value > 0) {
                            setSearchParams({ category: e.target.value });
                        } else {
                            setSearchParams({});
                        }
                    }}
                    defaultValue={categoryFilter}
                >
                    <Option value={0} selected={categoryFilter == null}>
                        All
                    </Option>
                    {categories.map((category) => {
                        return (
                            <Option
                                key={category.categoryId}
                                value={category.categoryId}
                            >
                                {category.name}
                            </Option>
                        );
                    })}
                </Select>
            )}
        </SelectContainer>
    );
};

export default CategorySelect;
