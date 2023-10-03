var viewCoachTemplate = `
<div>
	<div v-if="$parent.isMobile">
		<div class="offerBackground">
			<div class="mainOfferDisplay">
				<img class="mainOfferImage" v-bind:src="profileInfo.PROFILEPICTURE" />
				<div style="text-align: center;">
					<span style="font-weight: 900; font-size: 5vmin;">{{profileInfo.NAME}}</span>
					<br />
					<span style="font-weight: 500; font-size: 3.5vmin;">{{profileInfo.LOCATION}}</span>
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
				<span style="font-size: 1.2rem; font-weight: 900;">Reviews ({{reviews.length}})</span>
		<br />
		<div class="columns is-mobile" v-for="review in reviews">
			<div class="column is-3">
				<img class="clientimage" v-bind:src="review.reviewInfo.PROFILEPICTURE" />
			</div>
			<div class="column" style="align-items: center; display: flex; font-size: 0.7rem;">
			{{review.reviewInfo.NAME}}
			<br />
			{{review.REVIEW}}
			</div>
		</div>
		<button class="button b-button" style="color: black; margin-left: 15%; width: 70%;" v-on:click="$parent.navigate('/review1');">Leave a Review</button>
			</div>
		</div>
	</div>
	<div v-if="!$parent.isMobile" class="editProfile box">
		<div class="b-acctop">
			<div class="columns is-mobile">
				<div class="column is-11">
					My Coach
				</div>
				<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
					<i class="fa-solid fa-x"></i>
				</div>
			</div>
		</div>
		<div class="columns">
			<div class="column is-5">
				<img class="mainOfferImage" v-bind:src="profileInfo.PROFILEPICTURE" />
				<div style="text-align: center;">
					<span style="font-weight: 900; font-size: 4vmin;">{{profileInfo.NAME}}</span>
					<br />
					<span style="font-weight: 500; font-size: 2.5vmin;">{{profileInfo.LOCATION}}</span>
				</div>
			</div>
			<div class="column is-7">
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
		<span style="font-size: 2.5vmin; font-weight: 900;">Reviews ({{reviews.length}})</span>
		<br />
		<div class="columns" v-for="review in reviews">
			<div class="column is-1">
				<img class="clientimage" v-bind:src="review.reviewInfo.PROFILEPICTURE" />
			</div>
			<div class="column" style="align-items: center; display: flex;">
			{{review.reviewInfo.NAME}}
			<br />
			{{review.REVIEW}}
			</div>
		</div>
		<button class="button b-button" style="color: black; margin-left: 35%;" v-on:click="$parent.navigate('/review1');">Leave a Review</button>
	</div>
</div>
`;


var viewCoach = {
  template: viewCoachTemplate,
  data: function(){
    return{
		profileInfo: {ABOUT: "", NAME: "", PROFILEPICTURE: "", LOCATION: "", ATTRIBUTES: {ATTRIBUTE1: "", ATTRIBUTE2: "", ATTRIBUTE3: ""}},
		reviews: [],
		certifications: []
    }
  },
  methods:{

  },
  created: async function(){
	  await this.$parent.refreshHome();
	  axios.get("/getCoachDisplay/" + this.$parent.CoachID).then(res => {
	     this.profileInfo = res.data.profileInfo;
		 this.certifications = res.data.certifications;
	  });
	  axios.get("/getReviews/" + this.$parent.CoachID).then(res => {
		  this.reviews = res.data;
	  });
	 
  }
 }