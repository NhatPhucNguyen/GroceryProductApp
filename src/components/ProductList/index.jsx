import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import { API } from "../../config/API";
const ProductListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const CenteredWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;
const ProductList = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        const getProducts = async () => {
            //HTTP GET Method to get all products
            const response = await fetch(API + '/products');
            if(response.ok){
                const data = await response.json();
                setProducts(data);
            }
        }
        getProducts();   
    },[])
    return (
        <CenteredWrapper>
            {products.length > 0 && <ProductListWrapper>
                {products.map((product) => (
                    <ProductCard key={product.upc} product={product} />
                ))}
            </ProductListWrapper>}
        </CenteredWrapper>
    );
};

export default ProductList;
