import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Route, Routes } from "react-router";
import FooterComponent from "./components/FooterComponent";
import { ModalComponent } from "./components/ModalComponent";
import NavbarComponent from "./components/NavbarComponent";
import { API_URI } from "./config/env";
import { useApplicationContext } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import SingleProduct from "./pages/SingleProduct";

function App() {
  const [modalShow, setModalShow] = useState(false);
  const { getProducts, addProduct } = useApplicationContext();

  async function fetchProducts(url: string) {
    await getProducts(url);
  }

  useEffect(() => {
    fetchProducts(`${API_URI}/products/search?q=`);
  }, []);

  async function handleAddProduct(values: any) {
    try {
      await addProduct(values);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <NavbarComponent onClick={() => setModalShow(!modalShow)} />x
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index path="/:id" element={<SingleProduct />} />
        </Route>
      </Routes>
      <ModalComponent
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={"Add Product"}
      >
        <div>
          <Formik
            initialValues={{ name: "", price: "", category: "" }}
            onSubmit={(values) => handleAddProduct(values)}
          >
            <Form>
              <label htmlFor="title">Product Title</label>
              <Field
                id="title"
                name="name"
                placeholder="Title"
                className="form-control"
              />
              <div className="row">
                <div className="col-sm-6 mt-2">
                  <label htmlFor="price">Price</label>
                  <Field
                    id="price"
                    name="price"
                    placeholder="Price"
                    className="form-control"
                  />
                </div>
                <div className="col-sm-6 mt-2">
                  <label htmlFor="title">Category</label>
                  <Field
                    id="category"
                    name="category"
                    placeholder="Category"
                    className="form-control"
                  />
                </div>
                <div className="col-sm-12 mt-2">
                  <label htmlFor="title">Description</label>
                  <Field
                    id="description"
                    name="description"
                    placeholder="Description"
                    className="form-control"
                    as="textarea"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="form-control mt-2"
                variant={"primary"}
              >
                Submit
              </Button>
            </Form>
          </Formik>
        </div>
      </ModalComponent>
      <FooterComponent />
    </>
  );
}

export default App;
