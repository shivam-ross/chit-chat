
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './components/landing'
import { CreateRoom } from './components/createRoom'
import { JoinRoom } from './components/joinRoom'
import { Room } from './components/room'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/create-room' element={<CreateRoom/>}/>
          <Route path='/join-room' element={<JoinRoom/>}/>
          <Route path='/room' element={<Room/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
