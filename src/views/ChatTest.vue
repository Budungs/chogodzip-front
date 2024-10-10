<template>
    <div>
        <h2>채팅 메시지</h2>
        <ul>
            <li v-for="(msg, index) in messages" :key="index">
                {{ msg.senderId }}: {{ msg.message }}
            </li>
        </ul>
        <input v-model="userMessage" placeholder="메시지를 입력하세요" />
        <button @click="sendMessage({
            messageType: 'TALK',
            chatRoomId: 1,
            senderId: 100,
            message: userMessage
        })">전송</button>
    </div>
</template>


<script>
export default {
    data() {
        return {
            socket: null,
            messages: [], // 서버에서 오는 메시지를 저장할 배열
        };
    },
    methods: {
        connectWebSocket() {
            this.socket = new WebSocket('ws://localhost:9090/ws/chat');

            // 연결이 열렸을 때
            this.socket.onopen = () => {
                console.log('WebSocket 연결 열림');
                this.sendMessage({
                    messageType: 'ENTER', // 채팅방에 입장한다는 타입
                    chatRoomId: 1,        // 채팅방 ID
                    senderId: 100,        // 보낸 사람 ID
                    message: 'Hello from Vue.js!',
                });
            };

            // 서버로부터 메시지를 받을 때
            this.socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                this.messages.push(message);
                console.log('서버로부터 메시지:', message);
            };

            // 연결이 닫혔을 때
            this.socket.onclose = () => {
                console.log('WebSocket 연결 닫힘');
            };

            // 오류 발생 시
            this.socket.onerror = (error) => {
                console.error('WebSocket 오류:', error);
            };
        },

        sendMessage(payload) {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify(payload));
            }
        },
    },
    mounted() {
        this.connectWebSocket();
    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.close();
        }
    },
};
</script>
