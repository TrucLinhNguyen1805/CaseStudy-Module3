import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Styles.css";
import { addNewProduct } from "../service/productService";

function AddComponent() {
  const [product] = useState({
    title: "",
    description: "",
    price: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    await addNewProduct(value);
    toast.success("Thêm mới thành công");
    navigate("/home");
  };
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <>
      <Formik initialValues={product} onSubmit={handleSubmit}>
        <Form>
          <h4>Thêm sản phẩm</h4>
          <div>
            <label>Tên sản phẩm:</label>
            <Field type="text" name="title" />
          </div>
          <div>
            <label>Giá:</label>
            <Field type="text" name="price" />
          </div>
          <div>
            <label>Mô tả:</label>
            <Field type="text" name="description" />
          </div>
          <div>
            <button className="btn btn-sm btn-primary" type="submit">
              Thêm
            </button>
            <button
              type="button"
              className="btn btn-sm btn-info "
              style={{ color: "white" }}
              onClick={handleBack}
            >
              Trở lại
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
export default AddComponent;
