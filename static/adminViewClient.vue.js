var adminViewClientTemplate = `
<div>

<div class="overlay" v-if="showAssign">
		<div class="editContentBox box">
			<div style="text-align: right; font-size: 1.3rem; margin-bottom: 0.5rem;" class="closePopup" v-on:click="showAssign = false">
				<i class="fa-solid fa-circle-xmark fa-fade"></i>
			</div>
			<span class="undertext2"> Send to: </span>
			<input class="input" style="height: 2em;" placeholder="Search for a coach.." v-model="searchQuery" />
			<br /><br />
			<div style="width: 95%; height: 50%; overflow-y: scroll; margin-left: 2.5%; border-style: solid; border-radius: 20px; padding: 1.5vmin; border-width: 2px;">
				<div v-for="coach in visibleCoaches" v-on:click="toggleCoach(coach.ID)">
					<i class="fa-regular fa-square-check" v-show="assignedCoaches.includes(coach.ID)"></i> &nbsp {{coach.NAME}}
				</div>
			</div>
			<button class="button b-button" v-on:click="assign()" style="height: 3rem; width: 70%; margin-left: 15%; margin-top: 0.5rem;" >Assign</button>
		</div>
	</div>
	
	
	<div class="card previewCard">
		<div class="columns is-mobile" style="width: 100%;">
			<div class="column is-11">
			
			</div>
			<div class="column" v-on:click="$parent.navigate($parent.storedReturnRoute)">
				<i class="fa-solid fa-x"></i>
			</div>
		</div>
		<img v-bind:src="previewObject.ProfilePicture" class="profileImage" style="margin-top: 0;" />
		<div class="undertext2">
			{{previewObject.name}}
		</div>
		<button class="button b-button" style=" width: 70%; margin-left: 15%;" v-show="previewObject.CoachID > 0" v-on:click="cancelSub();">Cancel Subscription</button>
		<button class="button b-button" style=" width: 70%; margin-left: 15%;" v-show="previewObject.CoachID <= 0" v-on:click="assignCoaches();">Assign Coaches</button>
		<br /><br />
		<div class="srheader">
			SURVEY RESPONSES
		</div>
		<br>
		<div v-for="answer in previewObject.surveyAnswers">
			<h3 style="font-weight: 900;">{{answer.PROMPT}}</h3>
			<span v-show="answer.INPUTANSWER" style="font-weight: 500;">{{answer.INPUTANSWER}}</span>
			<span v-show="answer.MULTISELECTANSWER" style="font-weight: 500;">{{answer.MULTISELECTANSWER}}</span>
			<br /><br />
		</div>
	</div>
</div>
`;


var adminViewClient = {
  template: adminViewClientTemplate,
  data: function(){
    return{
		showAssign: false,
		searchQuery: "",
		assignedCoaches: [],
		coaches: [],
		previewObject: {name: "", ProfilePicture: "", surveyAnswers: [], CoachID: -1},
    }
  },
  methods:{
	cancelSub: function(){
		axios.post("/adminCancelSubscription", {clientID: this.$route.params.clientid});
		this.$parent.slideUpMessage("Successfully cancelled subscription.");
		this.$parent.navigate("/dashboard");
	},
	assignCoaches: function(){
		axios.get("/adminGetCoaches").then(res => {
			this.coaches = res.data;
		});
		this.showAssign = true;
	},
	toggleCoach: function(id){
		if (!this.assignedCoaches.includes(id)){
			this.assignedCoaches.push(id);
		}
		else{
			var newArray = [];
			for (var xid of this.assignedCoaches){
				if (xid == id){
					continue;
				}
				newArray.push(xid);
			}
			this.assignedCoaches = newArray;
		}
	},
	assign: function(){
		axios.post("/adminAssignCoaches", {clientID: this.$route.params.clientid, coaches: this.assignedCoaches});
		this.showAssign = false;
		this.$parent.slideUpMessage("Successfully assigned coaches");
	}
  },
  created: function(){
	  console.log(this.$route.params);
	  axios.get("/clientPreview/" + this.$route.params.clientid).then(res => {
		  this.previewObject = res.data;
	  });
  },
  computed: {
	  visibleCoaches: function(){
		  var returnArray = [];
		  for (var coach of this.coaches){
			  if (coach.NAME.toLowerCase().includes(this.searchQuery.toLowerCase()) || this.searchQuery == ""){
				  returnArray.push(coach);
			  }
		  }
		  return returnArray;
	  }
  }
 }