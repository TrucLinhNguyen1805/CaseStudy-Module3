import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import { getAllFurama } from "../../service/hotelService";

function ListComponent() {
    const [hotelList, setHotelList] = useState([]);
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const list = await getAllFurama();
                setHotelList(list);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };

        fetchData();
     
    }, []);

    return (
        <>
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>Quản lý khách sạn</h2>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Diện tích</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Kiểu thuê</th>
                        <th>Hình ảnh</th>
                        <th>Loại</th>
                        <th>Edit</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {hotelList && hotelList.map((e, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{e.name}</td>
                            <td>{e.DienTich}</td>
                            <td>{e.price}</td>
                            <td>{e.people}</td>
                            <td>{e.Kieuthue}</td>
                            <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh6cuED7Qd1L7DtIGp4TvTQn60tKmhXKTCkA&s"/></td>
                            <td>{e.type.name}</td>
                            <td>
                                <button type="button" className="btn btn-danger">Edit</button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-warning" style={{ color: "white" }}>Detail</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ListComponent;
