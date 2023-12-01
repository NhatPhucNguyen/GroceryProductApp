/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  background-color: #fff;
  transition: transform 0.3s;
  padding: 1rem;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%; 
  height: 150px;
  object-fit: contain; 
`;

const Title = styled.h3`
  margin: 10px 0;
  color: #333;
`;

const Price = styled.p`
  color: #333;
`;

const ProductCard = ({ product }) => {
  return (
    <Card>      
      <Link to={`/products/${product.upc}`}>
        <Image src={product.imageUrl} alt={product.name} />
        <Title>{product.name}</Title>
      </Link>
      <Price>${product.price}</Price>
    </Card>
  );
};

export default ProductCard;
