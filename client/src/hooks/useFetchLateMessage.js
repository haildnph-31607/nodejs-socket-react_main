import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../Context/ChatContext"
import { baseUrl, getRequest } from "../utils/services"

export const useFetchLatesMessage = (chat)=>{
    const { newMessage,notification} = useContext(ChatContext)
    const [latestMessage,setLatestMessage]= useState(null)
    useEffect(()=>{
    const getMessage = async()=>{
        const response = await getRequest(`${baseUrl}/message/${chat?._id}`);
        if(response.error){
            console.log(response);
            
        }
        const lastMessage = response[response?.length - 1];
        setLatestMessage(lastMessage)
    };
    getMessage()
    },[newMessage,notification])
    return {latestMessage}
}