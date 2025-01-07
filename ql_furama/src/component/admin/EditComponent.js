import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editNewFurama, getFuramaById } from "../../service/hotelService";
import { getAllType } from "../../service/typeService";

function EditComponent() {
    const { id } = useParams();
    const [typeList, setTypeList] = useState([]);
    const [hotel, setHotel] = useState(null);

    // Lấy danh sách loại
    useEffect(() => {
        const fetchData = async () => {
            const list = await getAllType();
            setTypeList(list);
        };
        fetchData();
    });

    // Lấy thông tin khách sạn theo ID
    useEffect(()=>{
        const fetchHotel = async()=>{
            let hotel = await getFuramaById(id);
            hotel ={
                ...hotel,
                type: JSON.stringify(hotel.type),
            }
            setHotel(hotel);
        }
        fetchHotel();
    },[])

    const navigate = useNavigate();

    const handleSubmit= async(value)=>{
        console.log(value);
        const newHotel ={
            ...value,
            type: JSON.parse(value.type)
        }
        console.log(newHotel);
        await editNewFurama(id, newHotel);
        toast.success("Chỉnh sửa thành công");
        navigate('/home');
    }

    const handleValidate = Yup.object({
        name: Yup.string()
            .required('Yêu cầu k để trống')
            .matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)+$/, 'Tên chưa đúng định dạng'),
        DienTich: Yup.number().required('Yêu cầu k để trống'),
        price: Yup.string()
            .required("Yêu cầu không để trống")
            .transform(value => value.replace(/\./g, '').replace(/,/g, '.')) // Chuyển đổi giá
            .test('is-number', 'Giá phải là một số dương', value => !isNaN(value) && parseFloat(value) > 0),
        people: Yup.number().required('Yêu cầu k để trống'),
        Kieuthue: Yup.string().required('Yêu cầu chọn giá trị'),
        image: Yup.string().required('Yêu cầu k để trống'),
        content: Yup.string().required('Yêu cầu k để trống'),
        type: Yup.string().required('Yêu cầu chọn giá trị'),
    });

    if(hotel == null){
        return "";
    }
    return (
        <Formik initialValues={hotel} onSubmit={handleSubmit} validationSchema={handleValidate}>
            
                <Form>
                    <div className="mb-1">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <Field type="text" className="form-control" name='name' id='name' />
                        <ErrorMessage style={{ color: 'red' }} name="name" component='div' />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="DienTich" className="form-label">Diện tích:</label>
                        <Field type="text" className="form-control" name='DienTich' id='DienTich' />
                        <ErrorMessage style={{ color: 'red' }} name="DienTich" component='div' />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="price" className="form-label">Giá:</label>
                        <Field type="text" className="form-control" name='price' id='price' />
                        <ErrorMessage style={{ color: 'red' }} name="price" component='div' />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="people" className="form-label">Số lượng:</label>
                        <Field type="text" className="form-control" name='people' id='people' />
                        <ErrorMessage style={{ color: 'red' }} name="people" component='div' />
                    </div>
                    <div className="mb-1">
                        <label className="form-label">Kiểu thuê:</label>
                        <div role="group" aria-labelledby="my-radio-group">
                            <Field type='radio' name='Kieuthue' value='Ngày' className="form-check-input" /> Ngày
                            <Field style={{ marginLeft: "10px" }} type='radio' name='Kieuthue' value='Tuần' className="form-check-input" /> Tuần
                            <Field style={{ marginLeft: "10px" }} type='radio' name='Kieuthue' value='Tháng' className="form-check-input" /> Tháng
                            <ErrorMessage style={{ color: 'red' }} name="Kieuthue" component='div' />
                        </div>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="image" className="form-label">Hình ảnh:</label>
                        <Field type="text" className="form-control" name='image' id='image' />
                        <ErrorMessage style={{ color: 'red' }} name="image" component='div' />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="content" className="form-label">Content:</label>
                        <Field type="text" className="form-control" name='content' id='content' />
                        <ErrorMessage style={{ color: 'red' }} name="content" component='div' />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="type" className="form-label">Loại:</label>
                        <Field as='select' name='type'>
                            <option>----Select----</option>
                            {typeList.map((m)=>(
                                <option value={JSON.stringify(m)}>{m.name}</option>
                            ))}  
                        </Field> 
                        <ErrorMessage style={{ color: 'red' }} name="type" component='div' />
                    </div>
                    <div>
                        <button className="btn btn-sm btn-success" type="submit">Save</button>
                    </div>
                </Form>
          
        </Formik>
    );
}

export default EditComponent;