var adminDashboardTemplate = `
<div style="background-color: var(--b-darkblack); height: 100%;" key="1">
	<img v-bind:src="$parent.profilePictureURL" class="profileImage" />
	<div class="underProfilePic">
		<div style="font-size: 4vmin;">
			<!--
			<label for="picture-upload"><i class="fa-solid fa-camera"></i></label>
			This label can just be dropped anywhere to edit the profile pic.
			-->
		</div>
		<div class="profileText">
			Administrator {{$parent.name}}
		</div>
	</div>	
	<div class="optionsContainer">
		<div style="width: 100%;" class="columns is-mobile drop" v-on:click="$parent.navigate('/adminClients')">
			<div class="column">
				Clients
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		<div class="b-breaker breaker-adjust" style="opacity: 0.5;"></div>
		<div style="width: 100%;" class="columns is-mobile drop" v-on:click="$parent.navigate('/adminCoaches')">
			<div class="column">
				Coaches
			</div>
			<div class="column is-narrow">
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
		<div class="b-breaker breaker-adjust" style="opacity: 0.5;"></div>
		
	</div>
</div>
`;


var adminDashboard = {
  template: adminDashboardTemplate,
  data: function(){
    return{

    }
  },
  methods:{
	
  }
 }