var clientsTemplate = `
<div key="2" class="clientsDesktop" v-bind:class="{box: !$parent.isMobile}">
	<div class="b-acctop">
		<div class="columns is-mobile" v-if="$parent.isMobile">
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div class="column is-11">
				Clients
			</div>
		</div>
		<div class="columns is-mobile" v-if="!$parent.isMobile">
			<div class="column is-11">
				Clients
			</div>
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
				<i class="fa-solid fa-x"></i>
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="columns is-mobile clientoptions">
		<div class="column is-6" v-bind:class="{tealcolor: selectedIndex == 0}" v-on:click="selectedIndex = 0">
			My Clients
		</div>
		<div class="column" v-bind:class="{tealcolor: selectedIndex == 1}" v-on:click="selectedIndex = 1">
			Open Clients
		</div>
	</div>
	<div class="b-breaker" style="margin-bottom: 1rem;"></div>
	<div class="columns is-mobile clientoption" v-for="client in openClients" v-show="selectedIndex == 1">
		<div class="column is-11">
			<img class="clientimage" v-bind:src="client.PROFILEPICTURE" /> &nbsp {{client.NAME}}
		</div>
		<div class="column" style="align-items: center; display: flex;" v-on:click="$parent.navigate('/clientPreview/' + client.ID)">
			<i class="fa-solid fa-arrow-right"></i>
		</div>
	</div>
	<div class="columns is-mobile clientoption" v-for="client in myClients" v-show="selectedIndex == 0">
		<div class="column is-11">
			<img class="clientimage" v-bind:src="client.PROFILEPICTURE" /> &nbsp {{client.NAME}}
		</div>
		<div class="column" style="align-items: center; display: flex;" v-on:click="$parent.navigate('/viewActiveClient/' + client.PLANID)">
			<i class="fa-solid fa-arrow-right"></i>
		</div>
	</div>
</div> 
`;


var clients = {
  template: clientsTemplate,
  data: function(){
    return{
		selectedIndex: 0,
		openClients: [],
		myClients: []
    }
  },
  methods:{
	editClick: function(){
		
	}
  },
  created: function(){
	  axios.get("/getOpenClients").then(res => {
		  this.openClients = res.data;
	  });
	  axios.get("/getMyClients").then(res => {
		  this.myClients = res.data;
	  });
  }
 }