import React, { useContext } from 'react';
import { ChatContext } from '../../Context/ChatContext';
import { AuthContext } from '../../Context/AuthContext';

const PotentialChats = () => {
    const {user} = useContext(AuthContext)
    const {potentialChats,createChat,onlineUser}=useContext(ChatContext)
 
    
  return (
    <div className='all-users'>
      {potentialChats && potentialChats.map((u,index)=>{
       return (
        <div className="single-user" key={index} onClick={()=>createChat(user._id,u._id)}>{u.name}
        {onlineUser?.some((on)=>on.userId === u._id) && <span className="user-online"></span>}
        </div>
       )
      })}
    </div>
  );
}

export default PotentialChats;
