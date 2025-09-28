import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import './index.css'
const GroupChat = () => {
const [isMsgBlank,setIsMsgBlank]=useState(true)
const [allmessages,setAllMessages]=useState([])
const [socket,setSocket]=useState(null)
const locate=useLocation()
const user=locate.state?.user
const [message,setMessage]=useState({user:user,message:""})
const [count,setCount]=useState(0)

useEffect(()=>{
  const ws=new WebSocket(`ws:${import.meta.env.VITE_SERVER_URL}`)

  ws.onopen=()=>{
    console.log("Client Connected")
  }
  ws.onmessage=(event)=>{
    const data=JSON.parse(event.data)
    if(data.type=="chat"){
      const msg=JSON.parse(data.text)
      setAllMessages(prev => [...prev,msg])
    }
    else if(data.type=="count"){
      setCount(data.count)
      
    }
  }
  ws.onclose=()=>{
    console.log("Client left")
  }
  setSocket(ws)
  return ()=>ws.close()

},[])

function handleMsgSend(){
  if(!isMsgBlank && socket && socket.readyState === WebSocket.OPEN){
    socket.send(JSON.stringify(message))
    setMessage({...message,message:""})
    setIsMsgBlank(true)
  }
}

  return (
    <div className="mainGrpChatContainer">
      <div className="Counter">Active users: {count}</div>
      <div className="displayMsgs">
        {
          allmessages.map((ele,index)=>{
            return <div key={index}><p>{ele.user}</p><h3>{ele.message}</h3></div>
          })
        }
      </div>
      <div>
        <form onSubmit={e=>e.preventDefault()}>
          <input type="text"  value={message.message} 
          onChange={e=>{setMessage({...message,message:e.target.value});
          e.target.value.trim().length==0?setIsMsgBlank(true):setIsMsgBlank(false)}}/>

          <button onClick={handleMsgSend} style={{backgroundColor:isMsgBlank?"black":"ightblue"}}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default GroupChat