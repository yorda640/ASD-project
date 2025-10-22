import { Field, Form, Formik } from "formik";
import { Button, InputGroup, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { API_URI } from "../config/env";
import { useApplicationContext } from "../context/AppContext";

function NavbarComponent({ onClick }: { onClick: () => void }) {
  const { getProducts } = useApplicationContext();

  async function handleSubmit(values: { title: string; category: string }) {
    const url = `${API_URI}/products/search?q=${values.title}&${values.category}`;
    if (values) {
      await getProducts(url);
    }
  }

  return (
    <Navbar className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand href="/">CS489 - Final Project</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="me-auto">
          <Formik
            initialValues={{ title: "", category: "" }}
            onSubmit={(value) => handleSubmit(value)}
          >
            <Form className="d-flex">
              <InputGroup>
                <Field
                  name="title"
                  placeholder="Title"
                  className="form-control"
                />
                <Field
                  name="category"
                  placeholder="Category"
                  className="form-control"
                />
              </InputGroup>
              <Button variant="default" type="submit">
                Search
              </Button>
            </Form>
          </Formik>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="light" onClick={onClick}>
              + Add Product
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
