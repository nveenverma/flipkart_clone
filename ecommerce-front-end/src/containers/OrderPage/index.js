import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getOrders } from "../../actions";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import Card from "../../components/UI/Card";
import { Breed } from "../../components/MaterialUI";
import Layout from "../../components/Layout";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";


const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  // useEffect(() => {
  //   if (!auth.authenticate) {
  //     return (
  //       <div>
  //         Kindly login to view your orders
  //       </div>
  //     )
  //   }
  // }, [auth.authenticate])

  console.log(user);

  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />

        {
          user.orders.length === 0 ? 
          <Card 
            style={{ display: "block", margin: "20px 0" }}
            headerLeft="Nothing ordered yet" 
          /> 
          :
          null
        }

        { user.orders.length > 0 && user.orders.map((order, index) => {
          return (
            <>
              <div
                className='flexRow sb'
                style={{
                  // margin: '10px',
                  margin: '20px 0 0',
                  padding: '10px 20px',
                  background: '#fefefe'                
                }}
              >
                {index+1}. Order Summary
                <Link
                  to={`/order_details/${order._id}`}
                >
                View Order
                </Link>
              </div>

              {
                order.items.map((item) => (
                  <Card 
                    // className='flexRow sb'
                    style={{ display: "block", margin: "5px 0" }}
                  >
                    <div
                      className="orderItemContainer"
                    >
                      <div className="orderImgContainer">
                        <img
                          className="orderImg"
                          src={generatePublicUrl(item.productId.productPictures[0].img)}
                          alt="Displaying Ordered Items"
                        />
                      </div>
                      <div className='grow'>
                        <div className="orderRow">
                          <p className="orderName orderedItemTitles">Item Ordered</p>
                          <p className="orderPrice orderedItemTitles">Amount</p>
                          <p className='orderedItemTitles'>Payment Status</p>
                        </div>
                        <div 
                          style={{ marginTop: "-10px" }}
                          className="orderRow"
                        >
                          <div className="orderName">
                            {item.productId.name}
                          </div>
                          <div className="orderPrice">
                            <BiRupee />
                            {item.payablePrice}
                          </div>
                          <div>{order.paymentStatus}</div>
                        </div>
                      </div>

                    </div>
                  </Card>
              ))
            }
          </>
          );
        })}
      </div>
    </Layout>
  );
};

export default OrderPage