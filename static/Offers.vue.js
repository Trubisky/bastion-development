var offersTemplate = `
<div>
	<div v-if="$parent.isMobile">
		<div class="numberCoachOffers">You've received offers from {{offers.length}} coach(s).</div>
		<br />
		<div class="columns is-mobile coachingOffer box nopadding" v-for="offer in offers">
			<div class="column is-6 nopadding">
				<img class="offerImage" v-bind:src="offer.profilePicture" />
			</div>
			<div class="column nopadding" style="padding-top: 5vmin !important;padding: 2vmin;">
				<span style="font-weight: 900; font-size: 4.5vmin;">{{offer.name}}</span>
				<br />
				<span style="font-size: 3vmin;">{{offer.title}} <br /> ({{offer.price}} USD)</span>
				<br />
				<br />
				<br />
				<span style="color: var(--teal); text-decoration: underline;" v-on:click="$parent.navigate('/coachOffer/' + offer.ID)">View Offer</span>
				
			</div>
		</div>
		<div class="chatIcon" v-on:click="$parent.storedReturnRoute = '/offers'; $parent.openChat()">
			<i class="fa-solid fa-comment"></i>
		</div>
		<div class="messageOverlay" id="hideOverlay">
			<div class="messageOverlayText">
				Click on the message button to chat with your potential coaches.
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
	</div>
	<div v-if="!$parent.isMobile">
		<div class="overlay" v-show="showOffer">
			<div class="desktopOfferBox">
				<div style="text-align: right;" class="closePopup"  v-on:click="showOffer = false">
					<i class="fa-solid fa-circle-xmark fa-fade" style="color: #000000;"></i>
				</div>
				<offer-popup></offer-popup>
			</div>
		</div>
		<div class="numberCoachOffers">You've received offers from {{offers.length}} coach(s).</div>
		<br />
		<div class="columns">
			<div class="column is-3 filterColumn">
				<span style="font-weight: 900;">Filter</span>
				<br /><br />
				<div class="b-breaker"></div>
				<div class="columns">
					<div class="column is-9">
						Expertise
					</div>
					<div class="column is-3" style="align-items: last baseline; display: flex;">
						<i class="fa-solid fa-angle-down"></i>
					</div>
				</div>
				<div class="b-breaker"></div>
				<div class="columns">
					<div class="column is-9">
						Languages
					</div>
					<div class="column is-3" style="align-items: last baseline; display: flex;">
						<i class="fa-solid fa-angle-down"></i>
					</div>
				</div>
				<div class="b-breaker"></div>
				<div class="columns">
					<div class="column is-9">
						Coaching Style
					</div>
					<div class="column is-3" style="align-items: last baseline; display: flex;">
						<i class="fa-solid fa-angle-down"></i>
					</div>
				</div>
				<div class="b-breaker"></div>
				<div class="columns">
					<div class="column is-9">
						Gender
					</div>
					<div class="column is-3" style="align-items: last baseline; display: flex;">
						<i class="fa-solid fa-angle-down"></i>
					</div>
				</div>
				<div class="b-breaker"></div>
			</div>
			<div class="column is-9">
				<div class="columns">
					<div class="column is-2 coachingOffer box nopadding" v-for="offer in offers">
						
							<img class="offerImage" v-bind:src="offer.profilePicture" />
						
						
							<span style="font-weight: 900; font-size: 2vmin;">{{offer.name}}</span>
							<br />
							<span style="font-size: 1.5vmin;">{{offer.title}} <br /> ({{offer.price}} USD)</span>
							<br /><br />
							<div style="width: 100%; text-align: center;">
								<span style="color: var(--teal); text-decoration: underline; font-weight: 900; font-size: 2vmin;" v-on:click="openOffer(offer.ID)">View Profile</span>
							</div>
						
					</div>
				</div>
			</div>
		</div>
		<div class="chatIcon" v-on:click="$parent.storedReturnRoute = '/offers'; $parent.openChat()">
			<i class="fa-solid fa-comment"></i>
		</div>
		<div class="messageOverlay" id="hideOverlay">
			<div class="messageOverlayText">
				Click on the message button to chat with your potential coaches.
				<i class="fa-solid fa-arrow-right"></i>
			</div>
		</div>
	</div>
</div>
`;


var offers = {
  template: offersTemplate,
  data: function(){
    return{
		offers: [],
		showOffer: false
    }
  },
  methods:{
	openOffer: function(id){
		this.showOffer = true;
		eventBus.$emit("offer-opened", {offerid: id});
	}
  },
  created: async function(){
	  axios.get("/getOffersDisplay").then(res => {
	      this.offers = res.data;
	  });
	  await this.$parent.sleep(2000);
	  $("#hideOverlay").fadeOut(1000);
	  console.log("did it");
  }
 }