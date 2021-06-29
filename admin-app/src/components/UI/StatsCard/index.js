import React from 'react'
import { useSelector } from 'react-redux'


import "./style.css"

const StatsCard = (props) => {

    const order = useSelector(state => state.order)
    const product = useSelector(state => state.product)
    const category = useSelector(state => state.category)
    console.log(product, category)

    function nFormatter(num, digits) {
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
      });
      return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }

    return (
        <div className="bg-default">
        <div className="main-content" >
          <div className="header pb-8 pt-5" >
            <div className="container-fluid">
              <h2 className="mb-5 text-white">Overview</h2>
              <div className="header-body">
                <div className="row">
                  <div className="col-xl-3 col-lg-6">
                    <div className="card card-stats mb-4 mb-xl-0">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">Orders</h5>
                            <span className="h2 font-weight-bold mb-0">
                              {order.orders.length}</span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-chart-bar"></i>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 50%</span>
                          <span className="text-nowrap">Since yesterday</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6">
                    <div className="card card-stats mb-4 mb-xl-0">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">Sales</h5>
                            <span className="h2 font-weight-bold mb-0">
                              {
                                " " + nFormatter(order.orders.reduce((amount, item) => amount + item.totalAmount, 0))
                              }
                            </span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i className="fas fa-coins"></i>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 100%</span>
                          <span className="text-nowrap">Since last week</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6">
                    <div className="card card-stats mb-4 mb-xl-0">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">Products</h5>
                            <span className="h2 font-weight-bold mb-0">
                              {product.products.length}
                            </span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                              <i className="fas fa-shopping-cart"></i>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-warning mr-2"><i className="fas fa-arrow-down"></i> 40%</span>
                          <span className="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6">
                    <div className="card card-stats mb-4 mb-xl-0">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">Categories</h5>
                            <span className="h2 font-weight-bold mb-0">
                              {
                                category.categories.length
                              }
                            </span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                              <i className="fas fa-folder"></i>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 10%</span>
                          <span className="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <footer className="footer">
          <div className="row align-items-center justify-content-xl-between">
            <div className="col-xl-6 m-auto text-center">
              <div className="copyright">
                <p>Made with <a href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">Argon Dashboard</a> by Creative Tim</p>
              </div>
            </div>
          </div>
        </footer> */}
        </div>
    )
}

export default StatsCard
