
import {Route,Routes} from 'react-router-dom'
import GroupChat from './GroupChat.jsx'
import Login from './Login.jsx'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Chat' element={<GroupChat/>} />
      </Routes>
    </>
  )
}

export default App
