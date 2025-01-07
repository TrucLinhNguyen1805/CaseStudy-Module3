import './App.css';
import ListComponent from './component/admin/ListComponent'
import {Routes,Route} from "react-router-dom"
import HeaderComponent from './component/header/HeaderComponent';
import HomePage from './component/home/HomePage';
import DetailPage from './component/home/DetailPage';
import { ToastContainer } from 'react-toastify';
import AddComponent from './component/admin/AddComponent';
import EditComponent from './component/admin/EditComponent';

function App() {
  return (
    <>
      <ToastContainer/>
      <HeaderComponent/>  
      <Routes>
          <Route path={'/admin'} element={<ListComponent/>}></Route>
          <Route path={'/home'} element={<HomePage/>}></Route>
          <Route path={'/home/detail/:id'} element={<DetailPage/>}></Route>
          <Route path={'/home/create'} element={<AddComponent/>}></Route>
          <Route path={'/home/edit/:id'} element={<EditComponent/>}></Route>
      </Routes>  
    </>
  );
}

export default App;
