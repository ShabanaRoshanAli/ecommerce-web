import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
const ProductManage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/eshop/api/products')
        .then(res => {
          if (res.status == 200) {
            setProducts(res.data)
          }
        })
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    console.log('delete!!!', id);
    try {
      const response = await axios.delete(`http://localhost:4000/eshop/api/products/${id}`)
      if (response.status == 200) {
        console.log(response.data);
        fetchProducts()
      }
    } catch (error) {
      setErrorMessage(error.message)
      console.log(error.message);
    }
  }
  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} style={{marginTop: 30}}>
          <div>
            <h3>
              Products Details
            </h3>
            <Button className="float-end px-5 py-2 mb-3 bg-light text-dark shadow-lg"
              onClick={() => navigate('/addproduct')}>
              Add New Product
            </Button>
          </div>
        </Col>
        <Col lg={12} md={12} sm={12}>
          <Table responsive style={{ backgroundColor: '#FEF5E7' }}>
            <thead className="bg-secondary">
              <tr>
                <th className="fs-5 fw-bold py-2 text-white">Product Id</th>
                <th className="fs-5 fw-bold py-2 text-white">Product Name</th>
                <th className="fs-5 fw-bold py-2 text-white">Product Price</th>
                <th className="fs-5 fw-bold py-2 text-white">Product Brand</th>
                <th className="fs-5 fw-bold py-2 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                products && products.map((item, i) => (
                  <tr key={i}>
                    <td className="py-3">{item.id}</td>
                    <td className="py-3">{item.name}</td>
                    <td className="py-3">Rs.{item.price}</td>
                    <td className="py-3">{item.brand}</td>
                    <td  className="py-3 d-flex justify-content-around">
                      <Link className="nav-link"
                        to={`/updateProduct/${item.id}`}>
                        <FaPen />
                      </Link>
                      <span onClick={() => handleDelete(item.id)} >
                        <FaTrash />
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
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
        </Col>
      </Row>
    </Container>
  )
}

export default ProductManage