import React, { useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ConversationHeader,
  MessageSeparator,
  TypingIndicator,
  EllipsisButton,
  VideoCallButton,
  VoiceCallButton,
  ExpansionPanel,
} from "@chatscope/chat-ui-kit-react";

const Chat = () => {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [user, setUser] = useState("namlh");
  return (
    <div
      style={{
        height: "600px",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={true}>
          <Search placeholder="Search..." />
          <ConversationList>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            >
              <Avatar src="" name="Lilly" status="available" />
            </Conversation>

            <Conversation
              name="Joe"
              lastSenderName="Joe"
              info="Yes i can do it for you"
            >
              <Avatar src="" name="Joe" status="dnd" />
            </Conversation>

            <Conversation
              name="Emily"
              lastSenderName="Emily"
              info="Yes i can do it for you"
              unreadCnt={3}
            >
              <Avatar src="" name="Emily" status="available" />
            </Conversation>

            <Conversation
              name="Kai"
              lastSenderName="Kai"
              info="Yes i can do it for you"
              unreadDot
            >
              <Avatar src="" name="Kai" status="unavailable" />
            </Conversation>

            <Conversation
              name="Akane"
              lastSenderName="Akane"
              info="Yes i can do it for you"
            >
              <Avatar src="" name="Akane" status="eager" />
            </Conversation>

            <Conversation
              name="Eliot"
              lastSenderName="Eliot"
              info="Yes i can do it for you"
            >
              <Avatar src="" name="Eliot" status="away" />
            </Conversation>

            <Conversation
              name="Zoe"
              lastSenderName="Zoe"
              info="Yes i can do it for you"
            >
              <Avatar src="" name="Zoe" status="dnd" />
            </Conversation>

            <Conversation
              name="Patrik"
              lastSenderName="Patrik"
              info="Yes i can do it for you"
            >
              <Avatar src="" name="Patrik" status="invisible" />
            </Conversation>

            <Conversation
              name="Patrik"
              lastSenderName="Patrik"
              info="Yes i can do it for you"
            >
              <Avatar src="" name="Patrik" status="invisible" />
            </Conversation>
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src="" name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <EllipsisButton orientation="vertical" />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content="Zoe is typing" />}
          >
            <MessageSeparator content="Saturday, 30 November 2019" />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "single",
              }}
            >
              <Avatar src="" name="Zoe" />
            </Message>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "single",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "first",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "normal",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "normal",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "last",
              }}
            >
              <Avatar src="" name="Zoe" />
            </Message>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "first",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "normal",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "normal",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "last",
              }}
            />

            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "first",
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "last",
              }}
            >
              <Avatar src="" name="Zoe" />
            </Message>
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
          />
        </ChatContainer>
        <Sidebar position="right">
          <ExpansionPanel open title="INFO">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="LOCALIZATION">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="MEDIA">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="SURVEY">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="OPTIONS">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
        </Sidebar>
      </MainContainer>
    </div>
  );
};

export default Chat;
