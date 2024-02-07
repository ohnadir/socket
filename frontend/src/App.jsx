import { Route, Routes  } from 'react-router-dom';
import Header from './components/Header';
import SingleChat from './page/SingleChat';
import GroupChat from './page/GroupChat';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import { useLoadUserQuery } from './Redux/slice/anotherAuthSlice';
import Cookies from 'js-cookie';


function App() {

  const token = JSON.parse(localStorage.getItem("token"));
  
  const { data: user} = useLoadUserQuery(token);

  if(user?.token){
    Cookies.set('token', (user?.token), { expires: 7 })
    console.log(user?.user)

  }
  const data = Cookies.get('token');
  console.log(data);

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
