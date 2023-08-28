var viewActiveClientTemplate = `
<div>
	<div class="chatIcon" v-on:click="$parent.storedReturnRoute = '/viewActiveClient/' + $route.params.planid; openChat()">
		<i class="fa-solid fa-comment"></i>
	</div>
	<div class="card previewCard">
		<div class="columns is-mobile" style="width: 100%;">
			<div class="column is-11">
			
			</div>
			<div class="column" style="text-align: right; font-size: 1.5rem;" v-on:click="$parent.navigate('/clients')">
				<i class="fa-solid fa-x"></i>
			</div>
		</div>
		<img v-bind:src="clientInfo.PROFILEPICTURE" class="editProfileImage" style="margin-top: 0;" />
		<div class="undertext2">
			{{clientInfo.NAME}}
		</div>	
		<br />
		<div class="srheader">
			Current Membership
		</div>	
		<div class="columns is-mobile viewAdjust">
			<div class="column is-9">
				<span>{{pricingInfo.TITLE}}</span>
			</div>
			<div class="column">
				<span>$ {{pricingInfo.PRICE}}</span>
			</div>
		</div>
		<div class="columns is-mobile aboutContentSmaller negativeAdjust" style="padding: 0; font-weight: 500;">
			<div class="column is-12">
				<span>{{pricingInfo.DESCRIPTION}}</span>
			</div>
		</div>
		<div class="b-breaker"></div>
		<br />
		<div class="srheader">
			Lifetime
		</div>
		<span style="font-weight: 500;">Training since {{startDate}}</span>
		<br /><br />
	</div>
</div>
`;


var viewActiveClient = {
  template: viewActiveClientTemplate,
  data: function(){
    return{
		clientInfo: {NAME: "", PROFILEPICTURE: ""},
		pricingInfo: {TITLE: "", DESCRIPTION: "", PRICE: 0},
		startDate: ""
    }
  },
  methods:{
	openChat: function(){
		if (this.$parent.isMobile){
			this.$parent.navigate('/chat/' + this.clientInfo.ID);
		}
		else{
			this.$parent.desktopChatID = this.clientInfo.ID;
			eventBus.$emit("chat-opened", {chatID: this.clientInfo.ID});
			eventBus.$emit("chatWindow-opened");
			$("#desktopChatWindow").fadeOut(1);
			$("#desktopChatClient").fadeIn(300);		
			$("#desktopChatHub").fadeIn(500);
			
		}
	}
  },
  created: function(){
	axios.get("/viewActiveClient/" + this.$route.params.planid).then(res =>{
		this.clientInfo = res.data.clientInfo;
		this.pricingInfo = res.data.pricingInfo;
		this.startDate = res.data.startDate;
	});
  }
 }