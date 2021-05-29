import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import { addCategory, getAllCategory } from '../../actions';
import Layout from "../../components/Layout"
import Input from "../../components/UI/Input"

function Categories() {

    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const handleClose = () => {
        
        const form = new FormData();
        const cat = {
            categoryName,
            parentCategoryId,
            categoryImage
        };

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));

        console.log(cat); 
        setShow(false);

    }
    const handleShow = () => setShow(true);


    // Below function will run once the category page gets loaded
    // It dispatches an action to fetch all the categories 
    useEffect(() => {
        dispatch(getAllCategory());
    }, [])


    // Below function is used to display all the categories
    const renderCategories = (categories) => {
        let categoriesArray = [];

        for (let category of categories) {
            categoriesArray.push(
                <li key={category._id}>
                    {category.name}
                    {
                        category.children.length > 0 ? 
                        <ul>{renderCategories(category.children)}</ul> : 
                        null
                    }
                </li>
            )
        }

        return categoriesArray;
    }

    const createCategoryList = (categories, options=[]) => {
        for (let category of categories) {
            options.push({ value : category._id, name : category.name })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    // const handleCategoryImage = e => {
    //     setCategoryImage(e.target.files[0]);
    // }

    return (
        <Layout sidebar>
            <Row>
                <Col md={12}>
                    <div style={{ display : 'flex', justifyContent : 'space-between' }}>
                        <h3>Category</h3>
                        <Button variant="primary" onClick={handleShow}>
                            Add
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <ul>
                        {renderCategories(category.categories)}
                    </ul>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    

                    <Input
                        value={categoryName}
                        handleChange={e => setCategoryName(e.target.value)}
                        placeholder={'Enter Category Name'}
                    />

                    <select 
                        className="form-control"
                        value={parentCategoryId}
                        onChange={e => setParentCategoryId(e.target.value)}
                    >
                        <option>Select Category</option>
                        {
                            createCategoryList(category.categories).map( item =>
                                <option key={item.value} value={item.value} >{item.name}</option>
                                )
                        }
                    </select>

                    <input type='file' name='categoryImage' onChange={e => setCategoryImage(e.target.files[0])} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>            

        </Layout>
    )
}

export default Categories
