import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Table, Form }
  from 'react-bootstrap';
import { Link, useNavigate }
  from 'react-router-dom';
import { FaEye } from "react-icons/fa";


const OrderManage = () => {
  const [orderList, setOrderList] = useState(null);
  const [userList, setUserList] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [deleteStatus, setDeleteStatus] = useState(null)
  const [totalProductsCount, setTotalProductsCount] = useState(null);
  const [totalFeaturedProductsCount, setTotalFeaturedProductsCount] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);

  const navigate = useNavigate()
  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:4000/eshop/api/orders')
    try {
      if (response.status == 200) {
        setOrderList(response.data)
      }
    } catch (error) {
      setErrorMessage(error.message)
      console.log(errorMessage);
    }
  }
  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:4000/eshop/api/users')
      if (response.status) {
        setUserList(response.data)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  const totalProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/eshop/api/products/get/count')
      if (response.status == 200) {
        setTotalProductsCount(response.data.productCount)

      }
    } catch (error) {
      console.log('error', error.message);
    }
  }
  const totalFeaturedProduct = async () => {
    try {
      const response = await axios.get('http://localhost:4000/eshop/api/products/get/featured/:count')
      if (response.status == 200) {
        setTotalFeaturedProductsCount(response.data.featuredProduct);
      }
    } catch (error) {
      console.log('error', error.message);
    }
  }
  const totalOrder = async () => {
    try {
      const response = await axios.get('http://localhost:4000/eshop/api/orders/get/count')
      if (response.status == 200) {
        setTotalOrders(response.data.orderCount);
      }
    } catch (error) {
      console.log('error', error.message);
      setErrorMessage(error.message)
    }
  }
  const handleOnchange = async (e, orderId) => {
    setDeleteStatus([
      {
        status: e.target.value,
        order_id: orderId
      }])
    try {
      const updatedStatus = e.target.value;
      const response = await axios.put(`http://localhost:4000/eshop/api/orders/${orderId}`, {
        status: updatedStatus,
      });
      if (response.status === 200) {
        setOrderList((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: updatedStatus } : order
          ));
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const orderDeleted = () => {
    if (deleteStatus && Array.isArray(deleteStatus)) {
      deleteStatus.map(async e => {
        if (e.status == 'Delivered') {
          try {
            const response = await axios.delete(`http://localhost:4000/eshop/api/orders/${e.order_id}`)
              .then(res => {
                console.log(res.data);
                fetchOrders()
                navigate(0)
              }).catch(err => {
                console.log(err.message);
              })
          } catch (error) {
            console.log(error.message);
          }

        }
      });
    }
  }
  useEffect(() => {
    fetchOrders()
    fetchUser()
    totalProducts()
    totalFeaturedProduct()
    totalOrder()
  }, [])
  useEffect(() => {
    orderDeleted()
  }, [deleteStatus])
  return (
    <Container className='p-2'>
      <Row>
        <Col lg={4} md={4} sm={12} className='mb-5 mt-5'>
          <div className='w-100 rounded d-flex justify-content-center align-items-center shadow'
            style={{ height: '100px' }}>
            <Link to='/productmanagement' className='nav-link'>
              <h4 className='text-center'>
                Total Products<br />
                {totalProductsCount || ''}
              </h4>
            </Link>
          </div>
        </Col>
        <Col lg={4} md={4} sm={12} className='mb-5 mt-5'>
          <div className='w-100 rounded d-flex justify-content-center align-items-center  shadow'
            style={{ height: '100px' }} >
            <h4 className='text-center'>
              Total Featured Products<br />
              {totalFeaturedProductsCount}
            </h4>
          </div>
        </Col>
        <Col lg={4} md={4} sm={12} className='mb-5 mt-5'>
          <div className='w-100 rounded d-flex justify-content-center align-items-center shadow'
            style={{ height: '100px' }}>
            <h4 className='text-center'>
              Total Orders<br />
              {totalOrders || ''}
            </h4>
          </div>
        </Col>
        <Col lg={4} md={4} sm={12}>
          <h2 className=''>
            User
          </h2>
          <Table responsive>
            <thead className='bg-secondary'>
              <tr>
                <th className="fs-5 fw-bold py-2 text-white">
                  Customer</th>
                <th className="fs-5 fw-bold py-2 text-white">
                  Email</th>
                <th className="fs-5 fw-bold py-2 text-white">
                  Phone</th>
                <th className="fs-5 fw-bold py-2 text-white">
                  Address
                </th>
                <th className="fs-5 fw-bold py-2 text-white">
                  Zip
                </th>
              </tr>
            </thead>
            <tbody>
              {
                userList &&
                userList.map((user, i) => (
                  <tr className=' mx-3 p-3' key={user.id}>
                    <td className="py-3">
                      {user.id}
                    </td>
                    <td className='py-3'>
                      {user.email}
                    </td>
                    <td className='py-3'>
                      {user.phone}
                    </td>
                    <td className='py-3'>
                      {user.apartment} {user.street} {user.city} {user.country}

                    </td>
                    <td className="py-3">
                      {user.zip}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
        <Col lg={8} md={8} sm={12}>
          <h2 className='mx-2'>
            Order Management
          </h2>
          <Table responsive style={{ backgroundColor: '#FEF5E7' }}>
            <thead className='bg-secondary'>
              <tr>
                <th className="fs-5 fw-bold py-2 text-white">
                  Customer</th>
                <th className="fs-5 fw-bold py-2 text-white">
                  Product</th>
                <th className="fs-5 fw-bold py-2 text-white">
                  Status</th>
                <th className="fs-5 fw-bold py-2 text-white">
                  Price</th>
              </tr>
            </thead>
            <tbody>
              {
                orderList &&
                orderList.map((order, i) => (
                  <tr className=' mx-3 p-3' key={order.id}>
                    <td className="py-3">
                      {order.user._id}
                    </td>
                    <td className='py-3'>
                      {order.orderItems.map((item, j) => (
                        <span key={j} className=''>
                          <b> Product</b> {item.product}<br />
                          <b> Quantity </b> {item.quantity}
                        </span>
                      ))}
                    </td>
                    <td className="py-3">
                      {order.totalPrice}
                    </td>
                    <td className="py-3">
                      <Form.Select value={selectedStatus}
                        onChange={(e) => handleOnchange(e, order.id)}
                        aria-label="Default select example">
                        <option>{order.status}</option>
                        <option value="Confirmed">
                          Confirmed
                        </option>
                        <option value="Shipped">
                          Shipped
                        </option>
                        <option value="Delivered">
                          Delivered
                        </option>
                      </Form.Select>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderManage