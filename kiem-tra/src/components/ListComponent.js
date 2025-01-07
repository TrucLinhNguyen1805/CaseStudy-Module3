import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { getAllProduct, deleteProductById } from "../service/productService";


function ListComponent() {
    const [productList, setProductList] = useState([]);
    const [deleteProduct, setDeleteProduct] = useState({ id: '', name: '' }); 
    const [showDeleteModel, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const list = await getAllProduct();
                setProductList(list);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, [isLoading]);

    const handleDelete = async () => {
        await deleteProductById(deleteProduct.id);
        setProductList(prevList => prevList.filter(product => product.id !== deleteProduct.id));
        setIsLoading((pre=> !pre));
        handleClose();
    };

    const handleShowDeleteModal = (product) => {
        setDeleteProduct(product);
        setShowDeleteModal(true);
    };

    const handleClose = () => {
        setShowDeleteModal(false);
    };

    return (  
        <>
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>Danh sách sản phẩm</h2>
            <Link className="btn btn-success " style={{ color: 'white', textDecoration: 'none' }} to={'/home/create'}>Thêm mới</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên sản phẩm</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productList && productList.map((e, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td><Link to={'/home/detail/'+e.id}>{e.title}</Link></td>
                            <td>{e.description}</td>
                            <td>{e.price}</td> 
                            <td>
                                <button type="button" className="btn btn-danger " style={{ color: "white" } }onClick={()=>handleShowDeleteModal(e)}>Xóa</button>
                                <Link to={'/home/edit/'+e.id} className={'btn btn-primary'}>Sửa</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Delete Modal */}
            <Modal show={showDeleteModel} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa sản phẩm {deleteProduct.name} này không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
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