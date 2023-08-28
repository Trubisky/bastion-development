var adminCoachesTemplate = `
<div key="2">
	<div class="overlay"  v-show="showAddCoach">
		<div class="box boxadd">
			<div class="box-title">ADD COACH</div>
			<input class="input inputx" type="text" placeholder="Name" v-model="coachInvite.name">
			<input class="input inputx" type="text" placeholder="Email" v-model="coachInvite.email">
			<input class="input inputx" type="text" placeholder="ID Number">
			<input class="input inputx" type="text" placeholder="Temporary Password" v-model="coachInvite.password">
			<button class="button b-button withdraw-button" style="margin-left: 12.5%;" v-on:click="inviteCoach()">Add</button>
		</div>
	</div>
	<div class="b-acctop">
		<div class="columns is-mobile">
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div class="column is-11">
				Current Coaches
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="sortContainer">
		<span class="sortText">{{coaches.length}} COACHES
		</span>
		<div class="dropdown" v-bind:class="{'is-active': showDropdown}">
			<div class="dropdown-trigger" v-on:click="showDropdown = !showDropdown">
			  <button class="dropdown-button" aria-haspopup="true" aria-controls="dropdown-menu3">
				<span>SORT</span>
				<span class="icon is-small">
				  <i class="fas fa-angle-down" aria-hidden="true"></i>
				</span>
			  </button>
			</div>
			<div class="dropdown-menu" id="dropdown-menu3" role="menu">
			  <div class="dropdown-content">
				<a href="#" class="dropdown-item">
				  Sort Option
				</a>
			  </div>
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<br />
	<div class="columns is-mobile clientoption" v-for="coach in coaches">
		<div class="column is-11">
			<img class="clientimage" v-bind:src="coach.PROFILEPICTURE" />  {{coach.NAME}}
		</div>
		<div class="column" style="align-items: center; display: flex;" v-on:click="$parent.navigate('/adminViewCoach/' + coach.ID)">
			<i class="fa-solid fa-arrow-right"></i>
		</div>
	</div>
	<button class="button b-button" style=" width: 50%; margin-left: 25%;" v-on:click="showAddCoach = true">Add Coach</button>
</div>
`;


var adminCoaches = {
  template: adminCoachesTemplate,
  data: function(){
    return{
		showDropdown: false,
		showAddCoach: false,
		coaches: [],
		coachInvite: {name: "", email: "", password: ""}
    }
  },
  methods:{
	inviteCoach: function(){
		this.showAddCoach = false;
		axios.post("/adminInviteCoach", this.coachInvite);
		this.$parent.slideUpMessage("Successfully sent coach invitation.");
	}
  },
  created: function(){
	  axios.get("/adminGetCoaches").then(res =>{
		  this.coaches = res.data;
	  });
  }
 }