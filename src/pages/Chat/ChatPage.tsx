import React, {useEffect, useState} from 'react'


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


    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])


    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if(!message) return
        ws.send(message)
        setMessage('')
    }

    return <div>
        <div>
            <textarea
                name="sendMessage"
                onChange={e => setMessage(e.currentTarget.value)}
                value={message}
            ></textarea>
        </div>
        <button
            onClick={sendMessage}
        >Send
        </button>
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <img
                src={message.photo}
                alt={'authorsAvatar'}
                style={{width: '30px'}}
            />
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}