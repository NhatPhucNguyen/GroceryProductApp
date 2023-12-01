/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import { API, APIKey } from "../../config/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import CategorySelect from "./CategorySelect";
const ProductListWrapper = styled.div`
    /* display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-bottom: 20px; */
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    gap: 1rem;
    justify-content: center;
    padding: 1rem 0.5rem;
`;

const CenteredWrapper = styled.div`
    width: 100%;
`;
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 1rem;
    margin-left: 1rem;
`;
const AddProductButton = styled.button`
    padding: 0.5rem 2rem;
    border: none;
    background-color: #1bbc1b;
    color: #ffffff;
    font-size: 18px;    
    transition: 0.3s ease-in-out;
    border-radius: 10px;
    &:hover {
        cursor: pointer;
        scale: 1.05;
    }
`;
const ProductList = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [isShowLoader, setIsShowLoader] = useState(false);

    const categoryFilter = searchParams.get("category");
    useEffect(() => {
        const getProducts = async () => {
            setIsShowLoader(true);
            //HTTP GET Method to get all products
            const response = await fetch(API + "/products",{
                headers:{
                    "apikey":APIKey
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                setIsShowLoader(false);
            }
        };
        getProducts();
    }, []);

    const displayedProducts = categoryFilter
        ? products.filter((product) => product.categoryId == categoryFilter)
        : products;
    return (
        <CenteredWrapper>
            <ButtonContainer>
                <AddProductButton
                    onClick={() => {
                        navigate("/products/add");
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} size="xl" /> Add Product
                </AddProductButton>
                <CategorySelect categoryFilter={categoryFilter} setSearchParams={setSearchParams}/>
            </ButtonContainer>
            {products.length > 0 && (
                <ProductListWrapper>
                    {displayedProducts.map((product) => (
                        <ProductCard key={product.upc} product={product} />
                    ))}
                </ProductListWrapper>
            )}
            {isShowLoader && <Loader />}
        </CenteredWrapper>
    );
};

export default ProductList;
