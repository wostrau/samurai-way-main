import React, {useEffect, useState} from 'react'
import {ChatMessageType} from '../../api/chat-api'
import {useDispatch, useSelector} from 'react-redux'
import {sendMessage, startListeningMessages, stopListeningMessages} from '../../redux/chat-reducer'
import {AppStateType} from '../../redux/redux-store'


let ws: WebSocket

const createChannel = () => {
    return ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandlers.ashx')
}


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


const Chat: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startListeningMessages())
        return () => {
            dispatch(stopListeningMessages())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}


const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}


const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useDispatch()


    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
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
            onClick={sendMessageHandler}
            disabled={false}
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