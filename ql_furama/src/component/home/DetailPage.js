import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getFuramaById } from '../../service/hotelService';
import 'bootstrap/dist/css/bootstrap.min.css';

function DetailPage() {
    const [hotel, setHotel] = useState({
        id: "",
        name: "",
        DienTich: "",
        price: "",
        people: "",
        Kieuthue: "",
        image: "",
        type: "",
    
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const p = await getFuramaById(id);
                setHotel(p);
            } catch (error) {
                console.error("Error fetching hotel details:", error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="container mt-4">
            <h5 className="card-title">Furama - {hotel.name}</h5>
            <div style={{marginTop: "20px"}} className="card shadow-sm border-light">
                <img
                    src={hotel.image}
                    className="card-img-top"
                    alt={hotel.name}
                    style={{ height: "auto", objectFit: "cover" }}
                />
                <div className="card-body">
                    <p className="card-text"><strong></strong> {hotel.content}</p>
                    <p className="card-text"><strong>Area:</strong> {hotel.DienTich} m²</p>
                    <p className="card-text"><strong>Price:</strong> {hotel.price} VND</p>
                    <p className="card-text"><strong>Max People:</strong> {hotel.people} people</p>
                    <p className="card-text"><strong>Rental Type:</strong> {hotel.Kieuthue}</p>
                   
                </div>
            </div>
        </div>
    );
}

export default DetailPage;