import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services.js";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChats, setCurrentChats] = useState([]);
  const [message, setMessage] = useState(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [textMessageError, setTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState(null);
  const [notification, setNotification] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  console.log("notification", notification);

  //setting socket.io
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUser(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);
  //sendmessage
  useEffect(() => {
    if (!socket) return;
    const recipientId = currentChats?.members?.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);
  //get message client & notification
  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (res) => {
      console.log(res);

      if (currentChats?._id !== res.chatId) return;
      setMessage((prev) => [...prev, res]);
    });
    socket.on("getNotification", (res) => {
  
      
      const isChatOpen = currentChats?.members.some((id) => id === res.senderId);
      
      if (isChatOpen) {
        setNotification((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotification((prev) => [...prev,{ ...res, isRead: false } ]);
      }
    });
    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [newMessage, currentChats]);
  //getall -me+userchat
  useEffect(() => {
    (async () => {
      const response = await getRequest(`${baseUrl}/platform`);
      if (response.error) {
        return console.log(response);
      }
      const pChats = response.filter((u) => {
        let isChatCreate = false;
        if (user._id === u._id) return false;
        if (userChats) {
          isChatCreate = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreate;
      });
      setPotentialChats(pChats);
      setAllUsers(response)
    })();
  }, [userChats]);
  //get chat room
  useEffect(() => {
    const getUserChat = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        try {
          const response = await getRequest(`${baseUrl}/chat/${user?._id}`);
          setIsUserChatsLoading(false);

          if (response.error) {
            return setUserChatsError(response);
          }
          setUserChats(response);
        } catch (error) {
          setIsUserChatsLoading(false);
          setUserChatsError(error);
        }
      }
    };
    getUserChat();
  }, [user]);
  //   click create chat new
  const createChat = useCallback(async (firstId, seconId) => {
    const response = await postRequest(
      `${baseUrl}/chat`,
      JSON.stringify({
        firstId,
        seconId,
      })
    );
    if (response.error) {
      return console.log(response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChats(chat);
  }, []);
  //get messsage
  useEffect(() => {
    const getMessages = async () => {
      setIsMessageLoading(true);
      setMessageError(null);
      try {
        const response = await getRequest(
          `${baseUrl}/message/${currentChats?._id}`
        );
        setIsMessageLoading(false);

        if (response.error) {
          return setMessageError(response);
        }
        setMessage(response);
      } catch (error) {
        setIsMessageLoading(false);
        setMessageError(error);
      }
    };
    getMessages();
  }, [currentChats]);
  const sendMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something..");
      const response = await postRequest(
        `${baseUrl}/message`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );
      if (response.error) {
        return setTextMessageError(response);
      }
      setNewMessage(response);
      setMessage((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        message,
        isMessageLoading,
        messageError,
        currentChats,
        sendMessage,
        onlineUser,
        notification,allUsers
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
