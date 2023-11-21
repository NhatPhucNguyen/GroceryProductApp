import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DetailContainer = styled.div`
  width: 60%;
  margin: auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20vh; /* Adjust the percentage based on your preference */

  h2 {
    color: #333;
  }

  p {
    color: #555;
    margin-bottom: 10px;
  }
`;

const ProductDetail = () => {
  const { upc } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(`https://localhost:7004/api/products/${upc}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    };

    fetchProductDetails();
  }, [upc]);

  if (!product) {
    return <div>Loading...</div>; 
  }

  return (
    <DetailContainer>
      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Brand: {product.brand}</p>
      <p>Price: ${product.price}</p>
      <p>Nutrition Info: {product.nutrionInfo}</p>
      <p>Unit: {product.unit}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Ingredients: {product.ingredientsList.join(', ')}</p>
    </DetailContainer>
  );
};

export default ProductDetail;
