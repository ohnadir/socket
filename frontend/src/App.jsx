import { Route, Routes  } from 'react-router-dom';
import Header from './components/Header';
import SingleChat from './page/SingleChat';
import GroupChat from './page/GroupChat';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import { useLoadUserQuery } from './Redux/slice/anotherAuthSlice';
import { SocketProvider } from './providers/Sockets';
import WebRTC from './page/WebRTC';
import Room from './page/Room';

function App() {
  const { data: user} = useLoadUserQuery();
  console.log(user)
  
  return (
    <>
      <div>
        <Header/>
        {/* <SocketProvider> */}
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/single' element={<SingleChat/>}></Route>
            <Route path='/group' element={<GroupChat/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/rtc' element={<WebRTC/>}></Route>
            <Route path='/room/:roomId' element={<Room/>}></Route>
          </Routes>
        {/* </SocketProvider> */}
      </div>
    </>
  )
}

export default App
