import { Route, Routes  } from 'react-router-dom';
import Header from './components/Header';
import SingleChat from './page/SingleChat';
import GroupChat from './page/GroupChat';
import Home from './page/Home';

import Login from './page/Login';
import Register from './page/Register';
import axios from 'axios';


function App() {
  const token = JSON.parse(localStorage.getItem("token"))
  if(token){
    axios.get(`http://localhost:8080/user/me/${token}`)
      .then(function (response) {
        if(response?.data?.user?._id){
          localStorage.setItem('user', JSON.stringify(response?.data?.user))
          localStorage.setItem("token", JSON.stringify(response?.data?.token))
          console.log(response?.data?.user)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/single' element={<SingleChat/>}></Route>
          <Route path='/group' element={<GroupChat/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
