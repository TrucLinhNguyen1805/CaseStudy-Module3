import logo from './logo.svg';
import './App.css';
import ListComponent from './component/admin/ListComponent'
import {Routes,Route} from "react-router-dom"

import HeaderComponent from './component/header/HeaderComponent';
import HomePage from './component/home/HomePage';

function App() {
  return (
    <>
        <HeaderComponent/>  
        <Routes>
          <Route path={'/admin'} element={<ListComponent/>}></Route>
          <Route path={'/home'} element={<HomePage/>}></Route>
      </Routes>  
    </>
  );
}

export default App;
