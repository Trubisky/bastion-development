var review1Template = `
<div style="height: 100%;" key="1">
	<div v-if="!showScreen && !$parent.isMobile">
		<div class="b-acctop">
			<div class="columns is-mobile" style="width: 90%; margin-left: 5%;">
				<div class="column arrowAdjust" v-on:click="$parent.navigate('/viewCoach')">
					<i class="fa-solid fa-arrow-left"></i>
				</div>
				<div class="column is-11" style="text-align: center;">
					<div style="position: relative; display: flex; align-items: center; text-align: center; justify-content: center; width: 100%;">Review</div> 
				</div>
			</div>
			<div class="b-breaker"></div>
		</div>
		<div style="text-align: center; font-size: 3.5rem; width: 50%; margin-left: 25%; margin-top: 3rem; font-weight: 900;">
			Have a positive experience so far?
		</div>
		<div style="text-align: center; font-size: 1.7rem; width: 40%; margin-left: 30%; font-weight: 300;">
			The Bastion team and the coaches would love to hear what you have to say!
			Leave a quick review of your experience below. 
		</div>
		<textarea class="textarea" style="width: 40% !important; min-width: 40%; margin-left: 30%; height: 30%; margin-top: 3rem;" v-model="review"></textarea>
		<br />
		<button v-on:click="next()" class="button b-button" style="color: black; margin-left: 40%; margin-top: 3rem; margin-bottom: 3rem; background-color: white; width: 20%; border-color: var(--teal); font-weight: 900; height: 4rem;">Next</button>
	</div>
	<div v-if="!showScreen && $parent.isMobile">
		<div class="b-acctop">
			<div class="columns is-mobile" style="width: 90%; margin-left: 5%;">
				<div class="column arrowAdjust" v-on:click="$parent.navigate('/viewCoach')">
					<i class="fa-solid fa-arrow-left"></i>
				</div>
				<div class="column is-11" style="text-align: center;">
					<div style="position: relative; display: flex; align-items: center; text-align: center; justify-content: center; width: 100%;">Review</div> 
				</div>
			</div>
			<div class="b-breaker"></div>
		</div>
		<div style="text-align: center; font-size: 2.5rem; width: 100%; margin-top: 1rem; font-weight: 900;">
			Have a positive experience so far?
		</div>
		<div style="text-align: center; font-size: 1.2rem; width: 90%; margin-left: 5%; font-weight: 300;">
			The Bastion team and the coaches would love to hear what you have to say!
			Leave a quick review of your experience below. 
		</div>
		<textarea class="textarea" style="width: 80% !important; min-width: 80%; margin-left: 10%; height: 30%; margin-top: 1rem;" v-model="review"></textarea>
		<br />
		<button v-on:click="next()" class="button b-button" style="color: black; margin-left: 15%; margin-top: 1rem; margin-bottom: 3rem; background-color: white; width: 70%; border-color: var(--teal); font-weight: 900; height: 4rem;">Next</button>
	</div>
	<div v-if="showScreen && !$parent.isMobile">
		<div class="b-acctop">
			<div class="columns is-mobile" style="width: 90%; margin-left: 5%;">
				<div class="column arrowAdjust" v-on:click="showScreen--;">
					<i class="fa-solid fa-arrow-left"></i>
				</div>
				<div class="column is-11" style="text-align: center;"> 
					<div style="position: relative; display: flex; align-items: center; text-align: center; justify-content: center; width: 100%;">Review</div> 
				</div>
			</div>
			<div class="b-breaker"></div>
		</div>
		<div style="text-align: center; font-size: 3.5rem; width: 50%; margin-left: 25%; margin-top: 5rem; font-weight: 900;">
			Upload a before and after photo
		</div>
		<div style="text-align: center; font-size: 1.7rem; width: 40%; margin-left: 30%; font-weight: 300;">
			Love what you are seeing? Upload a picture of yourself before the start of your program with Bastion and a picture of you now!
		</div>
		<div class="columns" style="width: 50%; margin-left: 25%; font-size: 5rem; text-align: center; margin-top: 3rem;">
			<div class="column is-6">
				
				<i class="fa-solid fa-image"></i>
				
				<br />
				
				<button class="button b-button" v-bind:class="{'teal': before}" style="width: 60%; background-color: white; border-color: var(--teal); margin-top: 2rem;" v-html="beforeTextBinding" v-on:click="openUpload(0)"></button>
				<br />
				<span v-show="beforeInfo" style="font-size: 1rem; font-weight: 300">{{beforeInfo}}</span>
			</div>
			<div class="column">
				<i class="fa-solid fa-image"></i>
				<br />
				<button class="button b-button" v-bind:class="{'teal': after}" style="width: 60%; background-color: white; border-color: var(--teal); margin-top: 2rem;" v-html="afterTextBinding" v-on:click="openUpload(1)"></button>
				<br />
				<span v-show="afterInfo" style="font-size: 1rem; font-weight: 300">{{afterInfo}}</span>
			</div>
		</div>
		<button class="button b-button" style="color: black; margin-left: 40%; margin-top: 3rem; background-color: white; width: 20%; border-color: var(--teal); font-weight: 900; height: 4rem;" v-on:click="sendReview();">Submit</button>
		<input type="file" v-on:change="uploadResult" id="uploadResult" style="visibility: hidden;" value="null"/>
	</div>
	<div v-if="showScreen && $parent.isMobile">
		
		
		<div class="b-acctop">
			<div class="columns is-mobile" style="width: 90%; margin-left: 5%;">
				<div class="column arrowAdjust" v-on:click="showScreen--;">
					<i class="fa-solid fa-arrow-left"></i>
				</div>
				<div class="column is-11" style="text-align: center;">
					<div style="position: relative; display: flex; align-items: center; text-align: center; justify-content: center; width: 100%;">Review</div> 
				</div>
			</div>
			<div class="b-breaker"></div>
		</div>
		<div style="text-align: center; font-size: 2.5rem; width: 90%; margin-left: 5%; margin-top: 1rem; font-weight: 900;">
			Upload a before and after photo
		</div>
		<div style="text-align: center; font-size: 1rem; width: 90%; margin-left: 5%; font-weight: 300;">
			Love what you are seeing? Upload a picture of yourself before the start of your program with Bastion and a picture of you now!
		</div>
		<div class="columns" style="width: 70%; margin-left: 15%; font-size: 5rem; text-align: center; margin-top: 1rem;">
			<div class="column is-11">
				
				<i class="fa-solid fa-image"></i>
				
				<br />
				
				<button class="button b-button" v-bind:class="{'teal': before}" style="width: 100%; background-color: white; border-color: var(--teal); margin-top: 2rem;" v-html="beforeTextBinding" v-on:click="openUpload(0)"></button>
				<br />
				<span v-show="beforeInfo" style="font-size: 1rem; font-weight: 300">{{beforeInfo}}</span>
			</div>
			<div class="column is-11">
				<i class="fa-solid fa-image"></i>
				<br />
				<button class="button b-button" v-bind:class="{'teal': after}" style="width: 100%; background-color: white; border-color: var(--teal); margin-top: 2rem;" v-html="afterTextBinding" v-on:click="openUpload(1)"></button>
				<br />
				<span v-show="afterInfo" style="font-size: 1rem; font-weight: 300">{{afterInfo}}</span>
			</div>
		</div>
		<button class="button b-button" style="color: black; margin-left: 10%; margin-top: 1rem; background-color: white; width: 80%; border-color: var(--teal); font-weight: 900; height: 4rem;" v-on:click="sendReview();">Submit</button>
		<input type="file" v-on:change="uploadResult" id="uploadResult" style="visibility: hidden;" value="null"/>
	</div>
</div>
`;


var review1 = {
  template: review1Template,
  data: function(){
    return{
		showScreen: 0,
		review: "",
		before: "",
		after: "",
		uploadingIndex: 0,
		beforeInfo: "",
		afterInfo: ""
    }
  },
  methods:{
	sendReview: function(){
		if (!this.review){
			this.$parent.slideUpMessage("Please fill out a review before submitting");
			return;
		}
		axios.post("/leaveReview", {review: this.review, before: this.before, after: this.after});
		this.$parent.slideUpMessage("Thank you! your review has been submitted.");
		this.$parent.navigate("/viewCoach");
		
		//you need to fix the endpoint to conditionally upload the pictures based on if they've been submitted, and finish this method with feedback
	},
	uploadResult: function(e){
		 var reader = new FileReader();
		
		 reader.readAsDataURL(e.target.files[0]);
		 reader.onload = async () => {
			 console.log(reader);
            console.log(reader.result);
			if (this.uploadingIndex == 0){
				this.before = reader.result;
				this.beforeInfo = "Filename: " + e.target.files[0].name + " " + Math.floor(e.target.files[0].size / 1000) + "kb";
			}
			else{
				this.after = reader.result;
				this.afterInfo = "Filename: " + e.target.files[0].name + " " + Math.floor(e.target.files[0].size / 1000) + "kb";
			}
		 }
	},
	openUpload: function(index){
		this.uploadingIndex = index;
		$("#uploadResult").click();
	},
	checkOffers: function(){
		axios.get("/getOffers").then(res => {
			if (res.data.length == 0){
				this.$parent.slideUpMessage("We're still looking for coaches for you - check back soon.");
			}
			else{
				this.$parent.coachingOffers = res.data;
				this.$parent.navigate("/offers");
			}
		});
	},
	openPortal: function(){
		axios.get("/getStripePortalURL").then(res => {
			window.open(res.data, '_blank');
		});
	},
	viewCoach: function(){
		this.$parent.navigate("/viewCoach");
	},
	next: function(){
		this.showScreen++;
	}
  },
  computed: {
	beforeTextBinding: function(){
		if (this.before){
			return "Change Before Picture"
		}
		return `<i class="fa-solid fa-plus"></i> &nbsp Upload Before Picture`
	},
	afterTextBinding: function(){
		if (this.after){
			return "Change After Picture"
		}
		return `<i class="fa-solid fa-plus"></i> &nbsp Upload After Picture`
	}
  }
 }