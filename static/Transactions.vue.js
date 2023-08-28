var transactionsTemplate = `
<div key="2">
	<div class="b-acctop">
		<div class="columns is-mobile">
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div class="column is-11">
				My Transactions
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="currentSubscription">
		TRANSACTION HISTORY
	</div>
	<br />
	<div class="currentSubscription">
		February 20th, 2023
	</div>
	<div class="columns is-mobile" style="padding-left: 4vmin; padding-right: 4vmin; padding-top: 4vmin;">
		<div class="column is-9" style="font-size: 4.5vmin;">
			<span class="transactionTitle">Coaching-Sebastien</span> 
			<br />
			Payment
		</div>
		<div class="column transactionTitle">
			$100.00
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="currentSubscription">
		January 20th, 2023
	</div>
	<div class="columns is-mobile" style="padding-left: 4vmin; padding-right: 4vmin; padding-top: 4vmin;">
		<div class="column is-9" style="font-size: 4.5vmin;">
			<span class="transactionTitle">Merchandise</span> 
			<br />
			Payment
		</div>
		<div class="column transactionTitle">
			$100.00
		</div>
	</div>
	<div class="b-breaker"></div>
</div>
`;


var transactions = {
  template: transactionsTemplate,
  data: function(){
    return{
		editing: false,
		editBinding: "Edit"
    }
  },
  methods:{
	editClick: function(){
		this.editing = !this.editing;
		if (!this.editing){
			axios.post('/updateAbout', {about: this.$parent.about}).then(async function(res){});
			this.editBinding = "Edit";
		}
		else{
			this.editBinding = "Save";
		}
	}
  }
 }