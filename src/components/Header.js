import { Button, Col, Container, Row } from "react-bootstrap"

const Header = () => {
    const scrollToSection = () => {
        const targetSection = document.getElementById('targetSection');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
    
    return (
        <Container fluid style={{
            height: '500px', width: '100%', backgroundImage: `url('../images/header.png')`, backgroundSize: 'cover', borderRadius: '10px', marginBottom: '-2rem'
        }}
            className="d-flex justify-content-end align-items-center mr-5">
            <Row>
                <Col className="m-5">
                    <div className="p-5">
                    <h2 className="text-light text-end">
                        New
                    </h2>
                    <h1 className="text-light text-end">
                        <b>Trend Fashion</b>
                    </h1>
                    <h3 className="text-light text-end">
                        Get all the latest <br />
                        fashion items from <br />
                        us at the store.
                    </h3>
                    <Button onClick={scrollToSection}
                    className="w-75 float-end background">
                        SHOP NOW
                    </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Header