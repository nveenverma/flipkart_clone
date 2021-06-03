import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckboxTree from "react-checkbox-tree";

import { addCategory } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";

import "./style.css"

import {
  MdCheckBoxOutlineBlank,
  MdIndeterminateCheckBox,
  MdCheckBox,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
} from "react-icons/md";

import "react-checkbox-tree/lib/react-checkbox-tree.css";

function Categories() {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([])
  const [expandedArray, setExpandedArray] = useState([])

  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();
    const cat = {
      categoryName,
      parentCategoryId,
      categoryImage,
    };

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));

    console.log(cat);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // Function to display all the categories
  const renderCategories = (categories) => {
    let categoriesArray = [];

    for (let category of categories) {
      categoriesArray.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return categoriesArray;
  };

  // Function to nest the categories based on their parent category
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name, parentId: category.parentId });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  // Function to edit categories
  const updateCategory = () => {
    setUpdateCategoryModal(true);
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const catObject = categories.find((cat, _index) => categoryId === cat.value);
      catObject && checkedArray.push(catObject);
    })
    setCheckedArray(checkedArray);

    expanded.length > 0 && expanded.forEach((categoryId, index) => {
      const catObject = categories.find((cat, _index) => categoryId === cat.value);
      catObject && expandedArray.push(catObject);
    })
    setExpandedArray(expandedArray)

    console.log({ checked, expanded, checkedArray, expandedArray, categories })

  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) => _index === index ? { ...item, [key] : value } : item);
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) => _index === index ? { ...item, [key] : value } : item);
      setExpandedArray(updatedExpandedArray);
    }
  }

  // JSX to be displayed on the page
  return (
    <Layout sidebar>
      <Row className='marginBottom'>
        <Col md={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Category</h3>
            <Button variant="outline-primary" onClick={handleShow}>
              Add
            </Button>
          </div>
        </Col>
      </Row>

      <Row className='marginBottom'>
        <Col md={12}>
          <CheckboxTree
            nodes={renderCategories(category.categories)}
            checked={checked}
            expanded={expanded}
            onCheck={(checked) => setChecked(checked)}
            onExpand={(expanded) => setExpanded(expanded)}
            icons={{
              check: <MdCheckBox />,
              uncheck: <MdCheckBoxOutlineBlank />,
              halfCheck: <MdIndeterminateCheckBox />,
              expandClose: <MdKeyboardArrowRight />,
              expandOpen: <MdKeyboardArrowDown />,
            }}
          />
        </Col>
      </Row>

      <Row className='marginBottom'>
        <Col>
          <Button variant="outline-secondary" onClick={updateCategory} className='marginRight'>
            Edit
          </Button>
          <Button variant="outline-danger">
            Delete
          </Button>
        </Col>
      </Row>

      {/* Add Catgories */}
      <Modal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modalTitle={"Add New Category"}
        footer={"Save Changes"}
      >
        <Input
          value={categoryName}
          handleChange={(e) => setCategoryName(e.target.value)}
          placeholder={"Enter Category Name"}
        />

        <select
          className="form-control"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
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
          name="categoryImage"
          onChange={(e) => setCategoryImage(e.target.files[0])}
          style={{ margin: "20px 0 10px" }}
        />
      </Modal>

      {/* Edit Catgories */}
      <Modal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        onSubmit={handleClose}
        modalTitle={"Update Categories"}
        size="lg"
        footer={"Save Changes"}
      >
        {/* <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row> */}        
        
        {/* <h6>Expanded Categories</h6> */}
        <Row>
          <Col>
            <h6>Expanded Categories</h6>
          </Col>
        </Row>
        {
          expandedArray.length > 0 &&
          expandedArray.map((item, index) =>           
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  handleChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                  placeholder={'Category Name'}
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                >
                  <option>Select Category</option>
                  {createCategoryList(category.categories).map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          )
        }

        <Row>
          <Col>
            <h6>Checked Categories</h6>
          </Col>
        </Row>
        {
          checkedArray.length > 0 &&
          checkedArray.map((item, index) =>           
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  handleChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                  placeholder={'Category Name'}
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                >
                  <option>Select Category</option>
                  {createCategoryList(category.categories).map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          )
        }

        <input
          type="file"
          name="categoryImage"
          onChange={(e) => setCategoryImage(e.target.files[0])}
          style={{ margin: "20px 0 10px" }}
        />
      </Modal>
    </Layout>
  );
}

export default Categories;
