import React, { useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import Layout from "../../components/Layout";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";

function Products() {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();

    form.append("name", productName);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const renderProducts = () => {
    return (
      <Table striped bordered responsive="sm" style={{'marginTop' : '50px'}} >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((item) => (
                <tr key={item._id}>
                  <td>2</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.description}</td>
                  <td>--</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  return (
    <Layout sidebar>
      <Row>
        <Col md={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Product</h3>
            <Button variant="primary" onClick={handleShow}>
              Add
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>{renderProducts()}</Col>
      </Row>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Product"}
      >
        <Input
          label="Product Name"
          value={productName}
          handleChange={(e) => setProductName(e.target.value)}
          placeholder={"Enter Product Name"}
        />

        <Input
          label="Quantity"
          value={quantity}
          handleChange={(e) => setQuantity(e.target.value)}
          placeholder={"Enter Quantity"}
        />

        <Input
          label="Price"
          value={price}
          handleChange={(e) => setPrice(e.target.value)}
          placeholder={"Enter Price"}
        />

        <Input
          label="Description"
          value={description}
          handleChange={(e) => setDescription(e.target.value)}
          placeholder={"Enter Description"}
        />

        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="productPictures"
          onChange={(e) =>
            setProductPictures([...productPictures, e.target.files[0]])
          }
          style={{ margin: "20px 0 10px" }}
        />

        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
      </Modal>
    </Layout>
  );
}

export default Products;
