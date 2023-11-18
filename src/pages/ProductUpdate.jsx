import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../config/API";
const Container = styled.div``;
const ProductUpdate = () => {
    const {upc} = useParams();
    const [product, setProduct] = useState();
    useEffect(() => {
        const getSindProduct = async () => {
            const response = await fetch(API + `/products/${upc}`);
            if(response.ok){
                const data = await response.json();
                setProduct(data);
            }
        };
        void getSindProduct();
    }, []);
    return (
        <>
            <Navbar />
            <Container>                
                {product && <ProductForm product={product}/>}
            </Container>
        </>
    );
};

export default ProductUpdate;
