var coachOfferTemplate = `
<div>
	<div v-if="$parent.isMobile">
		<div class="overlay" v-bind:class="{hidden: errorHidden}" style="z-index: 7;">
			<div class="popup">
				You must add a payment method before you can begin working with a Coach. You will be redirected momentarily. 
			</div>
		</div>
		<div class="offerBackground">
			<div class="mainOfferDisplay">
				<img class="mainOfferImage" v-bind:src="profileInfo.PROFILEPICTURE" />
				<div class="pricingBackground">
					<div style="text-align: center;">
						<span style="font-weight: 900; font-size: 5vmin;">{{profileInfo.NAME}}</span>
						<br />
						<span style="font-weight: 500; font-size: 3.5vmin;">{{profileInfo.LOCATION}}</span>
					</div>
					<br />
					<div class="columns is-mobile offerPricingDisplay">
						<div class="column is-9" style="font-weight: 900;">
							{{pricingInfo.TITLE}}
						</div>
						<div class="column">
							{{pricingInfo.PRICE}} USD
						</div>
					</div>
					<div class="offerPricingDescription">
						{{pricingInfo.DESCRIPTION}}
						<br /><br />
						<ul>
							<li v-for="feature in pricingInfo.FEATURES"><i class="fa-solid fa-minus"></i> {{feature.FEATURE}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="belowOfferDisplay">
				<div class="b-breaker" style="background-color: grey;"></div>
				<br />
				<div class="offerSectionTitle">
					About
				</div>
				<div class="offerSectionDescription">
					{{profileInfo.ABOUT}}
				</div>
				<br />
				<div class="b-breaker" style="background-color: grey;"></div>
				<br />
				<div class="offerSectionTitle">
					Coaching Styles
				</div>
				<div class="offerSectionDescription">
						{{profileInfo.ATTRIBUTES.ATTRIBUTE1}}<br />
						{{profileInfo.ATTRIBUTES.ATTRIBUTE2}}<br />
						{{profileInfo.ATTRIBUTES.ATTRIBUTE3}}<br />
				</div>
				<br />
				<div class="b-breaker" style="background-color: grey;"></div>
				<br />
				<div class="offerSectionTitle">
					Expertise
				</div>
				<div class="offerSectionDescription">
					<span v-for="exp of profileInfo.EXPERTISE">{{exp}}<br /></span>
				</div>
				<br />
				<div class="b-breaker" style="background-color: grey;"></div>
				<br />
				<div class="offerSectionTitle">
					Languages
				</div>
				<div class="offerSectionDescription">
					<span v-for="lang of profileInfo.LANGUAGES">{{lang.LANGUAGE}} ({{lang.FLUENCY}})<br /></span>
				</div>
				<br />
				<div class="b-breaker" style="background-color: grey;"></div>
				<br />
				<div class="offerSectionTitle">
					Certifications
				</div>
				<div class="offerSectionDescription">
					<div v-for="cert in certifications">
						{{cert.CERTIFICATION}}
						<br />
					</div>
				</div>
				<br />
				<button class="button b-button" style="margin-left: 12.5%; color: black;" v-on:click="startCoaching()">Train with {{profileInfo.NAME.split(" ")[0]}}</button>
			</div>
		</div>
	</div>
	<div v-if="!$parent.isMobile">
		<div class="overlay" v-bind:class="{hidden: errorHidden}" style="z-index: 7;">
			<div class="popup" style="width: 40% !important; margin-left: 15% !important;">
				You must add a payment method before you can begin working with a Coach. You will be redirected momentarily. 
			</div>
		</div>
		<div class="columns">
			<div class="column is-5">
				<img class="mainOfferImage" v-bind:src="profileInfo.PROFILEPICTURE" />
				<div style="text-align: center;">
					<span style="font-weight: 900; font-size: 4vmin;">{{profileInfo.NAME}}</span>
					<br />
					<span style="font-weight: 500; font-size: 2.5vmin;">{{profileInfo.LOCATION}}</span>
					<br />
					<button class="button b-button" style="width: auto; color: black; font-size: 3vmin; height: 6vmin;" v-on:click="startCoaching()">Train with {{profileInfo.NAME.split(" ")[0]}}</button>
				</div>
			</div>
			<div class="column is-7">
				<div class="columns is-mobile offerPricingDisplay">
					<div class="column is-9" style="font-weight: 900;">
						{{pricingInfo.TITLE}}
					</div>
					<div class="column">
						{{pricingInfo.PRICE}} USD
					</div>
				</div>
				<div class="offerPricingDescription">
					{{pricingInfo.DESCRIPTION}}
					<ul>
						<li v-for="feature in pricingInfo.FEATURES"><i class="fa-solid fa-minus"></i> {{feature.FEATURE}}</li>
					</ul>
				</div>
				<div class="offerSectionTitle">
					About
				</div>
				<div class="offerSectionDescription">
					{{profileInfo.ABOUT}}
				</div>
				<br />
				<div class="columns" style="padding: 0.75rem;">
					<div class="column is-4" style="word-break: break-word;">
						<div style="font-weight: 900;">COACHING STYLES</div><br />
						{{profileInfo.ATTRIBUTES.ATTRIBUTE1}}<br />
						{{profileInfo.ATTRIBUTES.ATTRIBUTE2}}<br />
						{{profileInfo.ATTRIBUTES.ATTRIBUTE3}}<br />
					</div>
					<div class="column is-4" style="word-break: break-word;">
						<div style="font-weight: 900;">EXPERTISE</div><br />
						<span v-for="exp of profileInfo.EXPERTISE">{{exp}}<br /></span>
					</div>
					<div class="column is-4" style="word-break: break-word;">
						<span style="font-weight: 900;">LANGUAGES</span><br /><br />
						<span v-for="lang of profileInfo.LANGUAGES">{{lang.LANGUAGE}} ({{lang.FLUENCY}})<br /></span>
					</div>
				</div>
				<div style="font-weight: 900; padding-left: 0.75rem;">Certifications</div><br />
				<div style="padding-left: 0.75rem;" v-for="cert in certifications">{{cert.CERTIFICATION}}</div>
			</div>
		</div>
	</div>
</div>
`;


var coachOffer = {
  template: coachOfferTemplate,
  data: function(){
    return{
		offerid: 0,
		startDebounce: true,
		errorHidden: true,
		profileInfo: {ABOUT: "", NAME: "", LOCATION: "", PROFILEPICTURE: "", ATTRIBUTES: {ATTRIBUTE1: "", ATTRIBUTE2: "", ATTRIBUTE3: ""}},
		pricingInfo: {DESCRIPTION: "", TITLE: "", PRICE: 0, FEATURES: []},
		certifications: []
    }
  },
  methods:{
	startCoaching: function(){
		if (!this.startDebounce){
			return;
		}
		this.startDebounce = false;
		axios.post("/startCoaching", {offerID: this.offerid}).then(res => {
			app.refreshHome();
			app.navigate("/thankYou");
			//app.slideUpMessage("Successfully began training with " + this.profileInfo.NAME);
		}).catch(err => {
			console.log(err);
			if (err.response.status == 307){
				//They ain't got any payment methods yet
				var setupLink = err.response.data;
				this.errorHidden = false;
				setTimeout(function(){ window.location.href = setupLink}, 3000);
			}
			console.log(err);
		});
	}
  },
  created: async function(){
	  if (this.$route.params.offerid){
		  this.offerid = this.$route.params.offerid;
		  axios.get("/getOffer/" + this.$route.params.offerid).then(res => {
			 this.profileInfo = res.data.profileInfo;
			 this.pricingInfo = res.data.pricingInfo;
			 this.certifications = res.data.certifications;
		  });
	  }
	  eventBus.$on("offer-opened", (input) => {
		  this.offerid = input.offerid;
		  axios.get("/getOffer/" + input.offerid).then(res => {
			 this.profileInfo = res.data.profileInfo;
			 this.pricingInfo = res.data.pricingInfo;
			 this.certifications = res.data.certifications;
		  });
	  });
	 
  }
 }