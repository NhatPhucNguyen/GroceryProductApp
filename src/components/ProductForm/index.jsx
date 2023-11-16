import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    margin-top: 2rem;
`;
const Form = styled.form`
    padding: 1rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: auto;
    width: 30rem;
    border: 1px solid #262626;
`;
const Input = styled.input`
    width: 100%;
    padding: 0.2rem;
`;
const CategorySelect = styled.select``;
const CategoryOption = styled.option``;
const Title = styled.h2`
    text-align: center;
`;
const Button = styled.button`
    margin: auto;
    padding: 0.5rem 2rem;
`;
const Navbar = () => {
    const [product, setProduct] = useState({
        upc: "",
        name: "",
        categoryId: 1,
        brand: "",
        price: 0,
        nutrionInfo: "",
        description: "",
        imageUrl: "",
        unit: "",
        quantity: 0,
        ingredientsList: [],
    });
    const handleOnchange = (e) => {
      if(e.target.name == 'ingredients'){        
        let ingredientsList = e.target.value.split(',');
        console.log(ingredientsList);
      }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Add Product</Title>
                <Input type="text" placeholder="Universal Product Code" name="upc" onChange={handleOnchange}/>
                <Input type="text" placeholder="Product name" name="name" onChange={handleOnchange}/>
                <CategorySelect name="categoryId">
                    <CategoryOption value={1}>Fresh Produce</CategoryOption>
                </CategorySelect>
                <Input type="text" placeholder="Brand" name="brand" onChange={handleOnchange}/>
                <Input type="number" placeholder="Price" name="price" onChange={handleOnchange}/>
                <Input type="text" placeholder="Nutrition Info" name="nutrionInfo" onChange={handleOnchange}/>
                <Input type="text" placeholder="Description" name="description" onChange={handleOnchange}/>
                <Input type="url" placeholder="Image url" name="imageUrl" onChange={handleOnchange}/>
                <Input type="text" placeholder="Unit" name="unit" onChange={handleOnchange}/>
                <Input type="number" placeholder="Quantity/Weight" name="quantity" onChange={handleOnchange}/>
                <Input type="text" placeholder="Ingredients" name="ingredients" onChange={handleOnchange}/>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default Navbar;
