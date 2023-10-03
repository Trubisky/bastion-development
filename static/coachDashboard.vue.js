var coachDashboardTemplate = `
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
			Coach {{$parent.name}}
		</div>
	</div>	
	<div class="optionsContainer">
		<div style="width: 100%;  cursor: pointer;" class="columns is-mobile drop" v-on:click="$parent.navigate('/clients')">
			<div class="column">
				Clients
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		<div class="b-breaker breaker-adjust" style="opacity: 0.5;"></div>
		<div style="width: 100%;  cursor: pointer;" class="columns is-mobile drop" v-on:click="$parent.navigate('/memberships')">
			<div class="column">
				Memberships
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		<div class="b-breaker breaker-adjust" style="opacity: 0.5;"></div>
		<div style="width: 100%;  cursor: pointer;" class="columns is-mobile drop" v-on:click="$parent.navigate('/coachProfile')">
			<div class="column">
				My Profile
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		<div class="b-breaker breaker-adjust" style="opacity: 0.5;"></div>
		<div style="width: 100%;  cursor: pointer;" class="columns is-mobile drop" v-on:click="openPortal()">
			<div class="column">
				My Payouts Portal
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		<div class="b-breaker breaker-adjust" style="opacity: 0.5;"></div>
		<div style="width: 100%;  cursor: pointer;" class="columns is-mobile drop" v-on:click="$parent.storedReturnRoute = '/dashboard'; $parent.openChat()">
			<div class="column">
				Messages
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		
	</div>
</div>
`;


var coachDashboard = {
  template: coachDashboardTemplate,
  data: function(){
    return{

    }
  },
  methods:{
	openPortal: function(){
		axios.get("/getStripeLoginURL").then(res => {
			window.open(res.data, '_blank');
			//window.location.href = res.data;
		})
	}
  }
 }