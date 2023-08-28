var coachJoinTemplate = `
<div>
	<div v-if="selectedIndex == 0">
		<h1 class="cjStart">Welcome to Bastion!</h1>
		<h1 class="cjBelow">Please complete the following information to get started.</h1>
	</div>
	<div v-if="selectedIndex == 1" class="w95">
		<h1 class="cjQuestionHeader">Enter your Name and Location</h1>	
		<br />
		<div class="columns">
			<div class="column is-6">
				<span class="nameLocationTitle">First Name</span>
				<input class="input inputx" type="text"  placeholder="First Name" v-model="payload.firstName" />
			</div>
			<div class="column">
				<span class="nameLocationTitle">Last Name</span>
				<input class="input inputx" type="text"  placeholder="Last Name" v-model="payload.lastName" />
			</div>
		</div>
		<div>
			<span class="nameLocationTitle" >Location</span>
			<input class="input inputx dtInputAdjust" type="text"  placeholder="Location (City, State)" v-model="payload.location"/>
		</div>
	</div>
	<div v-if="selectedIndex == 2"  class="w95">
		<h1 class="cjQuestionHeader">What is your gender?</h1>	
		<br />
		<div class="select is-large w95">
		  <select style="width: 100%;" v-model="payload.gender">
			<option>Male</option>
			<option>Female</option>
			<option>Non-Binary</option>
			<option>Other</option>
		  </select>
		</div>
	</div>
	<div v-if="selectedIndex == 3" class="w95">
		<h1 class="cjQuestionHeader">Tell us and your clients a little about yourself:</h1>	
		<br />
		<textarea class="textarea" v-model="payload.about" style="width: 95% !important; min-width: 95%; margin-left: 2.5%; height: 35%;"></textarea>
	</div>
	<div v-if="selectedIndex == 4"  class="w95">
		<h1 class="cjQuestionHeader">What language(s) do you speak?</h1>	
		<br />
		<div class="columns is-mobile" style="text-align: center; margin-bottom: -1%;">
			<div class="column is-6 languageProficiencyHeader">
				Language
			</div>
			<div class="column is-6 languageProficiencyHeader">
				Proficiency
			</div>
		</div>
		<div class="b-breaker"></div>
		<div class="columns is-mobile" style="text-align: center; margin-bottom: -1%;" v-for="(lang, index) in payload.languages">
			<div class="column is-6">
				<div class="select is-medium width95">
				  <select style="width: 100%;" v-model="payload.languages[index].language">
					<option>English (Default)</option>
					<option>Spanish</option>
					<option>Chinese</option>
					<option>Arabic</option>
					<option>Hindi</option>
					<option>French</option>
					<option>German</option>
					<option>Japanese</option>
					<option>Russian</option>
				  </select>
				</div>
			</div>
			<div class="column is-6">
				<div class="select is-medium width95">
				  <select style="width: 100%;" v-model="payload.languages[index].proficiency">
					<option>Fluent</option>
					<option>Advanced</option>
					<option>Competent</option>
					<option>Basic</option>
				  </select>
				</div>
			</div>
		</div>
		<br />
		<div class="addLanguage" v-on:click="addLanguage()">
			+ &nbsp Add Another Language
		</div>
	</div>
	<div v-if="selectedIndex == 5"  class="w95">
		<h1 class="cjQuestionHeader">List 2 attributes that most fit your coaching style</h1>	
		<div style="margin-left: 2.5%;" class="attributeTitle" >Attribute 1</div>
		<div class="select width95" v-bind:class="{'is-large': !$parent.isMobile}">
		  <select style="width: 100%;" v-model="payload.attributes[0]">
			<option>Educational/Informative</option>
			<option>Flexible/Adaptive</option>
			<option>Results-Driven</option>
			<option>Tough-Love</option>
			<option>Holistic Wellness</option>
			<option>Empathetic/Understanding</option>
			<option>Scientific/Research-Based</option>
			<option>Mind-Body Focused</option>
			<option>Behavioral/Accountability</option>
			<option>Integrative/Functional</option>
			<option>Lifestyle/Behavior Change</option>
			<option>Time-Efficient/Busy Lifestyle</option>
			<option>Sports-Specific</option>

		  </select>
		</div>
		<br /><br />
		<div style="margin-left: 2.5%;" class="attributeTitle" >Attribute 2</div>
		<div class="select width95" v-bind:class="{'is-large': !$parent.isMobile}">
		  <select style="width: 100%;" v-model="payload.attributes[1]">
			<option>Educational/Informative</option>
			<option>Flexible/Adaptive</option>
			<option>Results-Driven</option>
			<option>Tough-Love</option>
			<option>Holistic Wellness</option>
			<option>Empathetic/Understanding</option>
			<option>Scientific/Research-Based</option>
			<option>Mind-Body Focused</option>
			<option>Behavioral/Accountability</option>
			<option>Integrative/Functional</option>
			<option>Lifestyle/Behavior Change</option>
			<option>Time-Efficient/Busy Lifestyle</option>
			<option>Sports-Specific</option>

		  </select>
		</div>
	</div>
	<div v-if="selectedIndex == 6" class="w95">
		<h1 class="cjQuestionHeader">Rank 3 specialties you are the most experienced with</h1>	
		<div style="margin-left: 2.5%;" class="attributeTitle">Specialty 1</div>
		<div class="select width95" v-bind:class="{'is-large': !$parent.isMobile}">
		  <select style="width: 100%;" v-model="payload.specialties[0]">
			<option>Strength Training</option>
			<option>Endurance Training</option>
			<option>Powerlifting</option>
			<option>Bodybuilding</option>
			<option>Olympic Weightlifting</option>
			<option>Corrective Exercise</option>
			<option>Pre- and Post-Natal Fitness</option>
			<option>Senior Fitness</option>
			<option>Nutrition</option>
			<option>Flexibility/Mobility Training</option>
			<option>Outdoor Fitness</option>
			<option>Travel Fitness</option>
			<option>Rehabilitation and Injury Prevention</option>
			<option>Special Needs Fitness</option>
			<option>CrossFit Training</option>
			<option>Body Recomposition</option>
			<option>Sports Performance</option>
			<option>Functional Fitness</option>

		  </select>
		</div>
		<br /><br />
		<div style="margin-left: 2.5%;" class="attributeTitle">Specialty 2</div>
		<div class="select width95" v-bind:class="{'is-large': !$parent.isMobile}">
		  <select style="width: 100%;" v-model="payload.specialties[1]">
			<option>Strength Training</option>
			<option>Endurance Training</option>
			<option>Powerlifting</option>
			<option>Bodybuilding</option>
			<option>Olympic Weightlifting</option>
			<option>Corrective Exercise</option>
			<option>Pre- and Post-Natal Fitness</option>
			<option>Senior Fitness</option>
			<option>Nutrition</option>
			<option>Flexibility/Mobility Training</option>
			<option>Outdoor Fitness</option>
			<option>Travel Fitness</option>
			<option>Rehabilitation and Injury Prevention</option>
			<option>Special Needs Fitness</option>
			<option>CrossFit Training</option>
			<option>Body Recomposition</option>
			<option>Sports Performance</option>
			<option>Functional Fitness</option>

		  </select>
		</div>
		<br /><br />
		<div style="margin-left: 2.5%;" class="attributeTitle">Specialty 3</div>
		<div class="select width95" v-bind:class="{'is-large': !$parent.isMobile}">
		  <select style="width: 100%;" v-model="payload.specialties[2]">
			<option>Strength Training</option>
			<option>Endurance Training</option>
			<option>Powerlifting</option>
			<option>Bodybuilding</option>
			<option>Olympic Weightlifting</option>
			<option>Corrective Exercise</option>
			<option>Pre- and Post-Natal Fitness</option>
			<option>Senior Fitness</option>
			<option>Nutrition</option>
			<option>Flexibility/Mobility Training</option>
			<option>Outdoor Fitness</option>
			<option>Travel Fitness</option>
			<option>Rehabilitation and Injury Prevention</option>
			<option>Special Needs Fitness</option>
			<option>CrossFit Training</option>
			<option>Body Recomposition</option>
			<option>Sports Performance</option>
			<option>Functional Fitness</option>

		  </select>
		</div>
	</div>
	<div v-if="selectedIndex == 7" class="w95">
		<h1 class="cjQuestionHeader">How accountable would you like to be of your clients?</h1>	
		<br />
		<div class="columns is-mobile w95" style="margin-bottom: 0;">
			<div class="column is-2 joinRadio">
				<input type="radio" name="form1" value="I perfer more independent clients" class="joinRadioButton" v-model="payload.accountable">
			</div>
			<div class="column is-10 desktopRadio">
				I perfer more independent clients.
			</div>
		</div>
		<div class="columns is-mobile w95" style="margin-bottom: 0;">
			<div class="column is-2 joinRadio">
				<input type="radio" name="form1" value="A little accountable" class="joinRadioButton" v-model="payload.accountable">
			</div>
			<div class="column is-10 desktopRadio">
				A little accountable
			</div>
		</div>
		<div class="columns is-mobile w95" style="margin-bottom: 0;">
			<div class="column is-2 joinRadio">
				<input type="radio" name="form1" value="Somewhat accountable" class="joinRadioButton" v-model="payload.accountable">
			</div>
			<div class="column is-10 desktopRadio">
				Somewhat accountable
			</div>
		</div>
		<div class="columns is-mobile w95" style="margin-bottom: 0;">
			<div div class="column is-2 joinRadio">
				<input type="radio" name="form1" value="Accountable" class="joinRadioButton" v-model="payload.accountable">
			</div>
			<div class="column is-10 desktopRadio">
				Accountable
			</div>
		</div>
		<div class="columns is-mobile w95" style="margin-bottom: 0;">
			<div div class="column is-2 joinRadio">
				<input type="radio" name="form1" value="I am very proactive with holding my clients accountable." class="joinRadioButton" v-model="payload.accountable">
			</div>
			<div class="column is-10 desktopRadio">
				I am very proactive with holding my clients accountable.
			</div>
		</div>
	</div>
	<div v-if="selectedIndex == 8" class="w95">
		<h1 class="cjQuestionHeader">Do you have experience preparing clients for competetion?</h1>	
		<div class="select w95" v-bind:class="{'is-large': !$parent.isMobile}">
		  <select style="width: 100%;" v-model="payload.compExperience">
			<option>Yes</option>
			<option>No</option>
		  </select>
		</div>
		<br /><br />
		<div class="width95" v-show="payload.compExperience == 'Yes'">
			What sports do you experience preparing clients to compete in?
			<div class="input cjBox">
				<div v-for="comp in payload.comps" class="cjComp" v-on:click="removeComp(comp);">
					<i class="fa-solid fa-x fa-xs"></i> {{comp}} &nbsp; &nbsp; 
				</div>
			</div>
			<form onsubmit="return false" v-on:submit="addComp()">
				<br />
				<input class="input" v-model="comp" placeholder="Enter a sport here, and press enter." />
				<span class="membershipText">Suggested: Marathon, Ironman</span>
			</form>
		</div>
	</div>
	<div v-if="selectedIndex == 9" class="w95">
		<h1 class="cjQuestionHeader">What special circumstance specialties do you have?</h1>	
		<div class="width95">
			<div class="input cjBox">
				<div v-for="circumstance in payload.circumstances" class="cjComp" v-on:click="removeCirc(circumstance);">
					<i class="fa-solid fa-x fa-xs"></i> {{circumstance}} &nbsp; &nbsp; 
				</div>
			</div>
			<form onsubmit="return false" v-on:submit="addCirc()">
				<br />
				<input class="input" v-model="circ" placeholder="Enter a circumstance here, and press enter." />
				<span class="membershipText">Suggested: Pre-natal, Physical Disabilities</span>
			</form>
		</div>
	</div>
	<div v-if="selectedIndex == 10" class="w95" style="height: 70%; overflow-y: scroll;">
		<h1 class="cjQuestionHeader">List your membership pricing here:</h1>	
		<div class="width95">
			<div v-for="(membership, index) in payload.memberships">
				<br />
				<input class="input" type="text" v-model="membership.title" style="font-weight: 600;"/>
				<div class="membershipText">Total amount that clients see</div>
				<input class="input" type="text" placeholder="Enter Price Here (USD)" v-model="payload.memberships[index].price" />
				<br />
				<span class="membershipPrompt">Service Fee</span>
				<div class="membershipText">This helps us run the platform and provide services like payment protection and customer support</div>
				<div class="input" disabled style="margin-bottom: 1vmin;">    $ {{Math.round(payload.memberships[index].price * 20) / 100}}</div>
				<span class="membershipPrompt">You'll get</span>
				<div class="membershipText">The estimated amount you'll get after the service fee</div>
				<div class="input" disabled style="margin-bottom: 1vmin;">    $ {{Math.round(payload.memberships[index].price * 80) / 100}}</div>
				Short Description
				<textarea class="textarea" style="height: 10%; min-height: 5em;" v-model="payload.memberships[index].description"></textarea>
				Features
				<input class="input" style="height: 1.5em" v-model="payload.memberships[index].features[0]" />
				<input class="input" style="height: 1.5em" v-model="payload.memberships[index].features[1]"/>
				<input class="input" style="height: 1.5em" v-model="payload.memberships[index].features[2]"/>
				<input class="input" style="height: 1.5em" v-model="payload.memberships[index].features[3]"/>
				<br /><br/>
				<div class="b-breaker"></div>
				
			</div>
			<span v-on:click="addPlan()" v-show="payload.memberships.length < 2">+ Add another plan</span>
		</div>
	</div>
	<div v-if="selectedIndex == 11" class="w95" style="height: 70%; overflow-y: scroll;">
		<h1 class="cjQuestionHeader">List your certifications here:</h1>	
		<div class="w95">
			<div v-for="(cert, index) in payload.certifications">
				<br />
				Certification
				<input class="input" style="margin-bottom: 2vmin;" type="text" placeholder="Enter a certification name" v-model="payload.certifications[index].title" />
				<br />
				Completion Date
				<input class="input" style="margin-bottom: 2vmin;" type="date" placeholder="mm/dd/yyyy" v-model="payload.certifications[index].date" />
				<br />
				Certification Number (if applicable)
				<input class="input" style="margin-bottom: 2vmin;" type="text" placeholder="12345678" v-model="payload.certifications[index].number" />
			</div>
			<span v-on:click="addCert()">+ Add another certification</span>
		</div>
	</div>
	<div v-if="selectedIndex == 12" class="w95">
		<h1 class="cjQuestionHeader">Lastly, add a profile picture:</h1>
		<label for="picture-upload">		
			<div style="text-align: center; width: 100%; font-size: 20vmin; margin-top: 10%;" v-if="!showPFP">
				<i class="fa-solid fa-image" style="background-color: lightgrey; padding: 9vmin; border-radius: 9999px;"></i>
			</div>
			<img style="margin-top: 5%; width: 50%; margin-left: 25%; " v-bind:src="$parent.profilePictureURL" v-if="showPFP" />
			<br />
			<div style="width: 50%; margin-left: 25%; border-color: var(--teal); border-radius: 40px; border-style: solid; font-size: 3vmin; padding: 0.8vmin; text-align: center;">
				+ Upload Profile Picture
			</div>
		</label>
	</div>
	<div v-if="selectedIndex == 13" class="w95">
		<h1 class="cjQuestionHeader">Welcome to Bastion!</h1>
		<h1 class="addPayoutInfo">
			Your Bastion coaching account has successfully been created. 
			Click the button below to enter billing information, so you can start recieving payouts from your clients. 
			Afterwards, you'll be redirected to your account dashboard.
		</h1>
		<div style="width: 100%; text-align: center;">
			<i class="fa-solid fa-file-invoice-dollar moneyIcon" v-on:click="openPortal()"></i>
		</div>
		
	</div>
	<div class="back" v-show="selectedIndex > 0" v-on:click="previousQuestion">Go back a question</div>
	<button class="button b-button next" v-show="selectedIndex < 13" style="background-color: var(--teal);" v-on:click="next()">Next</button>
</div>
`;


var coachJoin = {
  template: coachJoinTemplate,
  data: function(){
    return{
		selectedIndex: 4,
		showPFP: false,
		onboardURL: "",
		comp: "",
		circ: "",
		payload: {
			firstName: "",
			lastName: "",
			location: "",
			gender: "Male",
			about: "",
			languages: [{language: "English (Default)", proficiency: "Fluent"}],
			attributes: ["", ""],
			specialties: ["", "", ""],
			accountable: "",
			compExperience: "No",
			comps: ["Bodybuilding", "Powerlifting"],
			circumstances: ["Special Dietary Needs"],
			memberships: [{title: "Basic Membership (monthly price)", price: 100, description: "", features: ["", "", "", ""]}],
			certifications: [{title: "", date: "", number: ""}]
		}
	}
  },
  methods:{
	next: async function(){
		if (this.selectedIndex == 12){
			axios.post("/coachJoin", this.payload).then(res => {
				this.onboardURL = res.data;
				console.log(res.data);
			});
			await this.$parent.displayLoad(3000);
			this.$parent.refreshHome();
			this.selectedIndex++;
			return;
		}
		if (this.selectedIndex == 13){
			
		}
		this.selectedIndex++;
	}, 
	previousQuestion: function(){
		this.selectedIndex--;
		if (this.selectedIndex < 0){
			this.selectedIndex = 0;
		}
	},
	addComp: function(){
		this.payload.comps.push(this.comp);
		this.comp = "";
	},
	addCert: function(){
		this.payload.certifications.push({title: "", date: "", number: ""});
	},
	openPortal: function(){
		window.location.href = this.onboardURL;
	},
	addPlan: function(){
		this.payload.memberships.push({title: "Intermediate Membership", price: 100, description: "", features: ["", "", "", ""]});
	},
	addCirc: function(){
		this.payload.circumstances.push(this.circ);
		this.circ = "";
	},
	addLanguage: function(){
		this.payload.languages.push({language: "English", proficiency: "Basic"});
	},
	removeComp: function(input){
		var previous = this.payload.comps;
		this.payload.comps = [];
		for (var comp of previous){
			if (comp == input){
				continue;
			}
			this.payload.comps.push(comp);
		}
	},
	removeCirc: function(input){
		var previous = this.payload.circumstances;
		this.payload.circumstances = [];
		for (var comp of previous){
			if (comp == input){
				continue;
			}
			this.payload.circumstances.push(comp);
		}
	}
  },
  created: async function(){
	var token = this.$route.params.token;
	window.$cookies.set("token", token);
	axios.defaults.headers.common['token'] = token;
	this.$parent.token = token;
	
	this.$parent.refreshHome();
	
	eventBus.$on("pfp-updated", () => {
		console.log("updated PFP coach join");
		this.showPFP = true;
	});
	
	
  }
 }