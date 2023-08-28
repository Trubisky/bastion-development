var surveyTemplate = `
<div>
	<div v-bind:class="{slidein: playSlideIn, slideout: playSlideOut}" class="surveyX">
		<h1 class="prompt">{{currentQuestion.prompt}}</h1>
		<div v-show="isInput">
			<input class="input b-textinput" v-bind:type="currentQuestion.input_type" v-bind:placeholder="currentQuestion.placeholder" v-model="surveyTextInput">
		</div>
		<div class="surveybox" v-show="isMulti">
			<div class="box b-surveyform boxpad">
				<div v-for="(option, index) in currentQuestion.options">
					<label v-bind:for="index">
					<div class="columns is-mobile b-surveycolumns" style="margin-top: 1vmin !important;">	
						<div class="column b-surveycolumn">
							{{option}}
						</div>
						<div class="column is-narrow b-surveycolumn">
							<input type="radio" name="form1" class="b-formradio" v-bind:id="index" v-bind:value="option" v-model="surveyRadioInput">
						</div>
					</div>
					</label>
					<div class="b-breaker" v-show="index != (currentQuestion.options.length-1)"></div>
				</div>
			</div>
		</div>
	</div>
	<progress class="progress progressbar is-primary" v-bind:value="currentQuestionIndex + 1" v-bind:max="questions.length">15%</progress>
	<div class="undertext">
	{{currentQuestionIndex + 1}}/{{questions.length}}
	</div>
	<div class="alreadyjoined" v-show="showLogin" v-on:click="$parent.navigate('/login')" style="visibility: hidden;">
		<!--Had something here previously, deleted it -->
	</div>
	<button class="button b-button next" v-on:click="nextQuestion()">{{advanceButtonText}}</button>
	<div class="back" v-on:click="previousQuestion">Go back a question</div>
</div>
`;


var survey = {
  template: surveyTemplate,
  data: function(){
    return{
		playSlideIn: false,
		playSlideOut: false,
		surveyTextInput: "",
		surveyRadioInput: "",
		currentQuestionIndex: 0,
		showLogin: true,
		surveyMoving: false,
		questions: [
			{
				prompt: "What is your name?",
				type: "input",
				input_type: "text",
				placeholder: "Enter your full name here."
			},
			{
				prompt: "What gender do you identify with?",
				type: "multiselect",
				options: ["Male", "Female", "Other"],
				other: true,
				input_type: "text",
				placeholder: "Enter your answer here."
			},
			{
				prompt: "How old are you?",
				type: "input",
				input_type: "number",
				placeholder: 18
			},
			{
				prompt: "What is your primary fitness goal?",
				type: "multiselect",
				options: ["Improving my Health", "Getting Leaner", "Gaining Muscle", "Gaining Strength", "Athletic Performance", "Become Competetion Ready"],
				other: true,
				input_type: "text",
				placeholder: "Enter your answer here."
			},
			{
				prompt: "In the past week, how many times have you worked out?",
				type: "multiselect",
				options: ["None", "1-2 Days", "2-3 Days", "3-4 Days", "5+ days"],
				other: false
			},
			{
				prompt: "How often would you like to workout each week?",
				type: "multiselect",
				options: ["1-2 Days", "2-3 Days", "3-4 Days", "5+ days"],
				other: false
			},
			{
				prompt: "What best describes your relationship with fitness?",
				type: "multiselect",
				options: ["I am looking to compete in my sport of choice", "I am just getting started", "I want to get back into fitness", "I am a beginner (3 months - 1 year of consistent exercise", "I am an intermediate (1 - 3 years of consistent exercise", "I am advanced (3+ years of structured and regimented exercise)"],
				other: false
			},
			{
				prompt: "Are there any special circumstances your coach should be aware of?",
				type: "multiselect",
				options: ["A specific injury", "Special nutritional requirements", "A physical impairment", "Pregnancy", "None of the Above"],
				other: true,
				input_type: "text",
				placeholder: "Explain here."
			},
			{
				prompt: "Where are you planning to exercise?",
				type: "multiselect",
				options: ["Gym", "Home", "Fitness Studio", "Outdoors", "I am not sure yet."],
				other: true,
				input_type: "text",
				placeholder: "Enter your chosen workout location"
			},
			{
				prompt: "Have you worked with a coach/personal trainer before?",
				type: "multiselect",
				options: ["Yes", "No"],
				other: false
			},
			{
				prompt: "I will need a lot of help with accountability from my coach",
				type: "multiselect",
				options: ["Most like me", "Somewhat like me", "Barely like me", "Not like me"],
				other: false
			},
			{
				prompt: "How would you best describe your ideal coach?",
				type: "multiselect",
				options: ["Strictly goal driven", "Flexible / Understanding", "Holds me accountable", "Always positive", "Proactive with communication", "Only communicates when necessary", "Good sense of humor"],
				other: false
			},
			{
				prompt: "Do you have a preferred sex for your coach?",
				type: "multiselect",
				options: ["Male", "Female", "No preference"]
			},
			{
				prompt: "How did you hear about us?",
				type: "input",
				input_type: "text",
				placeholder: "Enter your answer here."
			}
		]
    }
  },
  methods:{
	nextQuestion: async function(){
		if (this.surveyMoving){
			return;
		}
		if (!this.surveyTextInput && !this.surveyRadioInput){
			this.$parent.slideUpMessage("Please answer the question before continuing");
			return;
		}
		this.showLogin = false;
		if (this.currentQuestionIndex != this.questions.length - 1){
			this.surveyMoving = true;
			//In all cases but the final question, simply advance the question index. Everything is bound to vue and will auto update.
			this.playSlideOut = true;
			await this.$parent.sleep(300);
			this.playSlideOut = false;
			this.playSlideIn = true;
			this.currentQuestionIndex++;
			await this.$parent.sleep(300);
			this.playSlideIn = false;
			this.surveyMoving = false;
		}
		else{
			//Save survey answers and redirect to create account (WIP)
			//Update: survey answers save as you go, they're in the root's data object.
			
			this.currentQuestionIndex++;
			this.$parent.$router.push({path: "/createAccount"});
		}
	},
	previousQuestion: async function(){
		if (this.surveyMoving || this.currentQuestionIndex == 0){
			return;
		}
		this.surveyMoving = true;
		//In all cases but the final question, simply advance the question index. Everything is bound to vue and will auto update.
		this.playSlideOut = true;
		await this.$parent.sleep(300);
		this.playSlideOut = false;
		this.playSlideIn = true;
		this.currentQuestionIndex--;
		await this.$parent.sleep(300);
		this.playSlideIn = false;
		this.surveyMoving = false;
	}
  },
  computed: {
	currentQuestion: function(){
		return this.questions[this.currentQuestionIndex];
	},
	isInput: function(){
		return this.currentQuestion.type == "input" ? true : false;
	},
	isMulti: function(){
		return this.currentQuestion.type == "multiselect" ? true : false;
	},
	advanceButtonText: function(){
		return this.currentQuestionIndex != (this.questions.length-1) ? "Next" : "Create your Account";
	}
  },
  watch: {
	currentQuestionIndex: function(newIndex, oldIndex){
		console.log(this.surveyTextInput);
		console.log(this.surveyRadioInput);
		if (!this.surveyTextInput && !this.surveyRadioInput){
			return;
		}
		var surveyAnswerObject = {
			prompt: this.questions[oldIndex].prompt,
			type: this.questions[oldIndex].type,
			inputAnswer: this.surveyTextInput,
			multiselectAnswer: this.surveyRadioInput
		}
		this.$parent.surveyAnswers.push(surveyAnswerObject);
		this.surveyRadioInput = "";
		this.surveyTextInput = "";
	}
  }
 }