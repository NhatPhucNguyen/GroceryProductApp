/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API } from "../../config/API";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    padding: 2rem;
    background-color: #dfd6c1;
`;
const Form = styled.form`
    padding: 1rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: auto;
    width: 40rem;
    background-color: #a1ba58;
    border-radius: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const NutritionInfoWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 60% auto auto;
    gap: 1rem 0.5rem;
`;
const NutritionInputForm = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    width: 100%;
    gap: 1rem;
`;
const Input = styled.input`
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 14px;
    outline: none;
    border: none;
    border-radius: 10px;
`;
const Select = styled.select`
    width: 100%;
    padding: 0.4rem 0.5rem;
    font-size: 14px;
    outline: none;
    border: none;
    border-radius: 10px;
`;
const Option = styled.option``;
const Title = styled.h2`
    text-align: center;
`;
const Button = styled.button`
    margin: auto;
    padding: 0.5rem 2rem;
    border: none;
    border-radius: 15px;
    background-color: #d99c0f;
    color: #ffffff;
    font-size: 16px;
    &:hover {
        cursor: pointer;
    }
`;
const ToggleButton = styled.button`
    margin: auto;
    padding: 0.5rem 2rem;
    border: none;
    border-radius: 15px;
    background-color: #be1a62;
    color: #ffffff;
    font-size: 14px;
    &:hover {
        cursor: pointer;
    }
`;
const AddButton = styled(ToggleButton)`
    background-color: #d99c0f;
`;
const ProductForm = (props) => {
    const navigate = useNavigate();
    const [categories,setCategories] = useState([{
        categoryId:1,
        name:"",
        description:""
    }]);
    const [nutrition, setNutrition] = useState({
        nutritionName: "",
        nutritionQuantity: 0,
        nutritionUnit: "g",
    });
    const [isShowNutrition, setIsShowNutrition] = useState(false);
    const [product, setProduct] = useState(
        props.product
            ? props.product
            : {
                  upc: "",
                  name: "",
                  categoryId: 1,
                  brand: "",
                  price: 0,
                  nutritionInfo: "",
                  description: "",
                  imageUrl: "",
                  unit: "",
                  quantity: 0,
                  ingredientsList: [],
              }
    );
    
    useEffect(()=>{
        //HTTP GET Method to get all categories
        const getCategories = async () => {
            const response = await fetch(API + "/categories/");
            if(response.ok){
                const data = await response.json();
                setCategories(data);
            }
            else{
                console.log(response);
            }
        }
        void getCategories();
    },[]);

    const handleOnchange = (e) => {
        if (e.target.name == "ingredientsList") {
            let ingredients = e.target.value.split(",");
            setProduct((prev) => {
                return { ...prev, ingredientsList: ingredients };
            });
        } else if (e.target.name == "quantity") {
            setProduct((prev) => {
                return { ...prev, quantity: Math.round(e.target.value) };
            });
        } else {
            setProduct((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
            });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const addProduct = async () => {
            //HTTP POST Method to add a new product
            const response = await fetch(API + "/products", {
                body: JSON.stringify(product),
                method: "POST",
                headers: {
                    "Content-Type": "application/json-patch+json",
                },
            });
            if (response.status == 201) {
                navigate("/");
            } else {
                console.log(response);
            }
        };

        const updateProduct = async () => {
            //HTTP PUT method to update a product
            console.log(product);
            const response = await fetch(API + `/products/${product.upc}`, {
                method: "PUT",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json-patch+json",
                },
            });
            if (response.status == 200) {
                navigate(`/products/${product.upc}`);
            } else {
                console.log(response);
            }
        };
        if (props.product) {
            void updateProduct();
        } else {
            void addProduct();
        }
    };
    const nutritionHandleChange = (e) => {
        setNutrition((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>{props.product ? "Update" : "Add"} Product</Title>
                <Input
                    type="text"
                    placeholder="Universal Product Code"
                    value={product.upc}
                    name="upc"
                    onChange={handleOnchange}
                    disabled={props.product ? true : false}
                />
                <Input
                    type="text"
                    placeholder="Product name"
                    name="name"
                    value={product.name}
                    onChange={handleOnchange}
                />
                <Select
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleOnchange}
                >
                    {categories.map((category)=>{
                        return <Option value={category.categoryId} key={category.categoryId}>{category.name}</Option>
                    })}
                </Select>
                <Input
                    type="text"
                    placeholder="Brand"
                    name="brand"
                    value={product.brand}
                    onChange={handleOnchange}
                />
                <Input
                    type="number"
                    placeholder="Price (CAD)"
                    name="price"
                    value={product.price > 0 ? product.price : ""}
                    onChange={handleOnchange}
                />
                <NutritionInfoWrapper>
                    <Input
                        type="text"
                        placeholder="Nutrition Info"
                        name="nutritionInfo"
                        value={product.nutritionInfo}
                        onChange={handleOnchange}
                        readOnly
                    />
                    <ToggleButton
                        type="button"
                        onClick={() => {
                            setIsShowNutrition(!isShowNutrition);
                        }}
                    >
                        {isShowNutrition ? "Close" : "Add"}
                    </ToggleButton>
                    <ToggleButton
                        type="button"
                        onClick={() => {
                            setProduct((prev) => {
                                return { ...prev, nutritionInfo: "" };
                            });
                        }}
                    >
                        Clear
                    </ToggleButton>
                    {isShowNutrition && (
                        <>
                            <NutritionInputForm>
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    name="nutritionName"
                                    onChange={nutritionHandleChange}
                                    value={nutrition.nutritionName}
                                />
                                <Input
                                    type="number"
                                    placeholder="Quantity"
                                    name="nutritionQuantity"
                                    onChange={nutritionHandleChange}
                                    value={nutrition.nutritionQuantity}
                                />
                                <Select
                                    type="unit"
                                    placeholder="Unit"
                                    name="nutritionUnit"
                                    onChange={nutritionHandleChange}
                                    value={nutrition.nutritionUnit}
                                >
                                    <Option value={"g"}>g</Option>
                                    <Option value={"mg"}>mg</Option>
                                    <Option value={"kcal"}>kcal</Option>
                                </Select>
                            </NutritionInputForm>
                            <AddButton
                                type="button"
                                onClick={() => {
                                    setProduct((prev) => {
                                        let nutritionString = "";
                                        if (
                                            prev.nutritionInfo.slice(-1) ==
                                                "," ||
                                            prev.nutritionInfo.length == 0
                                        ) {
                                            nutritionString = `${
                                                nutrition.nutritionName
                                            } ${
                                                nutrition.nutritionQuantity +
                                                nutrition.nutritionUnit
                                            }`;
                                        } else {
                                            nutritionString = `,${
                                                nutrition.nutritionName
                                            } ${
                                                nutrition.nutritionQuantity +
                                                nutrition.nutritionUnit
                                            }`;
                                        }
                                        return {
                                            ...prev,
                                            nutritionInfo:
                                                prev.nutritionInfo +
                                                nutritionString,
                                        };
                                    });
                                    setIsShowNutrition(!isShowNutrition);
                                }}
                            >
                                Add
                            </AddButton>
                        </>
                    )}
                </NutritionInfoWrapper>

                <Input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={product.description}
                    onChange={handleOnchange}
                />
                <Input
                    type="url"
                    placeholder="Image Url"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleOnchange}
                />
                <Input
                    type="text"
                    placeholder="Unit Measure"
                    name="unit"
                    value={product.unit}
                    onChange={handleOnchange}
                />
                <Input
                    type="number"
                    placeholder="Quantity/Weight"
                    name="quantity"
                    value={product.quantity > 0 ? product.quantity : ""}
                    onChange={handleOnchange}
                />
                <Input
                    type="text"
                    placeholder="Ingredients"
                    name="ingredientsList"
                    value={product.ingredientsList}
                    onChange={handleOnchange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default ProductForm;
