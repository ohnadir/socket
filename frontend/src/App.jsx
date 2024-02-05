
import { Route, Routes  } from 'react-router-dom';
import Header from './components/Header';
import SingleChat from './page/SingleChat';
import GroupChat from './page/GroupChat';
import Home from './page/Home';
function App() {
  return (
    <>
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/single' element={<SingleChat/>}></Route>
          <Route path='/group' element={<GroupChat/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
