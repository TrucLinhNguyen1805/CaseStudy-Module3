import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import { getAllFurama, deleteFuramaById} from "../../service/hotelService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


function ListComponent() {
    const [hotelList, setHotelList] = useState([]);
    const [deleteHotel, setDeleteHotel] = useState({ id: '', name: '' }); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
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
    }, [isLoading]);

    const handleDelete = async () => {
        await deleteFuramaById(deleteHotel.id);
        setHotelList(prevList => prevList.filter(hotel => hotel.id !== deleteHotel.id));
        setIsLoading((pre=> !pre));
        handleCloseDeleteModal();
    };

    const handleShowDeleteModal = (hotel) => {
        setDeleteHotel(hotel);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>Quản lý khách sạn</h2>
            {/* <button className={'btn btn-success float-end'}> 
                <Link style={{ color: 'white', textDecoration: 'none' }} to={'/home/create'}>Add new Hotel</Link> 
            </button> */}
            <Link className="btn btn-success float-end" style={{ color: 'white', textDecoration: 'none' }} to={'/home/create'}>Add new Hotel</Link> 
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
                        <th>Content</th>
                        <th>Loại</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        
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
                            <td><img src={e.image} alt={e.name} style={{ width: '100px', height: 'auto' }} /></td>
                            <td>{e.content}</td>
                            <td>{e.type.name}</td>
                            <td>
                                <Link to={'/home/edit/'+e.id} className={'btn btn-warning'}>Edit</Link>
                            </td>
                            <td>
                                <button type="button" className="btn btn-warning" style={{ color: "white" }} onClick={() => handleShowDeleteModal(e)}>Delete</button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Hotel</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa thông tin phòng {deleteHotel.name} này không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            
        </>
    );
}

export default ListComponent;