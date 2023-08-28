var loginTemplate = `
<div>
	<div class="overlay" v-bind:class="{hidden: overlayHidden}">
		<div class="popup">
			<div class="closePopup" style="text-align: right;" v-on:click="closeOverlay()">
				<i class="fa-solid fa-circle-xmark fa-fade" style="color: #000000;"></i>
			</div>
			<br />
			{{popupMessage}}
		</div>
	</div>
	<div>
		<h1 class="promptA">Login</h1>
		<h1 class="underprompt">Sign in to your Bastion account.</h1>
	</div>
	<form onsubmit="return false" v-on:submit="login()" class="loginDesktop">
		<input class="input b-textinput" type="text" placeholder="Email" v-model="email" required>
		<input class="input b-textinput" type="password" placeholder="Password" v-model="password" required>
		<button class="button b-button create">Login</button>
	</form>
	<div class="alreadyjoined" v-on:click="$parent.navigate('/forgotPassword')">
		<span style="color: var(--teal);">Forgot password?</span>
	</div>
	<div class="alreadyjoined" v-on:click="$parent.navigate('/survey')">
		Don't have an account? <span style="color: var(--teal);">Join Today</span>
	</div>
	
</div>
`;


var login = {
  template: loginTemplate,
  data: function(){
    return{
		overlayHidden: true,
		popupMessage: "Incorrect email or password - please try again.",
		email: "",
		password: ""
    }
  },
  methods:{
	closeOverlay: function(){
		this.overlayHidden = true;
	},
	login: async function(){
		var payload = {
			email: this.email,
			password: this.password
		}
		console.log(payload);
		var _this = this;
		axios.post('/login', payload).then(async function(res){
			console.log(res.data);
			window.$cookies.set("token", res.data);
			axios.defaults.headers.common['token'] = res.data;
			_this.$parent.token = res.data;
			_this.popupMessage = "Welcome back to Bastion! You will now be redirected to the dashboard."
			_this.overlayHidden = false;		
			_this.$parent.refreshHome();
			await _this.$parent.sleep(2000);
			_this.$parent.navigate("/dashboard");
		}).catch(function(err){
			_this.overlayHidden = false;
		});
	}
  }
 }