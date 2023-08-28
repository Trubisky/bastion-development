var createAccountTemplate = `
<div>
	<div class="overlay" v-bind:class="{hidden: overlayHidden}">
		<div class="popup">
			<div style="text-align: right;"class="closePopup" v-on:click="closeOverlay()">
				<i class="fa-solid fa-circle-xmark fa-fade" style="color: #000000;"></i>
			</div>
			<div style="text-align: center; font-weight: 900; font-size: 8vmin">
				{{popupHeader}}
			</div>
			<br />
			{{popupMessage}}
		</div>
	</div>
	<div>
		<h1 class="promptA">CREATE ACCOUNT</h1>
		<h1 class="underprompt">Please enter your information:</h1>
	</div>
	<form onsubmit="return false" v-on:submit="createAccount()" class="loginDesktop">
		<input class="input b-textinput" type="text" placeholder="Email" v-model="email" required>
		<input class="input b-textinput" type="password" placeholder="Password" v-model="password" required>
		<input class="input b-textinput" type="password" placeholder="Confirm Password" v-model="password2" required>
		<div v-show="showError" class="showError">Passwords do not match</div>
		<button class="button b-button create">Create Account</button>
	</form>
</div>
`;


var createAccount = {
  template: createAccountTemplate,
  data: function(){
    return{
		overlayHidden: false,
		popupHeader: "Thank you!",
		popupMessage: "Thank you for completing the survey! In order to find a coach, the last step is to create your free account.",
		email: "",
		password: "",
		password2: ""
    }
  },
  methods:{
	closeOverlay: function(){
		this.overlayHidden = true;
	},
	createAccount: async function(){
		var payload = {
			email: this.email,
			password: this.password,
			surveyAnswers: this.$parent.surveyAnswers,
			isCoach: 0
		}
		console.log(payload);
		var _this = this;
		axios.post('/createAccount', payload).then(async function(res){
			console.log(res.data);
			window.$cookies.set("token", res.data);
			axios.defaults.headers.common['token'] = res.data;
			_this.$parent.token = res.data;
			_this.popupHeader = "Your Information Has Been Submitted!";
			_this.popupMessage = "We are gathering coaches for you and we will notify you when your options are ready in 1-2 days."
			_this.overlayHidden = false;
			
			_this.$parent.refreshHome();
		
		
			await _this.$parent.sleep(2000);
			_this.$parent.navigate("/dashboard");
		}).catch(function(err){
			_this.popupHeader = "An error has occured.";
			_this.popupMessage = "A Bastion account with this email address already exists. Try logging in.";
			_this.overlayHidden = false;
		});
	}
  },
  computed: {
	  showError: function(){
		  return (this.password != "" && this.password2 != "" && this.password != this.password2);
	  }
  }
 }