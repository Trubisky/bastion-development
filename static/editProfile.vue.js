var editProfileTemplate = `
<div key="2" class="editProfile" v-bind:class="{box: !$parent.isMobile}"> 
	<div class="b-acctop">
		<div class="columns is-mobile" v-if="$parent.isMobile">
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div class="column is-11">
				Edit Profile
			</div>
		</div>
		<div class="columns is-mobile" v-if="!$parent.isMobile">
			<div class="column is-11">
				Edit Profile
			</div>
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
				<i class="fa-solid fa-x"></i>
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="columns is-mobile" style="padding-left: 4vmin; padding-right: 4vmin; padding-top: 4vmin;">
		<div class="column is-10" style="font-weight: 900;">
			Profile Picture
		</div>
		<div class="column" style="color: var(--teal);">
			<label for="picture-upload">Edit</label>
		</div>
	</div>
	<img v-bind:src="$parent.profilePictureURL" class="editProfileImage" />
	<div class="b-breaker"></div>
	<div class="columns is-mobile" style="padding-left: 4vmin; padding-right: 4vmin; padding-top: 4vmin;">
		<div class="column is-10" style="font-weight: 900;">
			About
		</div>
		<div class="column" style="color: var(--teal);" v-on:click="editClick()">
			{{editBinding}}
		</div>
	</div>
	<div class="aboutContent">
		<div v-show="!editing" style="overflow-wrap: break-word;">
			{{$parent.about}}
		</div>
		<div v-show="editing">
			<textarea v-model="$parent.about" class="aboutEdit textarea"></textarea>
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="columns is-mobile" style="padding-left: 4vmin; padding-right: 4vmin; padding-top: 4vmin;" v-show="$parent.isCoach">
		<div class="column is-10" style="font-weight: 900;">
			Certifications
		</div>
		<div class="column" style="color: var(--teal);" v-on:click="editCertClick()">
			{{editingCerts ? "Save" : "Edit"}}
		</div>
	</div>
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
</div>
`;


var editProfile = {
  template: editProfileTemplate,
  data: function(){
    return{
		editing: false,
		editBinding: "Edit",
		editingCerts: false,
		certifications: []
    }
  },
  methods:{
	editClick: function(){
		this.editing = !this.editing;
		if (!this.editing){
			axios.post('/updateAbout', {about: this.$parent.about}).then(async function(res){});
			this.editBinding = "Edit";
			this.$parent.slideUpMessage("Successfully updated profile.");
		}
		else{
			this.editBinding = "Save";
		}
	},
	editCertClick: function(){
		this.editingCerts = !this.editingCerts;
		if (!this.editingCerts){
			//axios.post('/updateAbout', {about: this.$parent.about}).then(async function(res){});
			//this.editBinding = "Edit";
			axios.post('/updateCertifications', {certifications: this.certifications});
			this.$parent.slideUpMessage("Successfully updated certifications.");
		}
	},
	addCert: function () {
		this.certifications.push({CERTIFICATION: "", COMPLETIONDATE: "1970-01-01", RESOURCE: "12345678"});
    },
    deleteCert: function (index) {
		this.certifications.splice(index, 1);
    }
  },
  created: function(){
	
		axios.get('/getCertifications').then(res => {
			if (res.data.length >= 1){
				this.certifications = res.data;
			}
		});
	
  }
 }