import axios from "axios"
let url = `http://localhost:3000/products`
    export async function getAllProduct() {
        try{
            const response = await axios.get(`${url}`);
            console.log(response); 
            return response.data;
        
        }catch(e){
            console.log("Lỗi"+e);
        }
        // return studentList;
    }
    export async function getProductById(id) {
        try{
            const response = await axios.get(`${url}/`+id);
            console.log(response); 
            return response.data;
        }catch(e){
            console.log("Lỗi"+e);  
            return null;
        }
        
    }
    export async function deleteProductById(id){
        try{
            const response = await axios.delete(`${url}/`+id);
            console.log(response); 
            return response.data;
        }catch(e){
            console.log("Lỗi"+e);  
            return null;
        }
    }
    export async function addNewProduct(product) {
        // kết nối API để thêm mới
        try{
            return axios.post(url, product);    
        }catch(e){
            console.log("Lỗi"+e);
        }
    } 

    export async function editNewProduct(id,product) {
            // kết nối API để thêm mới
        try{
            const response = await axios.put(`${url}/`+id , product);
                
        }catch(e){
            console.log("Lỗi"+e);
        }
    } 
    
