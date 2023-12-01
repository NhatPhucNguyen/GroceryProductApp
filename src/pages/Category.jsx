import styled from "styled-components";
import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";

const Container = styled.div`
    width: 100%;
    padding: 2rem 0;
`;

const Category = () => {
    return (
        <>
            <Navbar />
            <Container>
                <CategoryList />
            </Container>
        </>
    );
};

export default Category;
