<template>
    <div class="chat-test">
        <h2>Chat Test Component</h2>
        <!-- 채팅방 ID 입력 -->
        <div>
            <label for="chatRoomId">Chat Room ID:</label>
            <input type="number" v-model="chatRoomId" />
        </div>

        <!-- 메시지 전송 -->
        <div class="message-input">
            <input type="text" v-model="userMessage" placeholder="Type a message..." @keypress.enter="sendMessage" />
            <button @click="sendMessage">Send</button>
        </div>

        <!-- 메시지 목록 -->
        <div class="message-list">
            <h3>Messages:</h3>
            <div v-for="(message, index) in messages" :key="index" class="message-item">
                <span :class="['message', message.isUser ? 'user-message' : 'bot-message']">
                    {{ message.text }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            chatRoomId: 1, // 테스트할 채팅방 ID
            userMessage: "",
            senderId: 1, // 로그인한 사용자 ID
            messages: [] // 메시지 목록
        };
    },
    methods: {
        async sendMessage() {
            if (!this.userMessage.trim()) return; // 메시지가 비어있으면 전송하지 않음

            // 사용자 메시지 화면에 추가
            this.messages.push({ text: this.userMessage, isUser: true });

            try {
                // 메시지 전송 요청
                await axios.post("http://localhost:8081/api/chat/message", {
                    chatroomId: this.chatRoomId,
                    senderId: this.senderId,
                    content: this.userMessage
                });

                this.userMessage = ""; // 입력 필드 초기화
                this.fetchMessages(); // 메시지 목록 갱신
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        },
        async fetchMessages() {
            try {
                // 서버에서 메시지 가져오기
                const response = await axios.get("http://localhost:8081/api/chat/messages", {
                    params: { chatRoomId: this.chatRoomId }
                });

                // 서버에서 가져온 메시지 목록 화면에 표시
                this.messages = response.data.map((message) => ({
                    text: message.content,
                    isUser: message.senderId === this.senderId
                }));
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        }
    },
    mounted() {
        this.fetchMessages(); // 컴포넌트가 마운트되면 메시지 목록을 가져옴
    }
};
</script>

<style scoped>
.chat-test {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message-input {
    display: flex;
    margin-top: 1rem;
}

.message-input input {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.message-input button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
}

.message-list {
    margin-top: 1rem;
}

.message-item {
    padding: 0.5rem;
}

.user-message {
    color: blue;
}

.bot-message {
    color: gray;
}
</style>