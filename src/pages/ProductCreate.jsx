import styled from "styled-components";
import ProductForm from "../components/ProductForm";
import Navbar from "../components/Navbar";
const Container = styled.div``;

const ProductCreate = () => {
    return (
        <>
            <Navbar />
            <Container>
                <ProductForm />
            </Container>
        </>
    );
};

export default ProductCreate;
