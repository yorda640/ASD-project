import { Field, Form, Formik } from "formik";
import { Button, InputGroup, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { API_URI } from "../config/env";
import { useApplicationContext } from "../context/AppContext";
import { ModalComponent } from "./ModalComponent";
import { useState } from "react";
import AuthenticatePage from "../pages/AuthenticatePage";
import { useAuth } from "../hooks/useAuth";

function NavbarComponent({ onClick }: { onClick: () => void }) {
  const { isAuthenticated, logout } = useAuth();
  const { getProducts } = useApplicationContext();
  const [modalShow, setModalShow] = useState(false);
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
            <Form className="d-flex gap-2">
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
            {isAuthenticated ? (
              <>
                <Button variant="light" onClick={onClick}>
                  + Add Product
                </Button>
                <Button variant="danger" onClick={logout} className="ms-2">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  onClick={() => setModalShow(true)}
                  className="ms-2"
                >
                  Login
                </Button>
              </>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      <ModalComponent
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={"Add Product"}
      >
        <AuthenticatePage />
      </ModalComponent>
    </Navbar>
  );
}

export default NavbarComponent;
