import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProductById } from "../service/productService";
import { useNavigate } from "react-router-dom";

function DetailComponent() {
  const [product, setProduct] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const p = await getProductById(id);
        setProduct(p);
      } catch (error) {
        console.error("Error fetching price details:", error);
      }
    };
    fetchData();
  }, [id]);
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <div className="container mt-4">
      <h5 className="card-title">Chi tiết sản phẩm</h5>
      <div
        style={{ marginTop: "20px", width: "400px" }}
        className="card shadow-sm "
      >
        <div className="card-body">
          <h4 className="card-text">
            <strong>Tên sản phẩm:</strong> {product.title}
          </h4>
          <p className="card-text">
            <strong>Mô tả:</strong> {product.description}{" "}
          </p>
          <p className="card-text">
            <strong>Giá:</strong> {product.price}
          </p>
          <button className="btn btn-sm btn-primary" onClick={handleBack}>
            Trở lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailComponent;
