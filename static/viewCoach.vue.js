var viewCoachTemplate = `
<div>
	<div v-if="$parent.isMobile">
		<div class="offerBackground">
			<div class="mainOfferDisplay">
				<img class="mainOfferImage" v-bind:src="profileInfo.PROFILEPICTURE" />
				<div style="text-align: center;">
					<span style="font-weight: 900; font-size: 5vmin;">{{profileInfo.NAME}}</span>
					<br />
					<span style="font-weight: 500; font-size: 3.5vmin;">Ann Arbor, Michigan</span>
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
			</div>
		</div>
	</div>
	<div v-if="!$parent.isMobile" class="desktopOfferBox box">
				<div style="text-align: right;" class="closePopup"  v-on:click="$parent.navigate('/dashboard')">
					<i class="fa-solid fa-circle-xmark fa-fade" style="color: #000000;"></i>
				</div>
		<div class="columns">
			<div class="column is-5">
				<img class="mainOfferImage" v-bind:src="profileInfo.PROFILEPICTURE" />
				<div style="text-align: center;">
					<span style="font-weight: 900; font-size: 4vmin;">{{profileInfo.NAME}}</span>
					<br />
					<span style="font-weight: 500; font-size: 2.5vmin;">Ann Arbor, Michigan</span>
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
					<div class="column is-4">
						<div style="font-weight: 900;">COACHING STYLES</div><br />
						{{profileInfo.ATTRIBUTES.ATTRIBUTE1}}<br />
						{{profileInfo.ATTRIBUTES.ATTRIBUTE2}}<br />
						{{profileInfo.ATTRIBUTES.ATTRIBUTE3}}<br />
					</div>
					<div class="column is-4">
						<div style="font-weight: 900;">EXPERTISE</div><br />
						<span v-for="exp of profileInfo.EXPERTISE">{{exp}}<br /></span>
					</div>
					<div class="column is-4">
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


var viewCoach = {
  template: viewCoachTemplate,
  data: function(){
    return{
		profileInfo: {ABOUT: "", NAME: "", PROFILEPICTURE: "", ATTRIBUTES: {ATTRIBUTE1: "", ATTRIBUTE2: "", ATTRIBUTE3: ""}},
		certifications: []
    }
  },
  methods:{

  },
  created: async function(){
	  axios.get("/getCoachDisplay/" + this.$parent.CoachID).then(res => {
	     this.profileInfo = res.data.profileInfo;
		 this.certifications = res.data.certifications;
	  });
	 
  }
 }