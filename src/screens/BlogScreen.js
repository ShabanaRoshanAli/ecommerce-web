import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaPen, FaTrash } from 'react-icons/fa';
const BlogScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const isAdmin = localStorage.getItem('isAdmin')
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/eshop/api/blogs/${id}`);
      setBlog(response.data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/eshop/api/blogs/${id}`)
      if (response.status == 200) {
        navigate('/blogs')
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <Container fluid className="bg-light">
      <Row>
        <Col lg={12} md={12} sm={12} className="text-center">
          {blog && (
            <div>
              <Image
                src={blog.image}
                style={{
                  width: "100vw",
                  height: "60vh"
                }}
                className="bg_one"
              />
            </div>
          )}
          {
            isAdmin == 'ADMIN_USER' ?
              <div lg={12} md={12} sm={12} className="mt-4">
                  <div className="blinking-text bg_one rounded-circle shadow d-flex justify-content-center align-items-center" style={{ width: 50, height: 50 }}>
                    <FaTrash onClick={() => handleDelete(blog.id)} />
                  </div>
              </div>
              :
              null
          }
          <div className="m-5 p-5 shadow">
            <div className="d-flex justify-content-around ">
              <h1>
                {blog?.title || ""}
              </h1>
              <h3>
                author: {blog?.author || ""}
              </h3>
            </div>
            <hr />
            <hr />
            <p className="fs-5 lh-lg">
              {blog?.content || ""}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogScreen;
