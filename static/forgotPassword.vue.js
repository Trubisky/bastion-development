var forgotPasswordTemplate = `
<div class="w95">
	<h1 class="underProfilePic" style="margin-top: 30vmin;">Forgot Password</h1>
	<h1 class="b-acctop" style="font-size: 4vmin; font-weight: 500;">Enter your email below, and we'll send you a link to reset your password if the email corresponds to a valid Bastion account.</h1>
	<input class="input b-textinput" type="text" v-model="email" placeholder="Enter your email here."/>
	<br /><br />
	<button class="button b-button" v-bind:disabled="sent" style="border: none; width: 50%; margin-left: 25%;" v-on:click="resetPassword()">Send</button>
	<h1 class="b-acctop" style="font-size: 4vmin; font-weight: 500;" v-show="sent">Your reset password request has been successfully submitted.</h1>
</div>
`;


var forgotPassword = {
  template: forgotPasswordTemplate,
  data: function(){
    return{
		email: "",
		sent: false
    }
  },
  methods:{
	resetPassword: function(){
		axios.post("/forgotPassword", {email: this.email}).then(res => {
			this.sent = true;
		});
	}
  }
 }