import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
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
            const response = await fetch('https://localhost:7004/api/products');
            console.log(response);
            if(response.ok){
                const data = await response.json();
                setProducts(data);
            }
        }
        getProducts();   
    },[])
    return (
        <CenteredWrapper>
            <ProductListWrapper>
                {products.map((product) => (
                    <ProductCard key={product.upc} product={product} />
                ))}
            </ProductListWrapper>
        </CenteredWrapper>
    );
};

export default ProductList;
