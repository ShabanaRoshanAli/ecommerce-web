import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDataContext } from '../../config/DataContext';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function AppCardOne() {
  const { dataFromCategoryCard } = useDataContext();
  const [products, setProducts] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()
  const fetchProducts = async () => {
    if (dataFromCategoryCard == null) {
      const response = await axios.get('http://localhost:4000/eshop/api/products');
      try {
        if (response.status == 200) {
          setProducts(response.data)
        } else {
          setErrorMessage('Error occurred!')
        }
      } catch (error) {
        setErrorMessage(error.message)
      }
    } else {
      const response = await axios.get(`http://localhost:4000/eshop/api/products/category/${dataFromCategoryCard}`);
      try {
        if (response.status == 200) {
          setProducts(response.data)
        } else {
          setErrorMessage('Error occurred!')
        }
      } catch (error) {
        setErrorMessage(error.message)
      }
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  useEffect(() => {
    fetchProducts()
  }, [dataFromCategoryCard])
  const handleClick = (item) => {
    navigate(`/product/${item.id}`)
  }
  return (
    <Container className='my-3' id="targetSection">
      <Row
        className='mx-5'>
        {products?.map((item) => {
          return <Col key={item.id} >
            <Card
              style={{
                width: '18rem',
                margin: '5px',
              }}>
              <Card.Img variant="top"
                src={item.image}
                onClick={() => handleClick(item)}
                style={{ height: '12rem',
                cursor: 'pointer' }} />
              <Card.Body style={{ backgroundColor: '#E0E0E0', height: '100px' }}>
                <Card.Text className='text-dark fw-bold'>
                  {item.name}
                </Card.Text>

                <Card.Text className='text-dark'>
                  {item.brand}
                </Card.Text>
                <div className="star heading ">
                  <p className="text-dark">
                    Rs.{item.price}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        })}
        {
          errorMessage &&
          (
            <Col>
              <h3>
                {errorMessage}
              </h3>
            </Col>
          )
        }
      </Row>
    </Container>
  );
}

export default AppCardOne;
