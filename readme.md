# Chat App Backend

This is the backend for a real-time chat application. It supports authentication, private 1-to-1 chats, message delivery tracking, and online status. Group chat features are being added.

## Features

### Authentication
- Register and log in
- JWT-based auth for APIs
- Token-based socket authentication

### Private Chat
- Create or get a private chat between two users
- Real-time messaging with Socket.io
- Delivered and seen message tracking
- Stores the last message in the chat collection
- Auto-join all chats for the user on socket connect

### Online Users
- Tracks online users
- Supports multiple tabs (multiple socket IDs per user)

## Upcoming Features

### Group Chat
- Create group
- Add/remove members
- Admin permissions
- Group name and image update
- Group messaging
- Delivered/seen logic for group messages

### Typing Indicator
- Show when someone is typing in a chat

### Unread Messages
- Track unread messages per chat

### Search
- Search users
- Search groups

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- JWT Authentication

## Project Structure
```
src/
  models/
  routes/
  middlewares/
  services/
  app.js
  server.js

sockets/
  socket.js
```

## How to Run
1. Install dependencies  
```
npm install
```

2. Start development server  
```
npm run dev
```

## Socket Events

### Events from Client
- joinChat
- chat
- messageDelivered
- messageSeen

### Events from Server
- chat
- messageDeliveredUpdate
- messagesSeenUpdate
- online_users

## Notes
- Backend is still in development.
- Group chat and more features will be added step by step.

## Author
Rajnish  
Full Stack Developer