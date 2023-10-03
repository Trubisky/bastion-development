var dashboardTemplate = `
<div class="coachBackground" style="height: 100%;" key="1">
	<img v-bind:src="$parent.profilePictureURL" class="profileImage" />
	<div class="underProfilePic">
		<div style="font-size: 4vmin;">
			<!--
			<label for="picture-upload"><i class="fa-solid fa-camera"></i></label>
			This label can just be dropped anywhere to edit the profile pic.
			-->
		</div>
		<div class="profileText">
			{{$parent.name}}
		</div>
	</div>	
	<div class="optionsContainer">
		<div style="width: 100%;" class="columns is-mobile drop" v-on:click="checkOffers()" v-show="$parent.CoachID == -1">
			<div class="column">
				<!-- : <span class="coachname">Sebastien P.</span> -->
				My Coaching Offers
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		<div style="width: 100%;" class="columns is-mobile drop" v-on:click="viewCoach()" v-show="$parent.CoachID != -1">
			<div class="column">
				My Coach: <span class="coachname">{{$parent.coachNameString}}</span>		
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		<div class="b-breaker breaker-adjust" style="opacity: 0.5;"></div>
		<div style="width: 100%;" class="columns is-mobile drop" v-on:click="openPortal()">
			<div class="column">
				My Billing Portal
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		<div class="b-breaker breaker-adjust" style="opacity: 0.5;"></div>
		<div style="width: 100%;" class="columns is-mobile drop" v-on:click="$parent.navigate('/editProfile')">
			<div class="column">
				My Profile
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		<div class="b-breaker breaker-adjust" style="opacity: 0.5;"></div>
		<div style="width: 100%;" class="columns is-mobile drop"  v-on:click="$parent.openChat()">
			<div class="column">
				Messages
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		<!-- <button class="button b-button b-centerbutton button-top">View Workouts</button> -->
		
		
	</div>
</div>
`;


var dashboard = {
  template: dashboardTemplate,
  data: function(){
    return{

    }
  },
  methods:{
	checkOffers: function(){
		axios.get("/getOffers").then(res => {
			if (res.data.length == 0){
				this.$parent.slideUpMessage("We're still looking for coaches for you - check back soon.");
			}
			else{
				this.$parent.coachingOffers = res.data;
				this.$parent.navigate("/offers");
			}
		});
	},
	openPortal: function(){
		axios.get("/getStripePortalURL").then(res => {
			window.open(res.data, '_blank');
		});
	},
	viewCoach: function(){
		this.$parent.navigate("/viewCoach");
	}
  }
 }