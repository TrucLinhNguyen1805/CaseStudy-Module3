import './App.css';

import {Routes,Route} from "react-router-dom"


import { ToastContainer } from 'react-toastify';
import ListComponent from './components/ListComponent';
import HeaderComponent from './header/HeaderComponent';
import DetailComponent from './components/DetailComponent';
import AddComponent from './components/AddComponent';
import EditComponent from './components/EditComponent';


function App() {
  return (
    <>
      <ToastContainer/>
      <HeaderComponent/> 
      <Routes>
        <Route path={'/home'} element={<ListComponent/>}></Route>
        <Route path={'/home/detail/:id'} element={<DetailComponent/>}></Route>
        <Route path={'/home/create'} element={<AddComponent/>}></Route>
        <Route path={'/home/edit/:id'} element={<EditComponent/>}></Route>
      </Routes>  
    </>
  );
}

export default App;
