var router = new VueRouter({
  routes: [
    {path: "/", component: home},
	{path: "/about", component: about},
	{path: "/createAccount", component: createAccount},
	{path: "/survey", component: survey},
	{path: "/login", component: login},
	{path: "/dashboard", component: dashboard},
	{path: "/coachDashboard", component: coachDashboard},
	{path: "/adminDashboard", component: adminDashboard},
	{path: "/editProfile", component: editProfile},
	{path: "/coachProfile", component: coachProfile},
	{path: "/editSubscription", component: editSubscription},
	{path: "/transactions", component: transactions},
	{path: "/memberships", component: memberships},
	{path: "/clients", component: clients},
	{path: "/adminCoaches", component: adminCoaches},
	{path: "/adminClients", component: adminClients},
	{path: "/clientPreview/:id", component: clientPreview},
	{path: "/messageHome", component: messageHome},
	{path: "/chat/:fromid", component: chat},
	{path: "/offers", component: offers},
	{path: "/coachOffer/:offerid", component: coachOffer},
	{path: "/viewCoach", component: viewCoach},
	{path: "/viewActiveClient/:planid", component: viewActiveClient},
	{path: "/adminViewCoach/:coachid", component: adminViewCoach},
	{path: "/adminViewCoachClients/:coachid", component: adminViewCoachClients},
	{path: "/adminViewClient/:clientid", component: adminViewClient},
	{path: "/coachJoin/:token", component: coachJoin},
	{path: "/forgotPassword", component: forgotPassword},
	{path: "/resetPassword/:resetToken", component: resetPassword},
	{path: "/thankYou", component: thankYou},
	{path: "/review1", component: review1}
  ],
  base: "/"
});
Vue.use(VueRouter);

var eventBus = new Vue();


Vue.component('chat-window', messageHomeDesktop);
Vue.component('chat-client', chatDesktop);
Vue.component('offer-popup', coachOffer);

var app = new Vue({
  el: "#app",
  router: router,
  data: function(){
    return {
		token: "",
		showLoading: false,
		isMobile: true,
		id: 0,
		name: "",
		about: "",
		isCoach: 0,
		CoachID: -1,
		isAdmin: 0,
		location: null,
		croppr: null,
		showCroppr: false,
		cropprSrc: "",
		profilePictureURL: "",
		showHamburger: false,
		surveyAnswers: [],
		sliderMessage: "Test",
		playMessageIn: false,
		playMessageOut: false,
		storedReturnRoute: "/dashboard",
		coachingOffers: [],
		coachNameString: "",
		desktopChatID: 0
    }
  },
  methods: {
	logOut: function(){
		window.$cookies.set("token", "");
		this.$router.push({path: "/"});
		location.reload();
	},
	toggleHamburger: function(){
		this.showHamburger = !this.showHamburger;
	},
	slideUpMessage: async function(message){
		this.sliderMessage = message;
		this.playMessageIn = true;
		await this.sleep(3000);
		this.playMessageIn = false;
		this.playMessageOut = true;
		await this.sleep(1000);
		this.playMessageOut = false;
	},
	displayLoad: async function(ms){
		var _this = this;
		return new Promise(async function(resolve, reject){
			_this.showLoading = true;
			$("#showLoading").fadeIn(300);
			await _this.sleep(ms - 600);
			_this.showLoading = false;
			$("#showLoading").fadeOut(300);
			resolve();
		});
	},
	uploadPicture: async function(e){
		var reader = new FileReader();
		var _this = this;
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = async () => {
            console.log(reader.result);
			this.cropprSrc = reader.result;
			this.showCroppr = true;
			await this.sleep(500);
			this.croppr = new Croppr('#cropprImage', {
			  aspectRatio: 1
			});
			/*
			
			*/
        };
	},
	saveCrop: async function(){
		console.log(this.croppr.getValue());
		var _this = this;
		var payload = {
			picture: this.cropprSrc,
			options: this.croppr.getValue()
		}
		this.croppr = null;
		axios.post("/updateProfilePicture", payload).then(function(res){
			_this.slideUpMessage("Successfully updated profile picture.");
			_this.profilePictureURL = res.data;
			_this.showCroppr = false;
			eventBus.$emit("pfp-updated");
		});
	},
	refreshHome: function(){
		return axios.get("/getProfileInfo").then(res => {
			console.log(res.data);
			this.profilePictureURL = res.data.PROFILEPICTURE;
			this.name = res.data.NAME;
			this.about = res.data.ABOUT;
			this.isCoach = res.data.ISCOACH;
			this.id = res.data.ID;
			this.location = res.data.LOCATION;
			this.CoachID = res.data.COACHID;
			this.isAdmin = res.data.ADMIN;
			if (this.CoachID != -1){
				axios.get("/getCoachNameString/" + this.CoachID).then(res2 => {
					this.coachNameString = res2.data;
				});
			}
		});
	},
	navigate: function(pageURL){
		if (pageURL == "/dashboard" && this.isCoach == 1 && !this.isAdmin){
			//force redirect to coach dashboard if they try to navigate to client dashboard and are logged in as a coach
			this.$router.push({path: "/coachDashboard"});
			this.showHamburger = false;
			return;
		}
		if (pageURL == "/dashboard" && this.isAdmin == 1){
			//force redirect to admin dashboard if they try to navigate to any other dashboard and are logged in as an admin
			this.$router.push({path: "/adminDashboard"});
			this.showHamburger = false;
			return;
		}
		this.$router.push({path: pageURL});
		this.showHamburger = false;
	},
	sleep: function(ms){
	  return new Promise(function(resolve, reject){
		setTimeout(resolve, ms);
	  });
	},
	fixOrientation: function(){
		if (window.innerWidth > window.innerHeight){
			this.isMobile = false;
		}
		else{
			this.isMobile = true;
		}
	},
	openChat: function(){
		if (this.isMobile){
			this.navigate("/messageHome");
		}
		else{
			this.openChatDesktop();
		}
	},
	closeChatDesktop: function(){
		$("#desktopChatHub").fadeOut(500);
	},
	openChatDesktop: function(){
		eventBus.$emit("chatWindow-opened");
		$("#desktopChatHub").fadeIn(500);
	}
  },
  created: function(){
	
	if (window.$cookies.get("token")){
		this.token = window.$cookies.get("token");
		axios.defaults.headers.common['token'] = this.token;
		var _this = this;
		this.refreshHome();
	}
	this.fixOrientation();
	window.onresize = this.fixOrientation;	
  },
  computed: {
	  route: function(){
		  return this.$route.path;
	  }
  }
});

