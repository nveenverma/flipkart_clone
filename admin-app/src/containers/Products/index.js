import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getAllCategory } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'

function Products() {

    const [show, setShow] = useState(false);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const handleClose = () => {
        
        const form = new FormData();

        form.append('name', productName);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);

        for (let pic of productPictures) {
            form.append('productPicture', pic)
        }

        dispatch(addProduct(form));

        setShow(false);

    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getAllCategory());
    }, [])

    const createCategoryList = (categories, options=[]) => {
        for (let category of categories) {
            options.push({ value : category._id, name : category.name })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    return (
        <Layout sidebar>
            <Row>
                <Col md={12}>
                    <div style={{ display : 'flex', justifyContent : 'space-between' }}>
                        <h3>Product</h3>
                        <Button variant="primary" onClick={handleShow}>
                            Add
                        </Button>
                    </div>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    

                    <Input
                        label="Product Name"
                        value={productName}
                        handleChange={e => setProductName(e.target.value)}
                        placeholder={'Enter Product Name'}
                    />

                    <Input
                        label="Quantity"
                        value={quantity}
                        handleChange={e => setQuantity(e.target.value)}
                        placeholder={'Enter Quantity'}
                    />

                    <Input
                        label="Price"
                        value={price}
                        handleChange={e => setPrice(e.target.value)}
                        placeholder={'Enter Price'}
                    />

                    <Input
                        label="Description"
                        value={description}
                        handleChange={e => setDescription(e.target.value)}
                        placeholder={'Enter Description'}
                    />

                    <select 
                        className="form-control"
                        value={categoryId}
                        onChange={e => setCategoryId(e.target.value)}
                    >
                        <option>Select Category</option>
                        {
                            createCategoryList(category.categories).map( item =>
                                <option key={item.value} value={item.value} >{item.name}</option>
                                )
                        }
                    </select>

                    <input type='file' name='productPictures' onChange={e => setProductPictures([...productPictures, e.target.files[0]])} />

                    {
                        productPictures.length > 0 ?
                        productPictures.map( (pic, index) => <div key={index}>{pic.name}</div> ) : 
                        null
                    }
                                        
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

export default Products
