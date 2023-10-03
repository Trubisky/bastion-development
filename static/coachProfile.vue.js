var coachProfileTemplate = `
<div key="2" style="height: 100%;"> 
	<div class="b-acctop">
		<div class="columns is-mobile" style="width: 90%; margin-left: 5%;">
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div class="column is-11" style="text-align: center;">
				<div style="position: relative; display: flex; align-items: center; text-align: center; justify-content: center; width: 100%;">My Profile</div> 
				 
			</div>
		</div>
		<div class="b-breaker"></div>
	</div>
	<div class="columns" style="width: 90%; margin-left: 5%;">
		<div class="column is-1" style="position: relative; ">
			<img class="clientimage" style="width: 100%; height: auto;" v-bind:src="$parent.profilePictureURL" />
			<label for="picture-upload">
			<i class="fa-solid fa-pencil" style="position: absolute; cursor: pointer; right: 10px; bottom: 10px; border-radius: 100px; border-style: solid; border-width: 2px; padding: 0.7rem; background-color: white; color: var(--teal);"></i>
			</label>
		</div>
		<div class="column" style="display: flex; align-items: center;">
			<div>
				<span style="font-weight: 700;">{{$parent.name}}</span>
				<br />
				{{$parent.location}}
			</div>
		</div>
	</div>
	<div class="columns" style="width: 90%; margin-left: 5%;">
		<div class="column is-4" style="border-right: solid 1px grey;">
			<span style="font-size: 1.5rem; font-weight: 700;">Bastion Balance:</span>
			<div style="width: 100%; text-align: center; font-weight: 700;">
				<span style="font-size: 2rem;">
					$ {{availableBalance + pendingBalance}}
					<br />
					Total Redeemable
					<br />
				</span>
				Pending: $ {{pendingBalance}}
			</div>
			<button class="button b-button" style="width: 100%; margin-left: 0%; color: black; height: 5rem; font-size: 1.5rem; margin-top: 1rem; margin-bottom: 1rem;" v-on:click="openPortal()">Open Payouts Portal</button>
			<span style="font-size: 1.5rem; font-weight: 700;">My Bio: <span style="color: var(--teal); font-size: 1rem;" v-html="editBinding" v-on:click="editClick()"></span> </span>
			<div v-show="!editing" style="overflow-wrap: break-word;">
				{{$parent.about}}
			</div>
			<div v-show="editing">
				<textarea v-model="$parent.about" class="aboutEdit textarea"></textarea>
			</div>
			<br />
			
			<span style="font-size: 1.5rem; font-weight: 700;">Account Controls:</span>
			<br />
			<span style="color: var(--teal);" v-on:click="resetPassword()">Reset my Password</span>
			<br /><br />
			
			<span style="font-size: 1.5rem; font-weight: 700;">My Languages:</span>
			<div v-for="language in languages">
				{{language.LANGUAGE}} ({{language.FLUENCY}})
			</div>
			<br />
			<span style="font-size: 1.5rem; font-weight: 700;">My Certifications: <span style="color: var(--teal); font-size: 1rem;" v-html="editCertBinding" v-on:click="editCertClick()"></span></span>
			<div class="content certAdjust" v-show="!editingCerts && $parent.isCoach">
				<ul>
					<li v-for="(cert, index) in certifications">
					{{cert.CERTIFICATION}}
						<ul>
							<li>Completed on {{cert.COMPLETIONDATE}}</li>
							<li>Certification Number: {{cert.RESOURCE}}</li>
						</ul>
						<br />
					</li>
				</ul>
			</div>
			<div class="content" v-show="editingCerts && $parent.isCoach">
				<ul>
					<li v-for="(cert, index) in certifications" style="display: inline;">
						<input class="input certInput" type="text" v-model="certifications[index].CERTIFICATION" />
						<ul>
							<li><input class="input certInput" type="date" v-model="certifications[index].COMPLETIONDATE" /></li>
							<li><input class="input certInput" type="text" v-model="certifications[index].RESOURCE" /></li>
							<li><button class="button" v-on:click="deleteCert(index)"><i class="fa-solid fa-trash"></i>&nbspRemove Certification</button></li>
							<br />
						</ul>
					</li>
				</ul>
				<button class="button" v-on:click="addCert()" style="margin-left: 2em;"><i class="fa-solid fa-plus"></i>&nbspAdd Certification</button>
			</div>
			
			<span style="font-size: 1.5rem; font-weight: 700;">Expertise:</span>
			<div v-for="exp in expertise">
				{{exp}}
			</div>
		</div>
		<div class="column">
			<span style="font-size: 1.5rem; font-weight: 700;">My Membership Pricings: &nbsp <i v-on:click="$parent.navigate('/memberships')" class="fa-solid fa-pencil" style="font-size: 1rem; color: var(--teal);"></i></span>
			<br /><br />
			<div v-for="pricing in pricings">
				<div class="columns">
					<div class="column is-11" style="font-size: 1.5rem; font-weight: 700; padding-bottom: 0;">
						{{pricing.TITLE}}
					</div>
					<div class="column" style="font-size: 1.5rem; font-weight: 700; padding-bottom: 0;">
						$ {{pricing.PRICE}}
					</div>
				</div>
				{{pricing.DESCRIPTION}}
				<ul>
					<li v-for="feature in pricing.FEATURES">&nbsp &nbsp<i class="fa-solid fa-minus"></i> {{feature.FEATURE}}</li>
				</ul>
				<br />
				<div class="b-breaker"></div>
				<br />
				
			</div>
			<span style="font-size: 1.5rem; font-weight: 700;">My Clients:</span>
			<br /><br />
			<div v-if="!$parent.isMobile" style="display: flex; flex-direction: row; width: 95%; margin-left: 2.5%;">
				<div class="columns" style="width: 25%; background-color: var(--b-lg); margin-right: 1rem; margin-left: 1rem;" v-for="client in clients" v-on:click="$parent.navigate('/viewActiveClient/' + client.PLANID);">
					<div class="column is-3">
						<img v-bind:src="client.PROFILEPICTURE" style="width: 100%; height: auto;" />
					</div>
					<div class="column is-7" style="display: flex; align-items: center;">
						{{client.NAME}}
					</div>
					<div class="column" style="display: flex; align-items: center;">
						<i class="fa-regular fa-circle-right"></i>
					</div>
				</div>
				<div class="columns">
					<div class="column is-12" style="display: flex; align-items: center; font-size: 1.1rem;" v-on:click="$parent.navigate('/clients');">
						See All Clients &nbsp <i class="fa-solid fa-arrow-right"></i>
					</div>
				</div>
			</div>
			<div v-if="$parent.isMobile" style=" width: 95%; margin-left: 2.5%;">
				<div class="columns is-mobile" style="width: 80%; margin-bottom: 1.5rem; background-color: var(--b-lg); margin-right: 1rem; margin-left: 1rem;" v-for="client in clients" v-on:click="$parent.navigate('/viewActiveClient/' + client.PLANID);">
					<div class="column is-3">
						<img v-bind:src="client.PROFILEPICTURE" style="width: 100%; height: auto;" />
					</div>
					<div class="column is-7" style="display: flex; align-items: center;">
						{{client.NAME}}
					</div>
					<div class="column" style="display: flex; align-items: center;">
						<i class="fa-regular fa-circle-right"></i>
					</div>
				</div>
				<div class="columns">
					<div class="column is-12" style="display: flex; align-items: center; font-size: 1.1rem;" v-on:click="$parent.navigate('/clients');">
						See All Clients &nbsp <i class="fa-solid fa-arrow-right"></i>
					</div>
				</div>
			</div>
			<br />
		</div>
	</div>
	
	
</div>
`;


var coachProfile = {
  template: coachProfileTemplate,
  data: function(){
    return{
		editing: false,
		editBinding: `<i class="fa-solid fa-pencil"></i>`,
		editCertBinding: `<i class="fa-solid fa-pencil"></i>`,
		editingCerts: false,
		certifications: [],
		pricings: [],
		expertise: [],
		clients: [],
		reviews: [],
		availableBalance: 0,
		pendingBalance: 0,
		languages: []
    }
  },
  methods:{
	resetPassword: async function(){
		await axios.get("/requestPasswordReset");
		this.$parent.slideUpMessage("A reset password link has been sent to your email.");
	},
	editClick: function(){
		this.editing = !this.editing;
		if (!this.editing){
			axios.post('/updateAbout', {about: this.$parent.about}).then(async function(res){});
			this.editBinding = `<i class="fa-solid fa-pencil"></i>`;
			this.$parent.slideUpMessage("Successfully updated profile.");
		}
		else{
			this.editBinding = `<i class="fa-solid fa-floppy-disk"></i>`;
		}
	},
	editCertClick: function(){
		this.editingCerts = !this.editingCerts;
		if (!this.editingCerts){
			this.editCertBinding = `<i class="fa-solid fa-pencil"></i>`
			//axios.post('/updateAbout', {about: this.$parent.about}).then(async function(res){});
			//this.editBinding = "Edit";
			axios.post('/updateCertifications', {certifications: this.certifications});
			this.$parent.slideUpMessage("Successfully updated certifications.");
		}
		else{
			this.editCertBinding = `<i class="fa-solid fa-floppy-disk"></i>`
		}
	},
	addCert: function () {
		this.certifications.push({CERTIFICATION: "", COMPLETIONDATE: "1970-01-01", RESOURCE: "12345678"});
    },
    deleteCert: function (index) {
		this.certifications.splice(index, 1);
    },
	openPortal: function(){
		axios.get("/getStripeLoginURL").then(res => {
			window.open(res.data, '_blank');
			//window.location.href = res.data;
		})
	}
  },
  created: async function(){
		await this.$parent.refreshHome();
		
		axios.get('/getCertifications').then(res => {
			if (res.data.length >= 1){
				this.certifications = res.data;
			}
		});
		
		if (this.$parent.isCoach){
			axios.get("/getStripeBalance").then(res => {
				this.pendingBalance = res.data.pending;
				this.availableBalance = res.data.available;
			});
			
			axios.get("/getCoachDisplay/" + this.$parent.id).then(res =>{
				this.languages = res.data.profileInfo.LANGUAGES;
				this.expertise = res.data.profileInfo.EXPERTISE;
			});
			
			axios.get("/getPricings").then(res => {
				this.pricings = res.data;
			});
			
			axios.get("/getMyClients").then(res => {
				this.clients = res.data;
				
				if (this.clients.length == 0){
					
				}
				else if (this.clients.length < 3){
					this.clients[1] = this.clients[0];
					this.clients[2] = this.clients[0];
				}
				else if (this.clients.length > 3){
					this.clients = this.clients.slice(0, 3);
				}
			});
			
			 axios.get("/getReviews/" + this.$parent.id).then(res => {
				  this.reviews = res.data;
			  });
		}
	
  }
 }