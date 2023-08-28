var thankYouTemplate = `
<div>
	<div class="thankYouBackground" >
		<div class="thxImageFix" v-if="show1">
			<img id="tRookImage" class="rookImage" src="/resources/rook.png" style="display: none;" />
			<img id="tBastionLogo" class="rookImage" src="/resources/bastion.png" style="display: none;" />
		</div>
		<div class="thxThankYou">
			<img id="thankYouText" src="/resources/thankyou.png" style="display: none;" />
			<br />
		</div>
		<div class="thankYouMessage" id="thankYouMessage" style="display: none;">
			You are one step closer to your goal. We are so excited for you to be a part of our team.
		</div>
		<div id="goToHome" style="display: none;" v-on:click="$parent.navigate('/dashboard');">
			Go to home
		</div>
	</div>
</div>
`;


var thankYou = {
  template: thankYouTemplate,
  data: function(){
    return{
		show1: true
    }
  },
  methods:{

  },
  created: async function(){
	await this.$parent.sleep(500);
	$("#tRookImage").fadeIn(1000);
	await app.sleep(1000);
	$("#tBastionLogo").fadeIn(1000);
	await app.sleep(3000);
	$("#tRookImage").fadeOut(1000);
	$("#tBastionLogo").fadeOut(1000);
	await app.sleep(2000);
	this.show1 = false;
	$("#thankYouText").fadeIn(1000);
	await app.sleep(1000);
	$("#thankYouMessage").fadeIn(1000);
	await app.sleep(2000);
	$("#goToHome").fadeIn(1000);
  }
 } 