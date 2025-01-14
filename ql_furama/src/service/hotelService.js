import axios from "axios"
let url = `http://localhost:8080/furama`
    export async function getAllFurama() {
        try{
            const response = await axios.get(`${url}`);
            console.log(response); 
            return response.data;
        
        }catch(e){
            console.log("Lỗi"+e);
        }
        // return studentList;
    }
    export async function searchFuramaByName(searchName, typeId){
        let url1 = `${url}?name_like=${searchName}&type.id=${typeId}&_sort=name&_order=asc`
        if(typeId===""){
            url1 = `${url}?name_like=${searchName}&_sort=name&_order=asc`
        }
        try{
            const response = await axios.get(url1);
            return response.data;
        }catch(e){
            console.log("Lỗi"+e);  
            return null;
        }
    }
    export async function getFuramaById(id) {
        try{
            const response = await axios.get(`${url}/`+id);
            console.log(response); 
            return response.data;
        }catch(e){
            console.log("Lỗi"+e);  
            return null;
        }
        
    }
    export async function deleteFuramaById(id){
        try{
            const response = await axios.delete(`${url}/`+id);
            console.log(response); 
            return response.data;
        }catch(e){
            console.log("Lỗi"+e);  
            return null;
        }
    }
    export async function addNewFurama(hotel) {
        // kết nối API để thêm mới
        try{
            return axios.post(url, hotel);
            
        }catch(e){
            console.log("Lỗi"+e);
        }
    } 

    export async function editNewFurama(id,hotel) {
            // kết nối API để thêm mới
        try{
            const response = await axios.put(`${url}/`+id , hotel);
                
        }catch(e){
            console.log("Lỗi"+e);
        }
    } 
    