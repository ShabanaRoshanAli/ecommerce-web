import { Spinner, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const BlogsScreen = () => {

  const navigate = useNavigate();
  const [blogsList, setBlogsList] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(true)
const isAdmin = localStorage.getItem('isAdmin')
  const fetchBlogList = async () => {
    try {
      await axios.get('http://localhost:4000/eshop/api/blogs')
        .then((res) => {
          setBlogsList(res.data);
        })
        .catch((err) => {
          setErrorMessage(err.message)
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchBlogList();
  }, [])
  return (
    <>
      <Header />
      <Container fluid className="bg-light">
        {
          loading ? (
            <div className="text-center mt-5" >
              <Spinner animation="border" role="status">
                <span className="sr-only"></span>
              </Spinner>
            </div >
          )
            : (
              <>
                <Row className="m-5">
                  { 
                  isAdmin == 'ADMIN_USER' ?
                  <Col lg={12} md={12} sm={12}>
                    <div className="blinking-text bg_one rounded-circle shadow d-flex justify-content-center align-items-center" style={{width: 50, height:50}}>
                    <FaPlus  onClick={() => navigate('/addBlog')} />
                    </div>
                  </Col>
                  :
                  null
                  }
                  
                  {blogsList && blogsList.map((blog, i) => (
                    <Col lg={4} md={4} sm={12} key={i}>
                      <div className="card w-100 m-5 shadow-lg"
                        onClick={() => navigate(`/blog/${blog.id}`)}>
                        <img className="card-img"
                          style={{ height: '400px' }}
                          src={blog.image} />
                        <div className="card-body">
                          <h5 className="card-title">
                            {blog.title}
                          </h5>
                          <p className="card-text">
                            Last updated on {new Date(blog.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
                <Footer />
              </>
            )
        }

      </Container>
    </>
  )
}

export default BlogsScreen