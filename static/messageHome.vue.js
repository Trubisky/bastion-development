var messageHomeTemplate = `
<div>
	<div class="top-alert" v-on:click="returnPage()">
		<i class="fa-sharp fa-solid fa-arrow-left" v-show="$parent.isMobile"></i>You have <b>{{messageHeaders.length}}</b> active conversation(s).
	</div>
	<br />
	<div class="columns is-mobile messageRow" v-for="conversation in messageHeaders" v-on:click="openChat(conversation.fromID)">
		<div class="column is-2" style="align-items: center; display: flex;">
			<img class="messageImage" v-bind:src="conversation.profilePicture" />
		</div>
		<div class="column messageGreeting">
			<b>{{conversation.name}}</b>
			<br />
			{{conversation.message}}
		</div>
	</div>
</div>
`;


var messageHome = {
  template: messageHomeTemplate,
  data: function(){
    return{
		messageHeaders: []
    }
  },
  methods:{
	openChat: function(userID){
		this.$parent.navigate('/chat/' + userID);
	},
	returnPage: function(){
		this.$parent.navigate(this.$parent.storedReturnRoute);
	}
  },
  created: function(){
	axios.get("/getMessageHeaders").then(res => {
		var resultArray = [];
		var seenKeys = [];
		for (var message of res.data){
			if (seenKeys.includes(message.fromID)){
				continue;
			}
			seenKeys.push(message.fromID);
			resultArray.push(message);
		}
		this.messageHeaders = resultArray;
	});
  }
 }
 
 var messageHomeDesktop = {
  template: messageHomeTemplate,
  data: function(){
    return{
		messageHeaders: []
    }
  },
  methods:{
	openChat: async function(userID){
		this.$parent.desktopChatID = userID;
		eventBus.$emit("chat-opened", {chatID: userID});
		$("#desktopChatWindow").fadeOut(300);
		await this.$parent.sleep(300);
		$("#desktopChatClient").fadeIn(300);
	},
	returnPage: function(){
		this.$parent.closeChatDesktop();
	}
  },
  created: function(){
	  
	 eventBus.$on("chatWindow-opened", () => {
      axios.get("/getMessageHeaders").then(res => {
			var resultArray = [];
			var seenKeys = [];
			for (var message of res.data){
				if (seenKeys.includes(message.fromID)){
					continue;
				}
				seenKeys.push(message.fromID);
				resultArray.push(message);
			}
			this.messageHeaders = resultArray;
		});
		
	});
	
  }
 }