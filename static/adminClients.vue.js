var adminClientsTemplate = `
<div key="2">
	<div class="overlay"  v-show="showAddCoach">
		<div class="box">
			<div class="box-title">ADD COACH</div>
			<input class="inputx" type="text" placeholder="Name">
			<input class="inputx" type="text" placeholder="Email">
			<input class="inputx" type="text" placeholder="ID Number">
			<input class="inputx" type="text" placeholder="Temporary Password">
			<button class="button b-button withdraw-button">Add</button>
		</div>
	</div>
	<div class="b-acctop">
		<div class="columns is-mobile">
			<div class="column arrowAdjust" v-on:click="$parent.navigate('/dashboard')">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div class="column is-11">
				{{titleText}}
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<div class="sortContainer">
		<span class="sortText">{{clients.length}} CLIENTS
		</span>
		<div class="dropdown" v-bind:class="{'is-active': showDropdown}" >
			<div class="dropdown-trigger" v-on:click="showDropdown = !showDropdown">
			  <button class="dropdown-button" aria-haspopup="true" aria-controls="dropdown-menu3">
				<span>SORT</span>
				<span class="icon is-small">
				  <i class="fas fa-angle-down" aria-hidden="true"></i>
				</span>
			  </button>
			</div>
			<div class="dropdown-menu" id="dropdown-menu3" role="menu" style="margin-left: -13vmin;">
			  <div class="dropdown-content">
				<a href="#" class="dropdown-item" v-on:click="allClients()">
				  View All Clients
				</a>
				<a href="#" class="dropdown-item" v-on:click="openClients()">
				  View Open Clients
				</a>
			  </div>
			</div>
		</div>
	</div>
	<div class="b-breaker"></div>
	<br />
	<div class="columns is-mobile clientoption" v-for="client in clients">
		<div class="column is-11">
			<img class="clientimage" v-bind:src="client.PROFILEPICTURE" />  {{client.NAME}}
		</div>
		<div class="column" style="align-items: center; display: flex;" v-on:click="$parent.navigate('/adminViewClient/' + client.ID)">
			<i class="fa-solid fa-arrow-right"></i>
		</div>
	</div>
	
</div>
`;


var adminClients = {
  template: adminClientsTemplate,
  data: function(){
    return{
		titleText: "All Clients",
		showDropdown: false,
		showAddCoach: false,
		clients: []
    }
  },
  methods:{
	editClick: function(){
		
	},
	allClients: function(){
		axios.get("/adminGetClients").then(res =>{
			this.clients = res.data;
		});
		this.titleText = "All Clients";
	},
	openClients: function(){
		axios.get("/adminGetOpenClients").then(res =>{
			this.clients = res.data;
		});
		this.titleText = "Open Clients";
	}
  },
  created: function(){
	  axios.get("/adminGetClients").then(res =>{
		  this.clients = res.data;
	  });
  }
 }