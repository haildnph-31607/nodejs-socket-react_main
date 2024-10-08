import  { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../Context/AuthContext';
import PotentialChats from '../components/chat/PotentialChats';
import ChatBox from '../components/chat/ChatBox';

const Chat = () => {
  const {user} = useContext(AuthContext)
  const {userChats,userChatsError,isUserChatsLoadings,updateCurrentChat} = useContext(ChatContext);

  
  return (
    <Container>
      <PotentialChats/>
         {userChats?.length < 1 ? null : <Stack direction='horizontal' gap={4} className='align-items-start'>
          <Stack className='flex-grow-0 messages-box pe-3' gap={3}>
            {isUserChatsLoadings && <p>Loading....</p>}
            {userChats?.map((chat,index)=>{
              return (
                <div key={index} onClick={()=>updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user}/>
                </div>
              )
            })}
          </Stack>
          <ChatBox/>
          </Stack>}
    </Container>
  )
}

export default Chat