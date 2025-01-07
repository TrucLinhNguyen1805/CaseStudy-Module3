import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import { getAllFurama, searchFuramaByName } from "../../service/hotelService";
import { getAllType } from "../../service/typeService";
import { Link } from "react-router-dom";

function HomePage() {
    const [hotelList, setHotelList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const searchRef = useRef();
    const searchTypeIdRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const list = await getAllFurama();
                setHotelList(list);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        const fetchDataType = async () => {
            const list = await getAllType();
            setTypeList(list);
        };
        fetchData();
        fetchDataType();
    }, []);

    const handleSearch = () => {
        let name = searchRef.current.value;
        let typeId = searchTypeIdRef.current.value;
        const fetchData = async () => {
            const searchList = await searchFuramaByName(name, typeId);
            setHotelList(searchList);
        };
        fetchData();
    };

    return (
        <>
            <div className="w-100">
                <img 
                    src="https://file4.batdongsan.com.vn/2020/04/24/hmcVYWuR/20200424140141-d2b1.jpg" 
                    alt="Panoramic View of the Mogan Mountain" 
                    className="img-fluid" 
                    style={{ width: '100%', height: 'auto' }} 
                />
            </div>
            <div className="search-container" style={{ marginTop: "20px", marginLeft: "20px" }}>
                <input ref={searchRef} name="searchName" placeholder="Enter Search" className="form-control d-inline-block w-25" />
                <select className="form-select d-inline-block w-auto" ref={searchTypeIdRef}>
                    <option value="">------Chọn loại------</option>
                    {typeList.map(e => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </select>
                <button className="btn btn-sm btn-success ms-2" type="button" onClick={handleSearch}>Search</button>
            </div>
            <div className="container mt-4">
                <div className="row">
                    {hotelList && hotelList.map((e, i) => (
                        <div className="col-md-3 mb-4" key={i}>
                            <div className="card shadow-sm border-light">
                                <img
                                    src={e.image}
                                    className="card-img-top"
                                    alt={e.name}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p style={{fontWeight:"bold", fontSize:"24", color: "#333"}} className="card-title text-truncate">{e.name}</p>
                                        <span className="text-muted">{e.DienTich} m²</span>
                                    </div>
                                    <p style={{fontWeight:"bold", fontSize:"24", color: "#D2691E"}} className="card-text">
                                        {e.price} VND <br />
                                    </p>
                                    <Link  to={'/home/detail/'+e.id} className={'btn btn-warning'} style={{ color: "white"}}>Detail</Link>
                                    <a style={{ marginLeft:"10px"}} href="#" className="btn btn-success">
                                        Booking
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default HomePage;