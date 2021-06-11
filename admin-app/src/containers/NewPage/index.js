import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout";
import Input from "../../components/UI/Input"
import Modal from "../../components/UI/Modal"
import linearCategories from "../../helpers/linearCategories"
import { createPage } from "../../actions"


const NewPage = () => {

    const category = useSelector(state => state.category)
    const page = useSelector(state => state.page)
    
    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [desc, setDesc] = useState('')
    const [type, setType] = useState('')

    const [categories, setCategories] = useState([])
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]) 

    useEffect(() => {
        
        if (!page.loading) {
            setTitle("")
            setCategoryId("")
            setDesc("")
            setType("")
            setBanners([])
            setProducts([])
        }
    }, [page])


    const onCategoryChange = (e) => {
        const selectedCategory = categories.find(cat => cat.value === e.target.value);
        
        setCategoryId(e.target.value);
        setType(selectedCategory.type);
    }

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]])
    }
    
    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]])
    }

    const addPageForm = (e) => {
        e.preventDefault();

        if (!title) {
            alert("Title is required")
            setShowModal(false)
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type)

        banners.forEach(banner => {
            form.append('banners', banner);
        })
        products.forEach(product=> {
            form.append('products', product);
        })

        console.log({ title, desc, category, type, banners, products })
        
        dispatch(createPage(form))
        setShowModal(false)
    }

    const renderCreatePageModal = () => {

        return (
            <Modal
                show={showModal}
                modalTitle={"Create New Page"}
                handleClose={() => setShowModal(false)}
                onSubmit = {addPageForm}
            >

                <Row>
                    <Col>
                        <select
                            className="form-control form-control-sm"
                            value={categoryId}
                            onChange={onCategoryChange}
                            style={{marginBottom : "20px"}}
                        >
                            <option value={''} >select category</option>
                            {
                                categories.map(
                                    cat => <option key={cat.value} value={cat.value}>{cat.name}</option>
                                )
                            }
                        </select>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            className="form-control form-control-sm"
                            value={title}
                            handleChange={(e) => setTitle(e.target.value)}
                            placeholder={'Page Title'}
                        >
                        </Input>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            className="form-control form-control-sm"
                            value={desc}
                            handleChange={(e) => setDesc(e.target.value)}
                            placeholder={'Enter Description'}
                        >
                        </Input>
                    </Col>
                </Row>

                {
                    banners.length > 0 ?
                    banners.map(banner => 
                        <Row key={banner.name}>
                            <Col>{banner.name}</Col>
                        </Row>
                    ) : null
                }
                
                <Row>
                    <Col>
                        <Input
                            type="file"
                            name="banners"
                            handleChange={handleBannerImages}
                            >
                        </Input>
                    </Col>
                </Row>

                {
                    products.length > 0 ?
                    products.map(product => 
                        <Row key={product.name}>
                            <Col>{product.name}</Col>
                        </Row>
                    ) : null
                }

                <Row>
                    <Col>
                        <Input
                            type="file"
                            name="products"
                            handleChange={handleProductImages}
                        >
                        </Input>
                    </Col>
                </Row>
            </Modal>
        )
    }

	return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <Button
                onClick={() => setShowModal(true)}
            >
                Click here
            </Button>
        </Layout>
    )
};

export default NewPage;