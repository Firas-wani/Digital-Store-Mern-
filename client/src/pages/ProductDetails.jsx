
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "../styles/ProductDetailsStyles.css";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
const [cart, setCart] = useCart();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product details on component load
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  // Fetch product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Fetch similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  return (
    <Layout>
      {/* Product Details Section */}
      <div className="container py-4">
        <div className="row align-items-center mb-4">
          {/* Product Image */}
          <div className="col-md-6 text-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px", width: "auto" }}
            />
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <h1 className="text-primary mb-3">Product Details</h1>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Name:</strong> {product.name}
              </li>
              <li className="list-group-item">
                <strong>Description:</strong> {product.description}
              </li>
              <li className="list-group-item">
                <strong>Price:</strong>{" "}
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </li>
              <li className="list-group-item">
                <strong>Category:</strong> {product?.category?.name}
              </li>
            </ul>
            <button className="btn btn-secondary mt-3" onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Item Added to cart");
                    }}>
              <i className="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>

        <hr />

        {/* Similar Products Section */}
        <div className="mb-4">
          <h3 className="text-center text-primary mb-4">Similar Products</h3>
          {relatedProducts.length < 1 ? (
            <p className="text-center text-muted">No similar products found.</p>
          ) : (
            <div className="row">
              {relatedProducts.map((p) => (
                <div className="col-md-3 mb-4" key={p._id}>
                  <div className="card shadow-sm h-100">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text text-muted">
                        {p.description.substring(0, 60)}... 
                      </p>
                      <h6 className="text-primary">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h6>
                      <div className="d-grid mt-3">
                        <button
                          className="btn btn-info"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
