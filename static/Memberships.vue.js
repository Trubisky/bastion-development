var membershipsTemplate = `
<div key="2">
	<div class="overlay" v-if="showEditing">
		<div class="editContentBox box">
			<div style="text-align: right; font-size: 1.3rem; margin-bottom: 0.5rem;" class="closePopup" v-on:click="showEditing = false">
				<i class="fa-solid fa-circle-xmark fa-fade"></i>
			</div>
			<input class="input" style="height: 2em;" v-model="editingPlan.TITLE" />
			<div class="columns is-mobile nopadding nomargin" style="margin-top: 0rem; margin-bottom: 0;">
				<div class="column is-3">
					<span style="font-size: 1rem; font-weight: bold;">Pricing: </span>
				</div>
				<div class="column is-9">
					<input class="input" style="height: 2em;" v-model="editingPlan.PRICE" />
				</div>
				
				
			</div>
			<textarea class="textarea" v-model="editingPlan.DESCRIPTION"></textarea>
			<span style="font-size: 1rem; font-weight: bold;">Features: </span>
			<input v-for="(feature, index) in editingPlan.FEATURES" class="input" style="height: 1.2em;" v-model="editingPlan.FEATURES[index].FEATURE"/>
			<button class="button b-button" v-on:click="save()" style="height: 3rem; width: 70%; margin-left: 15%; margin-top: 0.5rem;" >Save</button>
		</div>
	</div>

	<div class="editProfile" v-bind:class="{box: !$parent.isMobile}">
	<div class="b-acctop">
		<div class="columns is-mobile" v-if="$parent.isMobile">
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div class="column is-11">
				Memberships
			</div>
		</div>
		<div class="columns is-mobile" v-if="!$parent.isMobile">
			<div class="column is-11">
				Memberships &nbsp <i v-on:click="newMembership()" class="fa-solid fa-plus" style="color: var(--teal);"></i>
			</div>
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
				<i class="fa-solid fa-x"></i>
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<div v-for="(plan, index2) in plans">
		<div class="columns is-mobile" style="padding-left: 4vmin; padding-right: 4vmin; padding-top: 4vmin;">
			<div class="column is-10" style="font-weight: 900;">
				<span v-show="!plan.EDITING">{{plan.TITLE}}</span>
				<input class="input" v-model="plan.TITLE" type="text" v-show="plan.EDITING" />
			</div>
			<div class="column">
				<span style="font-weight: bold;" v-show="!plan.EDITING">$ {{plan.PRICE}}</span>
				<input class="input" type="number" v-show="plan.EDITING" v-model="plan.PRICE"/>
			</div>
		</div>
		<div class="columns is-mobile aboutContentSmaller">
			<div class="column is-10">
				<span v-show="!plan.EDITING">{{plan.DESCRIPTION}}</span>
				<textarea v-show="plan.EDITING" v-model="plan.DESCRIPTION" style="width: 100%; height: 15vmin;"></textarea>
				<br /><br />
				<ul style="list-style: inside;" v-show="!plan.EDITING">
					<li v-for="feature in plan.FEATURES" v-show="feature.FEATURE != ''">{{feature.FEATURE}}</li>
				</ul>
				<ul style="list-style: inside;" v-show="plan.EDITING">
						<input v-for="(feature, index) in plan.FEATURES" class="input" style="height: 1em;" v-model="plan.FEATURES[index].FEATURE"/>
				</ul>
			</div>
			<div class="column" style="color: var(--teal); font-size: 1rem;" v-on:click="edit(index2)">
				{{plan.EDITING ? "Save" : "Edit"}}
			</div>
			
		</div>
		<div class="b-breaker"></div>
	</div>
	</div>
</div>
`;


var memberships = {
  template: membershipsTemplate,
  data: function(){
    return{
		plans: [],
		add: true,
		editingPlan: {TITLE: "Basic", DESCRIPTION: "bingus googas", PRICE: 100, FEATURES: [{FEATURE: "1"}, {FEATURE: "1"}, {FEATURE: "1"}, {FEATURE: "1"}]},
		selectedEditIndex: 0,
		showEditing: false,
		editing1: false,
		editing2: false
    }
  },
  methods:{
	newMembership: async function(){
		if (!this.add){
			return;
		}
		this.add = false;
		await axios.get("/createPricing");
		location.reload();
	},
	edit: function(selectedPlan){

			if (!this.plans[selectedPlan].EDITING){
				//we're about to start editing
				while (this.plans[selectedPlan].FEATURES.length < 4){
					this.plans[selectedPlan].FEATURES.push({FEATURE: ""});
				}
			}
			this.editingPlan = this.deepcopy(this.plans[selectedPlan]);
			this.selectedEditIndex = selectedPlan;
			this.showEditing = true;
			/*
			
			this.plans[selectedPlan].EDITING = !this.plans[selectedPlan].EDITING;
			if (!this.plans[selectedPlan].EDITING){
				//If we clicked save, push changes
				axios.post("/updatePricings", this.plans[selectedPlan]);
				this.$parent.slideUpMessage("Successfully updated membership.");
				this.plans[selectedPlan].EDITING = false;
				
			}
			this.$forceUpdate();
			
			*/
	},
	save: function(){
		axios.post("/updatePricings", this.editingPlan);
		this.plans[this.selectedEditIndex] = this.deepcopy(this.editingPlan);
		this.$parent.slideUpMessage("Successfully updated membership.");
		this.showEditing = false;
	},
	deepcopy: function(inputObject){
		return JSON.parse(JSON.stringify(inputObject));
	}
  },
  created: function(){
	  axios.get('/getPricings').then(res => {
		  this.plans = res.data;
		  for (var i=0; i<this.plans.length; i++){
			  this.plans[i].EDITING = false;
		  }
		  console.log(this);
	  });
  }
 }