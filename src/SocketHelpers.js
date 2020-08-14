import * as io from 'socket.io-client'
let socket = io.connect('https://calm-temple-47594.herokuapp.com')

export const emitUid = (uid, title, email) => {
    //console.log(`SocketHelpers emitUid running uid: ${uid} title: ${title} email: ${email}`)
    socket.emit('uid', uid, title, email)
}

export const emitGetInitialMessages = (uid, title, recipient_uid) => {
    //console.log(`SocketHelpers emitGetInitialMessages running uid: ${uid} title: ${title} recipient_uid: ${recipient_uid}`)
    socket.emit('get-initial-messages', uid, title, recipient_uid)
}

export const emitCloseChatWindow = (uid, title, email) => {
    //console.log(`SocketHelpers emitCloseChatWindow running uid: ${uid} title: ${title} email: ${email}`)
    socket.emit('close-chat-window', uid, title, email)
}

export const emitCheckUnreadMessages = (uid, title) => {
    socket.emit('check-unread-msgs', uid, title)
}

export const onCheckUnreadMessages = () => {
    //console.log(`SocketHelpers onCheckUnreadMessages running`)
    const unReadStatus = []
    socket.on('check-unread-msgs', (...args) => {
        //console.log(`debug notification: chat window chat check unread client boolean ...args: ${args}`)
        const unReadObj = {
            unreadMsgs: args.length > 1 ? args[0] : args,
            numUnreadMsgs: args.length > 1 ? args[1] : null
        }
        unReadStatus.push(unReadObj)
        
    })
    return unReadStatus
}

export const onGetInitialMessages = () => {
    //console.log(`SocketHelpers onGetInitialMessages running`)

    let initialMessages = socket.on('get-initial-messages', (messages) => {
        //console.log(`debug chat: get initial messages ran, messages: ${messages}`)
        //const msgs = this.state.receivedMessages
        //msgs.push(messages)
        initialMessages.push(messages)
        //console.log(`SocketHelpers get-intial-messages listener: initialMessages: ${JSON.stringify(initialMessages)}`) 
        return initialMessages   
    })
    return initialMessages
    
}

export const onGetNewMessage = (title, receivedMessages, scrollView) => {
    //console.log(`SocketHelpers onGetNewMessage running title: ${title} recievedMessages: ${receivedMessages} scrollView: ${scrollView}`)

    const messages = receivedMessages
    socket.on(`${title}`, (message) => {
        messages.push(message)
    })
    scrollView.current.scrollToEnd()
    return messages
}

export const onToSender = (title, receivedMessages, scrollView) => {
    //console.log(`SocketHelpers onToSender running title: ${title} recievedMessages: ${receivedMessages} scrollView: ${scrollView}`)

    const messages = receivedMessages
    socket.on(`to-sender-${title}`, (message) => {
        //console.log(`to sender message: ${message}`)
        messages.push(message)
    })
    scrollView.current.scrollToEnd()
    return messages
}

export const onSendOldMessages = () => {
    //console.log('SocketHelpers onSendOldMessages running')
    let oldMessages
    socket.on('send-old-messages', (messages) => {
        //console.log(`SocketHelpers send-old-messages messages: ${messages}`)
        oldMessages = messages        
    })

    if(oldMessages) {
        return oldMessages.reverse()
    }

}

