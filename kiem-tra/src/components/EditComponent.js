import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Styles.css";
import { editNewProduct, getProductById } from "../service/productService";

function EditComponent() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      let product = await getProductById(id);
      setProduct(product);
    };
    fetchProduct();
  }, []);

  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    await editNewProduct(id, value);
    toast.success("Chỉnh sửa thành công");
    navigate("/home");
  };
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <>
      <Formik initialValues={product} onSubmit={handleSubmit}>
        <Form>
          <h4>Sửa sản phẩm</h4>
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
              Sửa
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
export default EditComponent;
