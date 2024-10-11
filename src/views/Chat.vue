<template>
  <div class="wrapper">
    <div class="chat">
      <!-- 왼쪽 사용자 목록 -->
      <div class="chat-left">
        <div class="input-wrap">
          <input type="text" placeholder="Search" />
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
        <div
          v-for="(user, index) in users"
          :key="index"
          class="user"
          style="margin-bottom: 1.5rem"
          @click="selectUser(user)"
        >
          <img :src="user.image" alt="" class="icon-user" />
          <div class="user-status" style="">
            <div class="name">{{ user.name }}</div>
          </div>
          <hr />
        </div>
      </div>

      <!-- 오른쪽 채팅 화면 -->
      <div class="chat-right">
        <div class="chating">
          <img
            :src="
              selectedUserImage ||
              'https://img.freepik.com/free-photo/white-wall-background-with-scratches_1154-667.jpg?size=626&ext=jpg&ga=GA1.1.1395991368.1728518400&semt=ais_hybrid'
            "
            alt="Selected User Image"
          />
          <div class="chating-with">
            <div class="name-chat">
              <b>{{ selectedUserName || "" }}</b>
            </div>
          </div>
          <div
            class="delete-chat"
            @click="deleteChatRoom"
            style="color: #d85f5f"
          >
            채팅방 삭제하기
          </div>
        </div>

        <!-- 메시지 표시 영역 -->
        <div class="message" ref="messageContainer">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="solo-message"
          >
            <div :class="['message-text', message.isUser ? 'right' : 'left']">
              {{ message.text }}
            </div>
          </div>
        </div>

        <!-- 메시지 입력 및 추가 버튼 -->
        <div class="line-input">
          <div class="input">
            <input
              type="text"
              v-model="userMessage"
              @keypress.enter="sendMessage"
              placeholder="Type a message..."
            />
          </div>
          <button class="add btn btn-outline-secondary" @click="sendMessage">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      roomId: 1, // 테스트할 매물 ID
      senderId: 1, // 로그인한 사용자 ID
      receiverId: 2,
      userMessage: "",
      selectedUserName: "",
      selectedUserImage: "",
      messages: [],
      users: [
        {
          name: "하츄핑",
          userId: 2,
          image:
            "https://i.namu.wiki/i/U6e2CQUpk8s-HxMQNWJPF_vfzlqLAsuRCeI68CHOk8GvuagcVU0TjhuZ7o0WwpQEG7hk6Ck207c1EpIgb3E3qA.webp",
        },
        {
          name: "티니핑",
          userId: 3,
          image:
            "https://i.namu.wiki/i/g_KWbWLZvwPIarNr2apToYiutsBO8ousgVj3h-McRHmNr-A-6WNS-HDYkZLt6-dEut9KKiJeZSPyUM57FlmLsg.webp",
        },
        {
          name: "해핑",
          userId: 4,
          image:
            "https://i.namu.wiki/i/Wz_QYItt6IMcprBwNF9UARK9cN4tnEx3yJKxHlRruY77FnfUpul6NncqkY9fmQFBYaRBaoKs0zA2NOGdP035lQ.webp",
        },
      ],
    };
  },

  methods: {
    async sendMessage() {
      if (!this.userMessage.trim()) return; // 빈 메시지 방지
      console.log(this.chatRoomId, this.senderId, this.userMessage);
      if (!this.chatRoomId) {
        console.error(
          "chatRoomId가 설정되지 않았습니다. 메시지를 전송할 수 없습니다."
        );
        return;
      }
      // 메시지 추가
      this.messages.push({ text: this.userMessage, isUser: true });

      try {
        // 메시지 전송 API 호출
        await axios.post("http://localhost:8080/api/chat/message", {
          chatroomId: this.chatRoomId,
          senderId: this.senderId,
          content: this.userMessage,
        });

        this.userMessage = ""; // 입력 필드 초기화
        this.fetchMessages(); // 메시지 목록 갱신
      } catch (error) {
        console.error("Failed to send message:", error);
      }

      this.scrollToBottom();
    },
    async fetchMessages() {
      if (!this.chatRoomId) return;

      try {
        // 메시지 조회 API 호출
        const response = await axios.get(
          "http://localhost:8080/api/chat/messages",
          {
            params: { chatRoomId: this.chatRoomId },
          }
        );

        // 메시지 목록 갱신
        this.messages = response.data.map((message) => ({
          text: message.content,
          isUser: message.senderId === this.senderId, // 발신자인지 확인
        }));
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    async deleteChatRoom() {
      try {
        await axios.delete(
          `http://localhost:8080/api/chat/room/${this.chatRoomId}`
        );
        this.messages = []; // 삭제 후 메시지 목록 초기화
        alert("채팅방이 삭제되었습니다.");
      } catch (error) {
        console.error("Failed to delete chat room:", error);
      }
    },
    async selectUser(user) {
      this.receiverId = user.userId;
      this.selectedUserName = user.name;
      this.selectedUserImage = user.image;
      try {
        // 채팅방 ID를 확인하고 없는 경우 생성 요청을 보냅니다.
        const response = await axios.get(
          "http://localhost:8080/api/chat/room",
          {
            params: {
              roomId: this.roomId, // 해당 매물 ID (필요에 따라 변수 설정)
              senderId: this.senderId,
              receiverId: user.userId, // 상대방 사용자 ID
            },
          }
        );

        this.chatRoomId = response.data.chatroomId;
        console.log("채팅방 ID:", response.data.chatroomId);
        this.fetchMessages(); // 메시지 불러오기
      } catch (error) {
        console.error("Failed to fetch or create chat room:", error);
      }
      this.scrollToBottom();
    },
    scrollToBottom() {
      const messageContainer = this.$refs.messageContainer;
      messageContainer.scrollTop = messageContainer.scrollHeight;
    },
  },
  mounted() {
    this.fetchMessages().then(() => {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    });
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.user-status {
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
}

.chat {
  width: 80%;
  height: 40rem;
  display: flex;
  margin: 0 auto;
  border-radius: 30%;
  margin: 0rem auto 2rem;
  box-shadow: 0 0.125rem 0.125rem -0.125rem rgba(31, 27, 45, 0.08),
    0 0.25rem 0.75rem rgba(31, 27, 45, 0.08) !important;
}

.chat-left {
  min-height: 500px;
  width: 35%;
  min-width: 120px;
  background-color: #68c9cb;
  border-right: solid 0.5px gainsboro;
  padding: 35px;
  border-radius: 30px 0px 0px 30px;
}

.input-wrap {
  position: relative;
}

.input-wrap input {
  background-color: white;
  width: 98%;
  height: 44px;
  border: none;
  padding-left: 10px;
  padding-right: 40px;
  color: #222;
  border-radius: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.input-wrap .fa-search {
  position: absolute;
  top: 22px;
  right: 35px;
  transform: translateY(-50%);
  color: black;
}

.user {
  display: flex;
  margin-top: 15px;
}

.user:hover {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 5px;
  border-radius: 10px;
}

img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.user .icon-user {
  margin-right: 5px;
}

.user .name {
  color: white;
  font-weight: 700;
}

.user .fa-circle.offline {
  color: #e38968;
}

.user .fa-circle {
  color: var(--green);
}

.chat-right {
  width: 65%;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 0px 30px 30px 0px;
  padding: 0px 35px;
}

.chating {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15%;
  width: 90%;
  background-color: white;
  border-bottom: 1px solid gainsboro;
  border-radius: 0px 30px 0px 0px;
}

.chating .name-chat {
  color: black;
}

.chating .chating-with {
  margin-left: -350px;
  font-size: 18px;
}

.chating .fa {
  color: #d8dadf;
  font-size: 22px;
}

.message {
  width: 100%;
  overflow-y: scroll;
  height: 70%;
  max-height: 450px;
  margin-right: 10px;
}

.solo-message {
  margin: 10px;
  display: block;
  clear: both;
}

.message-text {
  margin-top: 10px;
  max-width: 90%;
  display: inline-block;
  border-radius: 10px;
  padding: 10px 15px;
  word-wrap: break-word;
  color: white;
}

.message-text.right {
  float: right;
  background-color: #6b8afd;
}

.message-text.left {
  float: left;
  background-color: #a9a9a9;
}

.line-input {
  height: 15%;
  width: 90%;
  padding: 5px 10px;
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid gainsboro;
}

.line-input .input {
  position: relative;
  width: 100%;
}

.line-input .input input {
  width: 100%;
  border: none;
  padding: 10px 20px;
}

.line-input .input:after {
  content: " ";
  display: block;
  position: absolute;
  left: 51%;
  right: 50%;
  bottom: 0%;
  height: 2px;
  background-color: #444753;
  transition: all 300ms;
}

.line-input .input:hover:after {
  left: 0%;
  right: 0%;
  bottom: 0%;
}

.line-input .add {
  padding: 9px 15px;
  width: 15%;
  margin-left: 1px;
}
</style>
