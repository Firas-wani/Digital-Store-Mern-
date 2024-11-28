import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);  
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALl Products - Best offers "}>
      {/* banner image */}
      <img
        src="/images/banner.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
        height={"500px"}
      />
      {/* banner image */}
      <div className="container-fluid row mt-3 mb-4 home-page">
<div className="container my-4">
  <div className="row">
    <div className="col-md-9 mx-auto">
      <h1 className="text-center mb-4">All Products</h1>
      <div className="row g-4">
        {products?.map((p) => (
          <div className="col-md-4 col-sm-6" key={p._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="card-title mb-0">{p.name}</h5>
                  <h5 className="card-title card-price text-success mb-0">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text text-truncate">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="mt-auto">
                  <button
                    className="btn btn-info btn-sm w-100 mb-2"
                    style={{
                      background:
                        "linear-gradient(to right, #17a2b8, #0d6efd)",
                      color: "white",
                    }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    <i className="fas fa-info-circle me-1"></i> More Details
                  </button>
                  <button
                    className="btn btn-primary btn-sm w-100"
                    style={{
                      background:
                        "linear-gradient(to right, #007bff, #6610f2)",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    <i className="fas fa-cart-plus me-1"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {products && products.length < total && (
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary btn-lg px-4"
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
            disabled={loading}
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                Load More <AiOutlineReload className="ms-1" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  </div>
</div>
</div>




    </Layout>
  );
};

export default HomePage;
