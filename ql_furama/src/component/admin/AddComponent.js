import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addNewFurama } from "../../service/hotelService";
import { getAllType } from "../../service/typeService";
import "../../css/AddComponent.css";

function AddComponent() {
  const [typeList, setTypeList] = useState([]);
  const [hotel, setHotel] = useState({
    name: "",
    DienTich: "",
    price: "",
    people: "",
    Kieuthue: "Ngày",
    image: "",
    content: "",
    type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const list = await getAllType();
      setTypeList(list);
    };
    fetchData();
  });
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    console.log(value);
    const hotel = {
      ...value,
      type: JSON.parse(value.type),
    };

    await addNewFurama(hotel);
    toast.success("Thêm mới thành công");
    navigate("/home");
  };
  const handleValidate = Yup.object({
    name: Yup.string()
      .required("Yêu cầu k để trống")
      .matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)+$/, "Tên chưa đúng định dạng"),
    DienTich: Yup.number().required("Yêu cầu k để trống"),
    price: Yup.string()
      .required("Yêu cầu không để trống")
      .transform((value) => value.replace(/\./g, "").replace(/,/g, ".")) // Chuyển đổi 1.050.290 thành 1050290
      .test(
        "is-number",
        "Giá phải là một số dương",
        (value) => !isNaN(value) && parseFloat(value) > 0
      ),
    people: Yup.number().required("Yêu cầu k để trống"),
    Kieuthue: Yup.string().required("Yêu cầu chọn giá trị"),
    image: Yup.string().required("Yêu cầu k để trống"),
    content: Yup.string().required("Yêu cầu k để trống"),
    type: Yup.string().required("Yêu cầu chọn giá trị"),
  });
  return (
    <>
      <Formik
        initialValues={hotel}
        onSubmit={handleSubmit}
        validationSchema={handleValidate}
      >
        <Form>
          <div className="mb-1">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <Field type="text" className="form-control" name="name" id="name" />
            <ErrorMessage
              style={{ color: "red" }}
              name="name"
              component="div"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="DienTich" className="form-label">
              Diện tích:
            </label>
            <Field
              type="text"
              className="form-control"
              name="DienTich"
              id="DienTich"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="DienTich"
              component="div"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="price" className="form-label">
              Giá:
            </label>
            <Field
              type="text"
              className="form-control"
              name="price"
              id="price"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="price"
              component="div"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="people" className="form-label">
              Số lượng:
            </label>
            <Field
              type="text"
              className="form-control"
              name="people"
              id="people"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="people"
              component="div"
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Kiểu thuê:</label>
            <div role="group" aria-labelledby="my-radio-group">
              <Field
                type="radio"
                name="rental"
                value=" Ngày"
                className="form-check-input"
              />{" "}
              Ngày
              <Field
                style={{ marginLeft: "10px" }}
                type="radio"
                name="rental"
                value="Tuần"
                className="form-check-input"
              />{" "}
              Tuần
              <Field
                style={{ marginLeft: "10px" }}
                type="radio"
                name="rental"
                value="Tháng"
                className="form-check-input"
              />{" "}
              Tháng
              <ErrorMessage
                style={{ color: "red" }}
                name="rental"
                component="div"
              />
            </div>
          </div>
          <div className="mb-1">
            <label htmlFor="image" className="form-label">
              Hình ảnh:
            </label>
            <Field
              type="text"
              className="form-control"
              name="image"
              id="image"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="image"
              component="div"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="content" className="form-label">
              Content:
            </label>
            <Field
              type="text"
              className="form-control"
              name="content"
              id="content"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="content"
              component="div"
            />
          </div>
          <div className="mb-1">
            <label htmlFor="type" className="form-label">
              Loại:
            </label>
            <Field as="select" className="form-select" name="type" id="type">
              <option value="">----Select----</option>
              {typeList.map((m) => (
                <option key={m.id} value={JSON.stringify(m)}>
                  {m.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              style={{ color: "red" }}
              name="type"
              component="div"
            />
          </div>
          <div>
            <button className="btn btn-sm btn-success " type="submit">
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
export default AddComponent;
