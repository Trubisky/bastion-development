var clientPreviewTemplate = `
<div>
	<div class="overlay" v-bind:class="{hidden: errorHidden}" style="z-index: 7;">
			<div class="popup">
				Sorry, you must finalize your banking information before you can send offers to clients. You will be redirected momentarily. 
			</div>
	</div>
	<div class="overlay" v-bind:class="{hidden: overlayHidden}">
		<div class="popup offeroverlay"  style="height: auto;">
			<div style="text-align: right;" class="closePopup"  v-on:click="overlayHidden = true">
				<i class="fa-solid fa-circle-xmark fa-fade" style="color: #000000;"></i>
			</div>
			<span style="font-weight: 900;">Send Offer</span>
			<br />
			<div class="columns is-mobile">
				<div class="column is-4" style="align-items: center; display: flex;">
					Plan:
				</div>
				<div class="column is-8">
					<div class="select" v-bind:class="{'is-medium': !$parent.isMobile}" style="width: 100%;">
						<select style="width: 100%;" v-model="planID">
							<option v-for="plan in pricings" v-bind:value="plan.ID">{{plan.TITLE}} ({{plan.PRICE}} USD) </option>
						</select>
					</div>
				</div>
			</div>	
			<textarea class="textarea" placeholder="Type a greeting to your potential client here" v-model="greeting"></textarea>
			<br />
			<button class="button b-button offerbutton" v-on:click="sendOffer()">Send Offer</button>
		</div>
	</div>
	<div class="card previewCard">
		<div class="columns is-mobile" style="width: 100%;">
			<div class="column is-11">
			
			</div>
			<div class="column" v-on:click="$parent.navigate('/clients')">
				<i class="fa-solid fa-x"></i>
			</div>
		</div>
		<img v-bind:src="previewObject.ProfilePicture" class="previewProfileImage" style="margin-top: 0;" />
		<div class="undertext2">
			{{previewObject.name}}
		</div>
		<button class="button b-button offerbutton" v-on:click="overlayHidden = false">Send Offer</button>
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


var clientPreview = {
  template: clientPreviewTemplate,
  data: function(){
    return{
		previewObject: {name: "", ProfilePicture: "", surveyAnswers: []},
		pricings: [],
		overlayHidden: true,
		errorHidden: true,
		greeting: "",
		planID: 0
    }
  },
  methods:{
	sendOffer: function(){
		var payload = {
			planID: this.planID,
			greeting: this.greeting,
			clientID: this.$route.params.id
		}
		axios.post("/sendOffer", payload).then(res => {
			this.$parent.navigate("/clients");
			this.$parent.slideUpMessage("Successfully sent offer to " + this.previewObject.name);
		}).catch(err => {
			if (err.response.status == 307){
				//Their account isn't ready for production yet.
				var obLink = err.response.data;
				this.errorHidden = false;
				setTimeout(function(){ window.location.href = obLink}, 3000);
			}
			console.log(err);
		});
		
	}
  },
  created: function(){
	  console.log(this.$route.params);
	  axios.get("/clientPreview/" + this.$route.params.id).then(res => {
		  this.previewObject = res.data;
	  });
	  axios.get("/offerPricings").then(res => {
		  this.pricings = res.data;
	  });
  }
 }