import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
const [user,setUser]=useState("")
const navigate=useNavigate()
function handleConnect(){
  navigate('/Chat',{state:{user}})
}
  return (
        <div className='loginContainer'>
          <form onSubmit={(e)=>e.preventDefault()}>
            <input type="text" value={user} onChange={e=>setUser(e.target.value)} placeholder='UserName'/>
            <button onClick={handleConnect}>Connect</button>
          </form>
      </div>
  )
}

export default Login