import React, {useEffect} from 'react'


const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandlers.ashx')


type ChatPagePropsType = {}

const ChatPage: React.FC<ChatPagePropsType> = (props) => {
    const {} = props

    return (
        <div>
            <Chat/>
        </div>
    )
}

export default ChatPage


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


const Chat: React.FC = () => {

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            console.log(e)
        })
    }, [])

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages: any[] = []

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m: any) => <Message/>)}
    </div>
}

const AddMessageForm: React.FC = () => {
    return <div>
        <div>
            <textarea name="sendMessage"></textarea>
        </div>
        <button>Send</button>
    </div>
}

const Message = () => {
    const message: ChatMessageType = null
    return (
        <div>
            <img src={message.photo}/>
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}