var resetPasswordTemplate = `
<div class="w95">
	<h1 class="underProfilePic" style="margin-top: 30vmin;">Reset Password</h1>
	<input class="input b-textinput" type="password" v-model="p1" placeholder="Enter your new password here."/>
	<input class="input b-textinput" type="password" v-model="p2" placeholder="Retype your new password."/>
	<div v-show="showError" class="showError">Passwords do not match</div>
	<br /><br />
	<button class="button b-button" v-bind:disabled="sent" style="margin-left: 25%; width: 50%; border: none;" v-on:click="resetPassword()">Reset</button>
	<h1 class="b-acctop" style="font-size: 4vmin; font-weight: 500;" v-show="sent">Your password has successfully been reset.</h1>
	<h1 class="b-acctop" style="font-size: 4vmin; font-weight: 500;" v-show="error">Error: Password Reset Link Invalid or Expired.</h1>
</div>
`;


var resetPassword = {
  template: resetPasswordTemplate,
  data: function(){
    return{
		p1: "",
		p2: "",
		sent: false,
		error: false
    }
  },
  methods:{
	resetPassword: function(){
		if (this.p1 == "" || this.p2 == "" || this.showError){
			return;
		}
		axios.post("/resetPassword", {resetToken: this.$route.params.resetToken, password: this.p1}).then(res => {
			this.sent = true;
		}).catch(err => {
			this.error = true;
		});
	}
  },
  created: function(){
	  console.log(this.$route.params.resetToken);
  },
  computed: {
	  showError: function(){
		  return (this.p1 != "" && this.p2 != "" && this.p1 != this.p2);
	  }
  }
 }