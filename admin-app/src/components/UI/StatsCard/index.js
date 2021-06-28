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
        <div class="bg-default">
        <div class="main-content" >
          <div className="header pb-8 pt-5" >
            <div class="container-fluid">
              <h2 class="mb-5 text-white">Overview</h2>
              <div class="header-body">
                <div class="row">
                  <div class="col-xl-3 col-lg-6">
                    <div class="card card-stats mb-4 mb-xl-0">
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <h5 class="card-title text-uppercase text-muted mb-0">Orders</h5>
                            <span class="h2 font-weight-bold mb-0">
                              {order.orders.length}</span>
                          </div>
                          <div class="col-auto">
                            <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i class="fas fa-chart-bar"></i>
                            </div>
                          </div>
                        </div>
                        <p class="mt-3 mb-0 text-muted text-sm">
                          <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 50%</span>
                          <span class="text-nowrap">Since yesterday</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-6">
                    <div class="card card-stats mb-4 mb-xl-0">
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <h5 class="card-title text-uppercase text-muted mb-0">Sales</h5>
                            <span class="h2 font-weight-bold mb-0">
                              {
                                " " + nFormatter(order.orders.reduce((amount, item) => amount + item.totalAmount, 0))
                              }
                            </span>
                          </div>
                          <div class="col-auto">
                            <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i class="fas fa-coins"></i>
                            </div>
                          </div>
                        </div>
                        <p class="mt-3 mb-0 text-muted text-sm">
                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 100%</span>
                          <span class="text-nowrap">Since last week</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-6">
                    <div class="card card-stats mb-4 mb-xl-0">
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <h5 class="card-title text-uppercase text-muted mb-0">Products</h5>
                            <span class="h2 font-weight-bold mb-0">
                              {product.products.length}
                            </span>
                          </div>
                          <div class="col-auto">
                            <div class="icon icon-shape bg-yellow text-white rounded-circle shadow">
                              <i class="fas fa-shopping-cart"></i>
                            </div>
                          </div>
                        </div>
                        <p class="mt-3 mb-0 text-muted text-sm">
                          <span class="text-warning mr-2"><i class="fas fa-arrow-down"></i> 40%</span>
                          <span class="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-6">
                    <div class="card card-stats mb-4 mb-xl-0">
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <h5 class="card-title text-uppercase text-muted mb-0">Categories</h5>
                            <span class="h2 font-weight-bold mb-0">
                              {
                                category.categories.length
                              }
                            </span>
                          </div>
                          <div class="col-auto">
                            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                              <i class="fas fa-folder"></i>
                            </div>
                          </div>
                        </div>
                        <p class="mt-3 mb-0 text-muted text-sm">
                          <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 10%</span>
                          <span class="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <footer class="footer">
          <div class="row align-items-center justify-content-xl-between">
            <div class="col-xl-6 m-auto text-center">
              <div class="copyright">
                <p>Made with <a href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">Argon Dashboard</a> by Creative Tim</p>
              </div>
            </div>
          </div>
        </footer> */}
        </div>
    )
}

export default StatsCard
