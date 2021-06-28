import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";

import { getProductPage } from "../../../actions";
import getParams from "../../../utils/getParams";
import Card from "../../../components/UI/Card";
import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductPage = (props) => {
	const dispatch = useDispatch();
	const product = useSelector((state) => state.product);
	const { page } = product;

	useEffect(() => {
		const params = getParams(props.location.search);
		const payload = {
			params,
		};
		dispatch(getProductPage(payload));
	}, []);

	return (
		<div>
			<Carousel renderThumbs={() => {}}>
				{page.banners &&
					page.banners.map((banner, idx) => (
						<a
							style={{
								display: "block",
								objectFit: "cover",
							}}
							key={idx}
							href={banner.navigateTo}
						>
							<img
								src={banner.img}
								alt=""
								style={{
									objectFit: "cover",
								}}
							/>
						</a>
					))}
			</Carousel>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexWrap: "wrap",
					margin: "10px 0",
					marginTop: "10px",
				}}
			>
				{page.products &&
					page.products.map((item, idx) => (
						<Card
							key={idx}
							style={{
								width: "400px",
								margin: "5px",
							}}
						>
							<img
								style={{
									display: "block",
									margin: "10px auto",
									width: "50%",
								}}
								src={item.img}
								alt=""
							/>
						</Card>
					))}
			</div>
		</div>
	);
};

export default ProductPage;
