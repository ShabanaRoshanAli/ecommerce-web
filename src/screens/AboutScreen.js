import { Col, Container, Row, Image } from "react-bootstrap"

const AboutScreen = () => {
  const aboutArr = [
    {
      title: 'About us',
      content: 'Welcome to shopping-online, your one-stop destination for all your shopping needs. We are delighted to introduce ourselves as a leading online retailer committed to providing you with a seamless and enjoyable shopping experience.',
      image: ''
    },
    {
      title: 'Our Story',
      content: 'At Shopping-online, our mission is clear: to offer a wide range of high-quality products at competitive prices. We are dedicated to bringing you the latest trends, innovative technology, and trusted brands right to your doorstep. We aim to empower our customers by providing them with choices that suit their lifestyles and preferences.',
      image: ''
    },
    {
      title: 'Our Mission',
      content: 'Welcome to shopping-online, your one-stop destination for all your shopping needs. We are delighted to introduce ourselves as a leading online retailer committed to providing you with a seamless and enjoyable shopping experience.',
      image: ''
    },
    {
      title: 'Join Us on this Journey',
      content: 'We invite you to explore our wide selection of products, from fashion and electronics to home essentials and beyond. Whether you are shopping for yourself or looking for the perfect gift, Shopping-online is here to make your shopping experience enjoyable and convenient.'
    }
  ]
  return (
    <Container fluid style={{ backgroundColor: '#FEF5E7' }}>
      <Row className="p-5">
        <Col lg={12} md={12} sm={12} className="my-3 shadow bg-light">
          <div className="d-flex flex-row">
            <div className="w-50 bg-two">
              <Image src="../images/about.jpg" alt='about' />
            </div>
            <div className="w-50 m-auto p-5 lh-lg">
              <h3> About us</h3>
              <hr />
              <p className="fs-5">
                Welcome to <span className="heading">Shopping-Online</span> , your one-stop
                destination for all your shopping needs. We are
                delighted to introduce ourselves as a leading online
                retailer committed to providing you with a seamless
                and enjoyable shopping experience.
              </p>
            </div>
          </div>
        </Col>
        <Col lg={12} md={12} sm={12} className="my-3 shadow bg-light">
          <div className="d-flex flex-row">
            <div className="w-50 m-auto p-5 lh-lg">
              <h3>Our Story</h3>
              <hr />
              <p className="fs-5">
                At<span className="heading"> Shopping-online</span>, our
                mission is clear: to offer a wide range of high-quality
                products at competitive prices. We are dedicated to
                bringing you the latest trends, innovative technology,
                and trusted brands right to your doorstep. We aim to
                empower our customers by providing them with choices
                that suit their lifestyles and preferences.
              </p>
            </div>
            <div className="w-50 bg-two">
              <Image
                src="../images/story.png" alt='about' />
            </div>
          </div>
        </Col>
        <Col lg={12} md={12} sm={12} className="my-3 shadow bg-light">
          <div className="d-flex flex-row">
            <div className="w-50">
              <Image src="../images/mission.png" alt='about' />
            </div>
            <div className="w-50 m-auto p-5 lh-lg">
              <h3>Our Mission</h3>
              <hr />
              <p className="fs-5">
                Welcome to <span className="heading">Shopping-Online</span>,
                your one-stop destination for all your shopping
                needs. We are delighted to introduce ourselves as
                a leading online retailer committed to providing
                you with a seamless and enjoyable shopping
                experience.
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mx-5">
        <Col lg={12} md={12} sm={12} className="m-5">
          <div className="mx-5">
            <h3 className="lh-lg"> What Sets Us Apart </h3>
            <hr />
            <h5 className="lh-lg">Quality Assurance</h5>
            <p className="lh-lg"> We take pride in curating products that meet
              stringent quality standards. Every item we offer is
              carefully selected to ensure it meets your expectations.</p>
            <h5 className="lh-lg">Exceptional Customer Service</h5>
            <p className="lh-lg"> Our customer-centric approach means that your
              satisfaction is our top priority. Our dedicated support
              team is here to assist you at every step of your shopping
              journey.</p>
            <h5 className="lh-lg">Secure Shopping</h5>
            <p className="lh-lg">We prioritize the security of your personal
              information. Our website is equipped with the latest
              security measures to protect your data.</p>
            <h5 className="lh-lg">Fast and Reliable Shipping</h5>
            <p className="lh-lg"> We understand the excitement of receiving your order
              promptly. That is why we work with trusted shipping
              partners to ensure swift and reliable deliveries.</p>
            <h5 className="lh-lg">Continuous Improvement</h5>
            <p className="lh-lg"> We believe in continuous improvement and value your
              feedback. Your suggestions help us enhance our
              offerings and services.</p>
          </div>
        </Col>
        <Col className="my-5">
          <p className="lh-lg">
            We invite you to explore our wide selection of products,
            from fashion and electronics to home essentials and
            beyond. Whether you are shopping for yourself or looking
            for the perfect gift, Shopping-online is here to make
            your shopping experience enjoyable and convenient.
          </p>
          <p className="lh-lg">
            Thank you for choosing us as your trusted shopping
            destination. We look forward to serving you and building a
            long-lasting relationship.
          </p>
          <p className="lh-lg">
            If you have any questions, feedback, or suggestions,
            please dont hesitate to reach out to our dedicated
            customer support team. We are here to assist you.
          </p>
          <p className="lh-lg">
            Feel free to customize this content to fit your
            e-commerce websites unique story, mission, and values.
          </p>
          <p className="lh-lg">
            <em><b>
              Happy Shopping!
            </b></em>
          </p>
          <p className="lh-lg">
            Feel free to customize this content to fit your
            e-commerce website's unique story, mission, and values.
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutScreen