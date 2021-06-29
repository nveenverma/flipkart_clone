import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";

import Layout from "../../components/Layout";
import { MaterialButton } from "../../components/MaterialUI";
import { generatePublicUrl } from "../../urlConfig";
import { getProductDetailsById, addToCart } from "../../actions";
import "./style.css";
import { useState } from "react";

const ProductDetailsPage = (props) => {
	const dispatch = useDispatch();
	const product = useSelector((state) => state.product);
	const category = useSelector(state => state.category);

	const [productName, setProductName] = useState('Product Name')
	const [categoryName, setCategoryName] = useState('Category 1')
	const [subCategoryName, setSubCategoryName] = useState('Category 2')

	console.log("Categories : ", category)

	useEffect(() => {
		const { productId } = props.match.params;
		const payload = {
			params: { productId },
		};
		dispatch(getProductDetailsById(payload));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	useEffect(() => {
		console.log("Product Details returned : ", product.productDetails)		
		product.productDetails.name && setProductName(product.productDetails.name)
		if (product.productDetails.category) {
			setCategoryName(category.categories.filter(cat => cat._id === product.productDetails.category.parentId)[0].name)
			setSubCategoryName(product.productDetails.category.name)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product.productDetails])

	if (Object.keys(product.productDetails).length === 0) {
		return null;
	}

	return (
		<Layout>
			<div className="productDescriptionContainer">
				<div className="flexRow">
					<div className="verticalImageStack">
						{product.productDetails.productPictures.map(
							(thumb, index) => (
								<div key={index} className="thumbnail">
									<img
										src={generatePublicUrl(thumb.img)}
										alt={thumb.img}
									/>
								</div>
							)
						)}
					</div>
					<div className="productDescContainer">
						<div className="productDescImgContainer">
							<img
								src={generatePublicUrl(product.productDetails.productPictures[0].img)}
								alt={`${product.productDetails.productPictures[0].img}`}
							/>
						</div>

						{/* action buttons */}
						<div 
							style={{"marginTop" : '20px'}}
							className="flexRow"
						>
							<MaterialButton
								title="ADD TO CART"
								bgColor="#ff9f00"
								textColor="#ffffff"
								style={{
									marginRight: "5px",
								}}
								icon={<IoMdCart />}
								onClick={() => {
									const { _id, name, price } = product.productDetails;
									const img = product.productDetails.productPictures[0].img;
									dispatch(addToCart({ _id, name, price, img }));
									props.history.push('/cart')
								}}
							/>
						</div>
					</div>
				</div>
				<div
					style={{marginLeft : '50px'}}
				>
					{/* home > category > subCategory > productName */}
					<div 
						className="breed">
						
						<ul>
							<li>
								<a href="/#">Home</a>
								<IoIosArrowForward />
							</li>
							<li>
								<a href="/#">
									{categoryName}
								</a>
								<IoIosArrowForward />
							</li>
							<li>
								<a href="/#">{subCategoryName}</a>
								<IoIosArrowForward />
							</li>
							<li>
								<a href="/#">{productName}</a>
							</li>
						</ul>
					</div>
					{/* product description */}
					<div className="productDetails" >
						<p className="productTitle">
							{product.productDetails.name}
						</p>
						<div>
							<span className="ratingCount">
								4.3 <IoIosStar />
							</span>
							<span className="ratingNumbersReviews">
								72,234 Ratings & 8,140 Reviews
							</span>
						</div>
						<div className="extraOffer">
							Extra <BiRupee />
							4500 off{" "}
						</div>
						<div className="flexRow priceContainer">
							<span className="price">
								<BiRupee />
								{product.productDetails.price}
							</span>
							<span
								className="discount"
								style={{ margin: "0 10px" }}
							>
								22% off
							</span>
							{/* <span>i</span> */}
						</div>
						<div>
							<p
								style={{
									color: "#212121",
									fontSize: "14px",
									fontWeight: "600",
								}}
							>
								Available Offers
							</p>
							<p style={{ display: "flex" }}>
								<span
									style={{
										width: "100px",
										fontSize: "12px",
										color: "#878787",
										fontWeight: "600",
										marginRight: "20px",
									}}
								>
									Description
								</span>
								<span
									style={{
										fontSize: "12px",
										color: "#212121",
									}}
								>
									{product.productDetails.description}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ProductDetailsPage;


