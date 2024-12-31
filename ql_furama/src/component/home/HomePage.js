import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import { getAllFurama, searchFuramaByName } from "../../service/hotelService";
import { getAllType } from "../../service/typeService";

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
        const fetchDataType = async () =>{
            const list = await getAllType()
            setTypeList(list);
        }
        fetchData();
        fetchDataType();
    }, []);
    const handleSearch =()=>{
        let name = searchRef.current.value;
        let typeId = searchTypeIdRef.current.value;
        const fetchData = async ()=>{
            const searchList = await searchFuramaByName(name,typeId);
            setHotelList(searchList);
        }
        fetchData();
    }
    return (
        <>
            <div className="w-100">
                <img 
                    src="https://img.lovepik.com/photo/20211120/medium/lovepik-panoramic-view-of-the-mogan-mountain-picture_500362891.jpg" 
                    alt="Panoramic View of the Mogan Mountain" 
                    className="img-fluid" 
                    style={{ width: '100%', height: 'auto' }} 
                />
            </div>
            <input style={{ marginTop: "20px", marginLeft:"20px" }}  ref={searchRef} name={'searchName'} placeholder={'Enter Search'}/>
                    <select ref={searchTypeIdRef}>
                        <option value={""}>------chọn------</option>
                        {typeList.map(e=>(
                            <option value={e.id}>{e.name}</option>
                        ))}
                    </select>
                    <button className={'btn btn-sm btn-success'} type={'button'} onClick={handleSearch}>Search</button><br/><br/>
            <div className="container mt-4">
                <div className="row">
                    {hotelList && hotelList.map((e, i) => (
                        <div className="col-md-3 mb-4" key={i}>
                            <div className="card" style={{ width: "17rem" }}>
                                <img
                                    src={e.image}
                                    className="card-img-top"
                                    alt={e.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{e.name}</h5>
                                    <p className="card-text">
                                        Area: {e.DienTich} m² <br />
                                        Price: {e.price} VND <br />
                                    </p>
                                    <a href="#" className="btn btn-primary me-2">
                                        Detail
                                    </a>
                                    <a href="#" className="btn btn-danger">
                                        Delete
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
