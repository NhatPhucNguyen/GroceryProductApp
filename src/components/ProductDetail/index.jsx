import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { API, APIKey } from "../../config/API";
import Loader from "../Loader";
import DeleteConfirmation from "../DeleteConfirmation";

const DetailContainer = styled.div`
    width: 60%;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem auto;
`;

const ImageContainer = styled.div`
    width: 40%;
    margin-right: 20px;
    img {
        width: 100%;
        height: 300px;
        object-fit: contain;
        border-radius: 8px;
    }
`;

const TextContainer = styled.div`
    flex-grow: 1;
    width: 55%;
    margin-right: 20px;
`;

const ImagesContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const SmallImage = styled.img`
    width: 100px;
    border-radius: 8px;
`;

const NutritionTable = styled.table`
    width: 100%;
    margin-top: 20px;

    th,
    td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }
`;

const EditButton = styled.button`
    padding: 10px;
    margin-right: 10px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2980b9;
    }
`;

const DeleteButton = styled.button`
    padding: 10px;
    background-color: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c0392b;
    }
`;
const PriceContainer = styled.div`
    margin-bottom: 8px;
    display: flex;
    gap: 1rem;
    align-items: center;
`;
const SaveChangeButton = styled.button`
    background-color: #d79608;
    border: none;
    padding: 0.2rem 1rem;
    color: #ffffff;
    &:hover {
        cursor: pointer;
        background-color: #daa83d;
    }
`;
const PriceInput = styled.input`
    font-size: inherit;
    padding: 0 0.2rem;
`;
const parseNutritionInfo = (nutritionInfoString) => {
    const nutrients = nutritionInfoString.split(",");

    const parsedNutritionInfo = nutrients.reduce((acc, nutrient) => {
        const [name, amount] = nutrient.split(" ");
        acc[name.trim()] = amount.trim();
        return acc;
    }, {});

    return parsedNutritionInfo;
};

const ProductDetail = () => {
    const { upc } = useParams();
    const [confirmation, setConfirmation] = useState({
        isShowModal: false,
        message: "",
        method: () => {},
    });
    const [isShowLoader, setIsShowLoader] = useState(false);
    const [product, setProduct] = useState(null);
    const priceInput = useRef(null);
    const [isPriceChange, setIsPriceChange] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        //HTTP GET method to get a single product
        const fetchProductDetails = async () => {
            setIsShowLoader(true);
            const response = await fetch(`${API}/products/${upc}`,{
                headers:{
                    "apikey":APIKey
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
                setIsShowLoader(false);
            }
        };

        fetchProductDetails();
    }, [upc]);

    const handlePriceChange = (e) => {
        if (e.target.value != product.price) {
            setIsPriceChange(true);
        } else {
            setIsPriceChange(false);
        }
    };

    const handleSaveChange = () => {
        const bodyPatch = [
            {
                operationType: 0,
                path: "/price",
                op: "replace",
                value: Number(priceInput.current.value),
            },
        ];
        const patchProductPrice = async () => {
            //HTTP PATCH method to update price field only
            const response = await fetch(API + `/products/${upc}`, {
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
        void patchProductPrice();
    };

    return (
        <>
            {product && (
                <DetailContainer>
                    <ImageContainer>
                        <img src={product.imageUrl} alt={product.name} />
                    </ImageContainer>
                    <TextContainer>
                        <h2 style={{ marginBottom: "8px" }}>{product.name}</h2>
                        <p style={{ marginBottom: "8px" }}>
                            Category: {product.category}
                        </p>
                        <p style={{ marginBottom: "8px" }}>
                            Brand: {product.brand}
                        </p>
                        <PriceContainer>
                            <p>
                                Price: $
                                <PriceInput
                                    ref={priceInput}
                                    type="number"
                                    defaultValue={product.price}
                                    onChange={handlePriceChange}
                                />
                            </p>
                            {isPriceChange && (
                                <SaveChangeButton onClick={handleSaveChange}>
                                    Save Change
                                </SaveChangeButton>
                            )}
                        </PriceContainer>
                        <p style={{ marginBottom: "8px" }}>
                            Quantity: {product.quantity}
                            {product.unit}
                        </p>
                        <p style={{ marginBottom: "8px" }}>
                            Ingredients: {product.ingredientsList.join(", ")}
                        </p>

                        <ImagesContainer>
                            <SmallImage src="https://midwestcommunity.org/wp-content/uploads/2018/02/Groceries-ThinkstockPhotos-836782690.jpg" />
                            <SmallImage src="https://149449856.v2.pressablecdn.com/wp-content/uploads/2017/06/everydollar-grocery-shopping-patterns.jpg" />
                            <SmallImage src="https://3.bp.blogspot.com/-DHahthxdEBM/WIBfow8BpwI/AAAAAAAAAxw/I6ImdmPOcLovfVEaQaqrQZxB_P8cNSmVgCLcB/s1600/online%2Bgrocery%2Bdelivery%2Bin%2BKerala.jpg" />
                        </ImagesContainer>

                        <NutritionTable>
                            <thead>
                                <tr>
                                    <th>Nutrient</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.nutritionInfo.length > 0 ? (
                                    Object.entries(
                                        parseNutritionInfo(
                                            product.nutritionInfo
                                        )
                                    ).map(([nutrient, amount]) => (
                                        <tr key={nutrient}>
                                            <td>
                                                {nutrient[0].toUpperCase() +
                                                    nutrient.slice(1)}
                                            </td>
                                            <td>{amount}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">
                                            No nutrition information available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </NutritionTable>

                        <div style={{ marginTop: "20px" }}>
                            <EditButton
                                onClick={() => {
                                    navigate(`/products/${upc}/update`);
                                }}
                            >
                                Edit
                            </EditButton>
                            <DeleteButton
                                onClick={() => {
                                    const deleteProduct = async () => {
                                        const response = await fetch(
                                            API + `/products/${upc}`,
                                            {
                                                method: "DELETE",
                                                headers:{
                                                    "apikey":APIKey
                                                }
                                            }
                                        );
                                        if (response.ok) {
                                            navigate("/");
                                        }
                                    };
                                    setConfirmation({
                                        isShowModal: true,
                                        message: `Are you sure to delete product ${product.name}`,
                                        method: deleteProduct,
                                    });
                                }}
                            >
                                Delete
                            </DeleteButton>
                        </div>
                    </TextContainer>
                </DetailContainer>
            )}
            {isShowLoader && <Loader />}
            {confirmation.isShowModal && (
                <DeleteConfirmation
                    message={confirmation.message}
                    method={confirmation.method}
                    close={() => {
                        setConfirmation({ isShowModal: false });
                    }}
                />
            )}
        </>
    );
};

export default ProductDetail;
