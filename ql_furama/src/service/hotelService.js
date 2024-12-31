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
        if(typeId==""){
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
    