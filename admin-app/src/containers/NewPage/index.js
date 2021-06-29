import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout";
import Input from "../../components/UI/Input"
import Modal from "../../components/UI/Modal"
import Card from "../../components/UI/Card"
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
        console.log("Banner Image : ", e);
        setBanners([...banners, e.target.files[0]])
    }
        
    const handleProductImages = (e) => {
        console.log("Product Image : ", e);
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
        
        console.log("form data : ", { title, desc, category, type, banners, products })
        
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
                        <Input 
                            value={categoryId}
                            onChange={onCategoryChange}
                            placeholder={"select category"}
                            options={categories}
                            type={'select'}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            className="form-control form-control-sm"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            onChange={(e) => setDesc(e.target.value)}
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
                            onChange={handleBannerImages}
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
                            onChange={handleProductImages}
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
                Add Page
            </Button>
            {
                page.pages && page.pages.map((item, index) => (
                    <Card
                        headerLeft={
                            <>
                                Category Name :  {" "}
                                <strong>{item.category && item.category.name}</strong>
                            </>
                        }
                        key={index}
                        style={{
                            margin : "20px 0"
                        }}
                        >
                        <div
                            style={{
                                padding : "20px"
                            }}
                            >
                            <div>Banners</div>
                            <div>
                                {
                                    item.banners && item.banners.map((banner, bannerIdx) => (
                                        <img 
                                        key={bannerIdx}
                                            style={{
                                                maxWidth : '1000px',
                                                margin: '10px 0'
                                            }}
                                            src={banner.img} alt="" />
                                    ))
                                }
                            </div>
                        </div>
                        <div
                            style={{
                                padding : "20px"
                            }}
                        >
                            <div>Products</div>
                            <div>
                                {
                                    item.products && item.products.map((product, productIdx) => (
                                        <img 
                                            key={productIdx}
                                            style={{
                                                maxWidth : '1000px',
                                                margin: '10px 0'
                                            }}
                                            src={product.img} alt="" />
                                    ))
                                }
                            </div>
                        </div>
                    </Card>
                ))
            }
        </Layout>
    )
};

export default NewPage;