import React, {useEffect, useRef, useState} from 'react'
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
    const status = useSelector((state: AppStateType) => state.chat.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startListeningMessages())
        return () => {
            dispatch(stopListeningMessages())
        }
    }, [])

    return (
        <div>
            {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}


const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    return <div
        onScroll={scrollHandler}
        style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}


const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

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
            disabled={status !== 'ready'}
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