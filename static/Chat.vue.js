var chatTemplate = `
<div>
	<div class="top-alert" v-on:click="returnPage()">
		<span style="text-align: left;"><i class="fa-sharp fa-solid fa-arrow-left"></i></span>
		Chatting with {{name}}
	</div>
	<br />
	<div style="height: 75%; overflow-y: scroll;" id="chatContainer">
		<div v-for="message in messages">
			<div class="columns is-mobile chatBox" v-if="message.FROMID == fromid" >
				<div class="column is-2">
					<img class="messageImage" v-bind:src="profilePicture" />
				</div>
				<div class="column is-8 box" style="word-wrap: break-word;">
					{{message.MESSAGE}}
				</div>
				<div class="column is-2">
				
				</div>
			</div>
			<div class="columns is-mobile chatBox" v-if="message.FROMID != fromid" >
				<div class="column is-2">
					
				</div>
				<div class="column is-8 box" style="word-wrap: break-word;">
					{{message.MESSAGE}}
				</div>
				<div class="column is-2">
					<img class="messageImage" v-bind:src="$parent.profilePictureURL" />
				</div>
			</div>
		</div>
		
	</div>
	<div class="sendbar">
		<input class="input" type="text" style="width: 90%;" v-model="message" placeholder="Start Typing.."/>
		<span class="sendMessageIcon" v-on:click="sendMessage()"><i class="fa-solid fa-paper-plane"></i></span>
	</div>
</div>
`;

var chatDesktop = {
  template: chatTemplate,
  data: function(){
    return{
		messages: [],
		name: "",
		profilePicture: "",
		message: "",
		fromid: 0
    } 
  },
  methods:{
	returnPage: async function(){
		$("#desktopChatClient").fadeOut(300);
		await this.$parent.sleep(300);
		$("#desktopChatWindow").fadeIn(300);
	},
	sendMessage: function(){
		if (this.messsage == ""){
			return;
		}
		this.messages.push({FROMID: 0, MESSAGE: this.message}); 
		axios.post("/sendMessage", {toID: this.fromid, message: this.message});
		this.message = "";
	}
  },
  created: function(){
	
	eventBus.$on("chat-opened", (input) => {
      console.log("my-event called on global event bus");
	  console.log(input);
	  this.fromid = input.chatID;
	  
		axios.get("/getMessages/" + input.chatID).then(res => {
			this.messages = res.data;
		});
		axios.get("/getChatInfo/" + input.chatID).then(res => {
			this.name = res.data.NAME;
			this.profilePicture = res.data.PROFILEPICTURE;
		});
		
    });
	
	
  },
  watch: {
	  messages: async function(val){
		  console.log("did something");
		  await this.$parent.sleep(200);
		  var chatContainer = document.getElementById("chatContainer");
		  chatContainer.scrollTop = chatContainer.scrollHeight;
	  }
  }
}

var chat = {
  template: chatTemplate,
  data: function(){
    return{
		messages: [],
		name: "",
		profilePicture: "",
		message: "",
		fromid: 0
    }
  },
  methods:{
	returnPage: function(){
		this.$parent.navigate("/messageHome");
	},
	sendMessage: function(){
		if (this.messsage == ""){
			return;
		}
		this.messages.push({FROMID: 0, MESSAGE: this.message}); 
		axios.post("/sendMessage", {toID: this.$route.params.fromid, message: this.message});
		this.message = "";
	}
  },
  created: function(){
	this.fromid = this.$route.params.fromid;
	axios.get("/getMessages/" + this.$route.params.fromid).then(res => {
		this.messages = res.data;
	});
	axios.get("/getChatInfo/" + this.$route.params.fromid).then(res => {
		this.name = res.data.NAME;
		this.profilePicture = res.data.PROFILEPICTURE;
	});
  },
  watch: {
	  messages: async function(val){
		  console.log("did something");
		  await this.$parent.sleep(200);
		  var chatContainer = document.getElementById("chatContainer");
		  chatContainer.scrollTop = chatContainer.scrollHeight;
	  }
  }
 }