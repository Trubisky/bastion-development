var adminViewCoachTemplate = `
<div key="2">
	<div class="b-acctop">
		<div class="columns is-mobile">
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/adminCoaches')">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div class="column is-11">
				{{profileInfo.NAME}}
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="columns is-mobile" style="padding-left: 4vmin; padding-right: 4vmin; padding-top: 4vmin;">
		<div class="column is-10" style="font-weight: 900;">
			Profile Picture
		</div>
	</div>
	<img v-bind:src="profileInfo.PROFILEPICTURE" class="editProfileImage" />
	<div class="b-breaker"></div>
	<div class="columns is-mobile" style="padding-left: 4vmin; padding-right: 4vmin; padding-top: 4vmin;">
		<div class="column is-10" style="font-weight: 900;">
			About
		</div>
	</div>
	<div class="aboutContent">
		<div style="overflow-wrap: break-word;">
			{{profileInfo.ABOUT}}
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="columns is-mobile" style="padding-left: 4vmin; padding-right: 4vmin; padding-top: 4vmin;">
		<div class="column is-10" style="font-weight: 900;">
			Certifications
		</div>
	</div>
	<div class="content">
		<ul>
			<li v-for="(cert, index) in certifications">{{cert.CERTIFICATION}}</li>
		</ul>
	</div>
	<button class="button b-button" style=" width: 50%; margin-left: 25%;" v-on:click="$parent.navigate('/adminViewCoachClients/' + coachID);">View Clients</button>
</div>
`;


var adminViewCoach = {
  template: adminViewCoachTemplate,
  data: function(){
    return{
		coachID: 0,
		profileInfo: {NAME: "", ABOUT: "", PROFILEPICTURE: ""},
		certifications: []
    }
  },
  methods:{
	
  },
  created: function(){
		this.coachID = this.$route.params.coachid;
		axios.get('/adminViewCoach/' + this.$route.params.coachid).then(res => {
			this.profileInfo = res.data.profileInfo;
			this.certifications = res.data.certifications;
		});
	
  }
 }