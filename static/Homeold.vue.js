var homeTemplate = `
<div>
	<div v-if="$parent.isMobile">
		<img class="main-image" src="/resources/gymfit1.png" />
		  <div class="under-image">
			<h1 class="future">BASTION IS THE FUTURE OF FITNESS</h1>
			<p class="description">
			Bastion recruits a wide selected of only the most experienced and knowledgeable online coaches the fitness industry has to offer. We ensure that whether you are trying to lose weight, compete in a bodybuilding show, or train for a marathon, you coach is carefully selected to produce guaranteed results. 
			</p>
			<button class="button b-button">VIEW PLANS</button>
			<button class="button b-button" style="background-color: white; margin-top: 3vmin;">Browse Coaches</button>
		  </div>
		<div class="additional">
			<h1 class="future">A fitter lifestyle fit for everyone</h1>
			<p class="droptext" style="font-style: italic;">
				Online fitness coaching is not traditional personal training with 1-hour sessions. It is more affordable, effective, and flexible to your needs.
			</p>
			<h3 style="font-weight: 500; padding-bottom: 3vmin;">CUSTOMIZED WORKOUTS</h3>
			<h1 class="future">Tailored to your goals and preferences</h1>
			<p class="droptext">
				We will make the perfect workout plans according to the information you have provided us such as your fitness level and long term goal. 
			</p>
		</div>
	</div>
	<div v-if="!$parent.isMobile">
		<div class = "content">
			<div class = "a-back">
				<div class = "a-atext">BASTION IS THE FUTURE OF FITNESS </div>
				<div class = "a-btext">Bastion recruits a wide selected of only the most experienced 
					and knowledgeable online coaches the fitness industry has to offer. </div>
				<button class = "a-abutton button">
					<div class = "buttontxt">Find Your Coach</div>
				</button>
				<button class = "a-bbutton button">
					<div class = "buttontxt">Learn More</div>
				</button>
			</div>
		
			<div class="b-back" style="width: 100%;">
				<img src="/resources/bbgkd.png" alt="Image" class = "b-img">
				<div class="text-overlay">
					<div class = "b-atext">A fitter lifestyle fit for everyone </div>
					<div class = "b-btext">Online fitness coaching is not traditional personal training with 1-hour sessions. 
						It is more affordable, effective, and flexible to your needs 
					</div>
				</div>
			</div>
				  
			<div class = "c-back" style="margin-top: -1vmin;">
				<div class = "c-images">
					<img src="/resources/pplgym.png" alt="Hello" class="c-aimage">
					<img src="/resources/pplgym.png" alt="Hello" class= "c-bimage">
				</div>
				<div class = "c-text">
					<div class="c-atext">CUSTOMIZED WORKOUTS</div>
					<div class="c-btext">Tailored to your goals and preferences</div>
					<div class="c-ctext">We will make the perfect workout plans 
						according to the information you have provided us such as your fitness level and long term goal. </div>
				</div>
				
			</div>
			<div class = "c-back" style="margin-top: -1vmin;"> 
				<div class = "c-text2">
					<div class="c-atext">BY YOUR SIDE </div>
					<div class="c-btext">Your online coach is holding you accountable every step of the way.</div>
					<div class="c-ctext">Your coach will be reachable at every step of your training journey. 
						Your coach will optimize your exercise and nutrition plan.. </div>
				</div>
				<div class = "c-images2">
					<img src="/resources/pplgym.png" alt="Hello" class="c-aimage">
					<img src="/resources/pplgym.png" alt="Hello" class= "c-bimage">
				</div>
				
				
			</div>
			<div class = "d-back columns is-mobile">
				<div class = "d-backleft is-half">
					<div class = "d-images">
					<img src="/resources/phone.png" alt="Phone 1">
					<img src="/resources/phone.png" alt="Phone 2">
					</div>
				</div>
				<div class = "d-backright is-half">
					<div class="d-text">How it Works</div>
					<img src="/resources/howitwork.PNG" alt="Phone w" class = "d-back-image">
				</div>
			</div>
			<div class = "e-back columns">
				<div class = "column is-two-fifths e-text">
					<div class = "e-atext">The best coaches for your best self.</div>
					<div class = "e-btext">Your coach is your partner in crime when coming to achieve your fitness goals. </div>
					<div class = "e-ctext">
						<div class = "e-cctext">View all Coaches</div>
						<i class="fa-light fa-arrow-right-long" style="color: #00e8e8;"></i>
					</div>
				</div>
				<div class= "f-tiles">
					<div class="f-tile">
						<img src="/resources/phone.png" alt="Image" class="image">
						<div class = "f-bgkd">
							<div class="f-text">
								<span class = "f-bold">Sebastion P.</span>
								<span class="text-line">Goal-Oriented</span>
								<span class="text-line">Body Building </span>
							</div>
							<div class="centered-text">
								<span>VIEW PROFILE</span>
							</div>
						</div>
					</div>
					<div class="f-tile f-highlight">
						<img src="/resources/phone.png" alt="Image" class="image">
						<div class = "f-bgkd">
							<div class="f-text">
								<span class = "f-bold">Sebastion P.</span>
								<span class="text-line">Goal-Oriented</span>
								<span class="text-line">Body Building </span>
							</div>
							<div class="centered-text">
								<span>VIEW PROFILE</span>
							</div>
						</div>
					</div>
					<div class="f-tile">
						<img src="/resources/phone.png" alt="Image" class="image">
						<div class = "f-bgkd">
							<div class="f-text">
								<span class = "f-bold">Sebastion P.</span>
								<span class="text-line">Goal-Oriented</span>
								<span class="text-line">Body Building </span>
							</div>
							<div class="centered-text">
								<span>VIEW PROFILE</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`;


var home = {
  template: homeTemplate,
  data: function(){
    return{

    }
  },
  methods:{
	
  }
 }