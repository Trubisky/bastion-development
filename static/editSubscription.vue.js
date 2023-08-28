var editSubscriptionTemplate = `
<div key="2">
	<div class="b-acctop">
		<div class="columns is-mobile">
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div class="column is-11">
				Edit Subscription
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="currentSubscription">
		Current Membership
	</div>
	<br />
	<div class="columns is-mobile" style="padding-left: 4vmin; padding-right: 4vmin; padding-top: 4vmin;">
		<div class="column is-10" style="font-weight: 900; font-size: 4.5vmin;">
			Basic Coaching with Sebastien
		</div>
		<div class="column">
			$100
		</div>
	</div>
	<div class="currentSubscriptionText">
		Expert 1 on 1 Coaching, customized workouts, personalized meal plans, daily access to your own fitness and well coach."
	</div>
	<br />
	<div class="b-breaker"></div>
	<button class="button b-button changePlan">Change Plan</button>
	<button class="button b-button changeCoach">Change Coach</button>
</div>
`;


var editSubscription = {
  template: editSubscriptionTemplate,
  data: function(){
    return{
		editing: false,
		editBinding: "Edit"
    }
  },
  methods:{
	editClick: function(){
		this.editing = !this.editing;
		if (!this.editing){
			axios.post('/updateAbout', {about: this.$parent.about}).then(async function(res){});
			this.editBinding = "Edit";
		}
		else{
			this.editBinding = "Save";
		}
	}
  }
 }