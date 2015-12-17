# Point Socket.io - is an extension for point-one that allows you to work with sockets

## listenSocketIo - use it with compose on store creation

```js
const finalCreateStore = compose(
  listenSocketIo('ws://localhost:3000', {
    'message': CHAT_MESSAGE,
    'reply': data => {
      if (data.targetUser == myUser) {
        return {
          ...data,
          type: CHAT_REPLY_OWN
        }
      } else {
        return {
          ...data,
          type: CHAT_REPLY
        }
      }
    }
  }),
  devTools('ChatStore')
)

const store = finalCreateStore(chatReducers, {
  chat: []
})
```

Second parameter is an object with:

 - key - socket.io event
 - value - string of event type that will be used on dispatch ({...dataFromPromise, type: valueOfEventsParameter})
  or callback that must return an event

## createSocketAction - use it for create Actions that should be sent to socket.io server

```js
export let sendMessage = createSocketAction(data => {
  return {
    ...data,
    type: CHAT_MESSAGE
  }
})
```

It's also works with promise actions (but only success) and Positive Actions (also only success)
