<template>
  <div class="container">
    <div class="Card">
      <div class="Card__content Card__content--border">
		<button class="Button" @click="addModalOpen=true">
			<svg aria-hidden="true" height="12" width="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
				<path d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 1 1 0-2h6V1a1 1 0 1 1 2 0z" fill-rule="evenodd"></path>
			</svg>
			Add New
		</button>
		<input class="Search" type="text" placeholder="Search..." v-model="searchBar" v-on:keyup="searchTimer()">
      </div>
        <EditModal v-bind:modalActive="editModalOpen">
			<a @click="editModalOpen=false" title="Close" class="modal-close">Close</a>
          	<h1>EDIT USER</h1>
			<div class="Input">
				<div class="Input-container">
					<input type="text"  v-model="editEmail"/>
					<label>Email</label>		
				</div>
				<div class="Input-container">
					<input type="text"  v-model="editFirstName"/>
					<label>First Name</label>		
				</div>
				
				<div class="Input-container">
					<input type="text"  v-model="editLastName"/>
					<label>Last Name</label>		
				</div>

				<div class="Input-container">		
					<input type="Text" v-model="editJob"/>
					<label>Job</label>
				</div>
				<button class="Button" @click="editConfirm()">Confirm</button>
			</div>
        </EditModal>
		<AddModal v-bind:modalActive="addModalOpen">
			<a @click="addModalOpen=false" title="Close" class="modal-close">Close</a>
			<h1>ADD NEW USER</h1>
			<div class="Input">
				<div class="Input-container">
					<input type="text"  v-model="addEmail"/>
					<label>Email</label>		
				</div>
				<div class="Input-container">
					<input type="text" v-model="addFirstName" required=""/>
					<label>First Name</label>		
				</div>
				
				<div class="Input-container">
					<input type="text"  v-model="addLastName" required=""/>
					<label>Last Name</label>		
				</div>
				<div class="Input-container">		
					<input type="Text" v-model="addJob" required=""/>
					<label>Job</label>
				</div>
				<button class="Button" @click="addConfirm()">Confirm</button>
			</div>
        </AddModal>
		<DeleteModal v-bind:modalActive="deleteModalOpen">
			<a @click="deleteModalOpen=false" title="Close" class="modal-close">Close</a>
			<h1>Are you sure you want to delete the user?</h1>
			<div class="Input">
				<button class="Button danger" @click="deleteConfirm()">Confirm</button>
			</div>
		</DeleteModal>
      <table class="Table">
        <thead>
          <tr>
            <td>ID</td>
            <td>EMAIL</td>
            <td>FIRST NAME</td>
            <td>LAST NAME</td>
            <td>ACTIONS</td>
          </tr>
        </thead>
        <tbody v-if="users.length!=0">
			<tr v-for="user in users" :key="user.id">
				<td>{{user.id}}</td>
				<td>{{user.email}}</td>
				<td>{{user.first_name}}</td>
				<td>{{user.last_name}}</td>
				<td class="Actions">		
					<button class="Button" @click="editUser(user.id)">Edit</button>
					<button class="Button" @click="deleteModalOpen=true; deleteUser = user.id;">Delete</button>
				</td>
			</tr>
			<tr>
				<td> 23 </td>
				<td>muzafferkadiryilmaz@gmail.com</td>
				<td>Muzaffer Kadir</td>
				<td>YILMAZ</td>
          	</tr>
        </tbody>
      </table>
      <div class="Card__content">
        <div class="Card__content-text"><strong> Total:{{totalUser}}</strong> result(s)</div>
		<div class="Footer">
			<button @click="changePage('previous')" class="Button " >
			<span>Previous</span>
			</button>
			<p class="Pages">{{pageNumber}}/{{totalPage}}</p>
			<button @click="changePage('next')" class="Button" >
			<span>Next</span>
			</button>
		</div>
      </div>
    </div>
  </div>
</template>

<script>
import EditModal from '../components/EditModal'
import AddModal from '../components/AddModal'
import DeleteModal from '../components/DeleteModal.vue'
export default {
  name: 'Home',
  components:{
    EditModal,
	AddModal,
	DeleteModal
  },
  data(){
	  return{
		  users:[],
		  pageNumber:1,
		  totalPage:1,
		  totalUser:0,
		  deleteModalOpen:false,
		  deleteUser:0,
		  addModalOpen:false,
		  editModalOpen:false,
		  addEmail:"",
		  addFirstName:"",
		  addLastName:"",
		  addJob:"",
		  editEmail:"",
		  editFirstName:"",
		  editLastName:"",
		  editJob:"",
		  editId:"",
		  searchBar:"",
		  timer:0,
	  }
  },

  methods:{
	  async getUsers(page=this.pageNumber){
		return this.$client
		.get('https://reqres.in/api/users',{params:{page:page}})
		.then((response) => {
			this.users = response.data.data
			this.pageNumber = response.data.page
			this.totalPage = response.data.total_pages
			this.totalUser = response.data.total
		})
		.catch(error => console.log(error))
	  },

	  changePage(context){
		  	if(context=="next" && this.pageNumber!=this.totalPage)
			  this.getUsers(this.pageNumber+1);
		  	if(context=="previous" && this.pageNumber!=1 )
			  this.getUsers(this.pageNumber-1);
	  },
	  deleteConfirm(){
		this.$client
		.delete(`https://reqres.in/api/users/${this.deleteUser}`)
		.then((response) => {
			let user = this.users.map((item) => item.id).indexOf(this.deleteUser);
			this.users.splice(user, 1);
			this.deleteModalOpen=false;
			this.$notify({
				group: 'foo',
				title: 'Success!',
				text: 'User is deleted!',
				type:'warn'
				});
			this.$notify({
				group: 'foo',
				title: 'Response:'+response.status,
				text: response.data
				});
		})
		.catch(error => 
			this.$notify({
				group: 'foo',
				title: 'Response:'+error.status,
				text: error.data,
				type:'warn'
				}))
	  },
	  addConfirm(){
		let data={
			name:this.addFirstName + " " + this.addLastName,
			job:this.addJob
		}
		this.$client
		.post('https://reqres.in/api/users/',data=data)
		.then((response) => {
			let user = {}
			user.first_name = this.addFirstName
			user.last_name = this.addLastName
			user.email = this.addEmail
			this.users.push(user)//add local users table
			this.addModalOpen=false;
			this.$notify({
				group: 'foo',
				title: 'Success!',
				text: 'User is successfully added!',
				type:'success'
				});
			this.$notify({
				group: 'foo',
				title: 'Response:'+response.status,
				text: response.data
				});
		})
		.catch(error => 
			this.$notify({
				group: 'foo',
				title: 'Response:'+error.status,
				text: error.data,
				type:'warn'
				}))
	  },

	  editConfirm(){
		let data={
			name:this.editFirstName + " " + this.editLastName,
			job:this.editJob
		}
		this.$client
		.put(`https://reqres.in/api/users/${this.editId}`,data=data)
		.then((response) => {
			let user = this.users.find(u => u.id==this.editId)
			user.first_name = this.editFirstName//edit local users table
			user.last_name = this.editLastName
			user.email = this.editEmail
			this.editModalOpen=false;
			this.$notify({
				group: 'foo',
				title: 'Success!',
				text: 'User is successfully edited!!',
				type:'success'
				});
			this.$notify({
				group: 'foo',
				title: 'Response:'+response.status,
				text: response.data
				});
		})
		.catch(error => 
			this.$notify({
				group: 'foo',
				title: 'Response:'+error.status,
				text: error.data,
				type:'warn'
				}))
	  },

	  editUser(id){
		  this.editModalOpen=true;
		  let user = this.users.find(u => u.id==id)
		  this.editEmail = user.email
		  this.editFirstName = user.first_name
		  this.editLastName = user.last_name
		  this.editId = user.id
	  },
	  searchTimer(){			
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
		this.timer = setTimeout(() => {
			this.search();
		}, 800);
	  },
	  async search(){
		let list = [];
		await this.getUsers().then((response) => {
		for (let i = 0; i < this.users.length; i++) {
		if(	this.users[i].first_name.indexOf(this.searchBar)!=-1 || 
			this.users[i].last_name.indexOf(this.searchBar)!=-1 ||
			this.users[i].email.indexOf(this.searchBar)!=-1 ){
				list.push(this.users[i])
			}
		}})
		this.users = list;
		  //this.users.map(u => {if(u.includes(this.searchBar)) list.push(u);} );
	  }
  },
  
  created(){
	  this.getUsers();
	//   this.$notify({
	// 	group: 'foo',
	// 	title: 'Important message',
	// 	text: 'Hello user! This is a notification!'
	// 	});
  }
}
</script>
<style lang="scss" scoped>
body {
	background: #e3e8ee;
	color: #3c4257;
	font-weight: 400;
	font-size: 14px;
}
strong, b {
	font-weight: 500;
}

@mixin actions {
  box-shadow: 
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
		rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
	
	&[disabled] {
		opacity: .5;
	}
	&:not([disabled]) {
		&:hover {
			color: rgb(26, 31, 54);
			box-shadow: 
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(0, 0, 0, .12) 0px 1px 1px 0px,
				rgba(60, 66, 87, .16) 0px 0px 0px 1px,
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(60, 66, 87, .08) 0px 3px 9px 0px,
				rgba(60, 66, 87, .08) 0px 2px 5px 0px;

			svg {
				fill: #2a2f45;
			}
		}
		&:focus {
			outline: none;
			box-shadow: 
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(58, 151, 212, .36) 0px 0px 0px 4px,
				rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
				rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
		}
	}
}

.Button {
	@include actions();
	outline: none !important;
	font-weight: 500;
	background-color: #fff;
	border: 0;
	height: 28px;
	display: flex;
	align-items: center;
	padding: 4px 8px;
	border-radius: 4px;
	transition:
		background-color .24s,
		box-shadow .24s,
		color .24s;
	color: #3c4257;
	margin-right: .5rem;
	span {
		line-height: 20px;
	}
	svg {
		margin-right: 8px;
		fill: #4f566b;
	}
}
.Card {
	border-radius: 4px;
	background: #fff;
	overflow: hidden;
	box-shadow:
		0 7px 14px 0 rgba(60, 66, 87, 0.08),
		0 3px 6px 0 rgba(0, 0, 0, 0.12);

	&__content {
		padding: 20px;
		display: flex;
		align-items: center;
		&-text{
      margin-right: 1rem;
    }
		&--border {
			box-shadow: inset 0 -1px #e3e8ee;
		}
	}
	
	a{
		text-decoration: none;
	}
}
.Table {
	width: 100%;
	
	tbody {
		td {
			font-size: 14px;
			color: #3c4257;
			font-weight: 400;
			line-height: 20px;
		}
	}
	thead {
		background-color: #f7fafc;
		
		td {
			text-transform: uppercase;
			font-size: 13px;
			color: #1a1f36;
			font-weight: 500;
			vertical-align: middle;
			line-height: 20px;
			user-select: none;
		}
	}
	tr {
		td {
			box-shadow: inset 0 -1px #e3e8ee;
			padding: 8px;
			
			&:first-child {
				padding-left: 20px;
			}
		}
	}
	
	&__header {
		&-item {
			align-items: center;
			svg {
				margin-left: 8px;
				fill: #8792a2;
			}
		}
	}
	&__checkbox {
		label {
			opacity: 0;
		}
	}
	
	tr:hover > &__checkbox {
		label {
			opacity: 1;
		}
	}
	
	.Actions{
		display: flex;
    	justify-content: center;
	}
}
.Footer{
	margin-left: auto;
	display: flex;
	align-items: center;
	.Pages{
		margin:0;
		margin-right: 0.5rem;
	}
}
.Input{
	.Button{
		float: right;
	}
	.Input-container{
		position:relative;
		margin-bottom:25px;
	}
	.Input-container label{
		position:absolute;
		top:0px;
		left:0px;
		font-size:16px;
		color:#424242;	
		transition: all 0.5s ease-in-out;
	}
	.Input-container input{ 
	border:0;
	border-bottom:1px solid #555;  
	background:transparent;
	width:100%;
	padding:8px 0 5px 0;
	font-size:16px;
	color:#424242;
	}
	.Input-container input:focus{ 
	border:none;	
	outline:none;
	border-bottom:1px solid #e74c3c;	
	}
	.Input-container input:focus ~ label,
	.Input-container input:valid ~ label{
		top:-12px;
		font-size:12px;
		
	}
}
.danger{
		background-color: rgb(189, 0, 0);
		color: #ffffff;
}
.Search{
	@include actions();
	outline: none !important;
	font-weight: 500;
	background-color: #fff;
	border: 0;
	height: 28px;
	display: flex;
	align-items: center;
	padding: 0px 16px;
	border-radius: 4px;
	transition:
		background-color .24s,
		box-shadow .24s,
		color .24s;
	color: #3c4257;
	margin-right: .5rem;
	span {
		line-height: 20px;
	}
	svg {
		margin-right: 8px;
		fill: #4f566b;
	}
}
</style>