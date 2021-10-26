import React,{useState} from "react";
import { 
    ChatEngineWrapper, Socket ,
    ChatEngine, 
    ChatList, ChatCard, NewChatForm,
    ChatFeed, ChatHeader, IceBreaker, MessageBubble, IsTyping, ConnectionBar, NewMessageForm,
    ChatSettings, ChatSettingsTop, PeopleSettings, PhotosSettings, OptionsSettings
} from 'react-chat-engine'
const Chat = () => {

  const [user, setUser] = useState('namlh')

  return (
    <div>
      <input type="text" onChange={(e) =>{setUser(e.target.value)}}/>
      <ChatEngine
        projectID="54c60a1b-9c14-4b30-b402-1a3fab7ccf08"
        userName={user}
        userSecret="123456789"
        height="85vh"
        renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
        renderChatCard={(chat, index) => <ChatCard key={`${index}`} chat={chat} />}
        renderNewChatForm={(creds) => <NewChatForm creds={creds} />} 
        renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
        renderChatHeader={(chat) => <ChatHeader />}
        renderIceBreaker={(chat) => <IceBreaker />}
        renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => <MessageBubble lastMessage={lastMessage} message={message} nextMessage={nextMessage} chat={chat} />}
        renderIsTyping={(typers) => <IsTyping />}
        renderConnectionBar={(chat) => <ConnectionBar />}
        renderNewMessageForm={(creds, chatID) => <NewMessageForm />}
        renderChatSettings={(chatAppState) => <ChatSettings {...chatAppState} />}
        renderChatSettingsTop={(creds, chat) => <ChatSettingsTop />}
        renderPeopleSettings={(creds, chat) => <PeopleSettings />}
        renderPhotosSettings={(chat) => <PhotosSettings />}
        renderOptionsSettings={(creds, chat) => <OptionsSettings />}
      />
    </div>
  );
};

export default Chat;
