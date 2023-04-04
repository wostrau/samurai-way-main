import React, {useEffect, useState} from 'react'


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


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


const Chat: React.FC = () => {

    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => setTimeout(createChannel, 3000)

        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandlers.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages ws={ws}/>
            <AddMessageForm ws={ws}/>
        </div>
    )
}

const Messages: React.FC<{ ws: WebSocket | null }> = ({ws}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }

        ws?.addEventListener('message', messageHandler)

        return () => ws?.removeEventListener('message', messageHandler)

    }, [ws])


    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ws}) => {

    const [message, setMessage] = useState('')

    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => setReadyStatus('ready')

        ws?.addEventListener('open', openHandler)

        return () => ws?.removeEventListener('open', openHandler)

    }, [ws])

    const sendMessage = () => {
        if (!message) return
        ws?.send(message)
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
            disabled={readyStatus !== 'ready'}
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