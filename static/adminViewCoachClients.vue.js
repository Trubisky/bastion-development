var adminViewCoachClientsTemplate = `
<div key="2">
	<div class="b-acctop">
		<div class="columns is-mobile">
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/adminViewCoach/' + $route.params.coachid)">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div class="column is-11">
				{{NAME}}'s Clients
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="columns is-mobile clientoptions">
		<div class="column is-6" v-bind:class="{tealcolor: selectedIndex == 0}" v-on:click="selectedIndex = 0">
			Active Clients
		</div>
		<div class="column" v-bind:class="{tealcolor: selectedIndex == 1}" v-on:click="selectedIndex = 1">
			Past Clients
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="sortContainer">
		<span class="sortText">{{clientCount}} CLIENTS
		</span>
		<div class="dropdown" v-bind:class="{'is-active': showDropdown}">
			<div class="dropdown-trigger" v-on:click="showDropdown = !showDropdown">
			  <button class="dropdown-button" aria-haspopup="true" aria-controls="dropdown-menu3">
				<span>SORT</span>
				<span class="icon is-small">
				  <i class="fas fa-angle-down" aria-hidden="true"></i>
				</span>
			  </button>
			</div>
			<div class="dropdown-menu" id="dropdown-menu3" role="menu">
			  <div class="dropdown-content">
				<a href="#" class="dropdown-item">
				  Sort Option
				</a>
			  </div>
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<br />
	<div class="columns is-mobile clientoption" v-for="client in activeClients" v-show="selectedIndex == 0">
		<div class="column is-11">
			<img class="clientimage" v-bind:src="client.PROFILEPICTURE"/>  {{client.NAME}}
		</div>
		<div class="column" style="align-items: center; display: flex;" v-on:click="openClient(client.ID)">
			<i class="fa-solid fa-arrow-right"></i>
		</div>
	</div>
	<div class="columns is-mobile clientoption" v-for="client in pastClients" v-show="selectedIndex == 1">
		<div class="column is-11">
			<img class="clientimage" v-bind:src="client.PROFILEPICTURE"/>  {{client.NAME}}
		</div>
		<div class="column" style="align-items: center; display: flex;" v-on:click="openClient(client.ID)">
			<i class="fa-solid fa-arrow-right"></i>
		</div>
	</div>
	
</div>
`;


var adminViewCoachClients = {
  template: adminViewCoachClientsTemplate,
  data: function(){
    return{
		NAME: "",
		activeClients: [],
		pastClients: [],
		showDropdown: false,
		selectedIndex: 0
    }
  },
  methods:{
	openClient: function(id){
		this.$parent.storedReturnRoute = this.$route.path;
		this.$parent.navigate("/adminViewClient/" + id);
	}
  },
  created: function(){
	  axios.get("/adminViewCoachClients/" + this.$route.params.coachid).then(res =>{
		  this.NAME = res.data.NAME;
		  for (var client of res.data.CLIENTS){
			  if (client.ACTIVE == 1){
				this.activeClients.push(client);
				continue;
			  }
			  this.pastClients.push(client);
		  }
	  });
  },
  computed: {
	  clientCount: function(){
		return this.selectedIndex == 0 ? this.activeClients.length : this.pastClients.length;
	  }
  }
 }