<template>
<div>
  <input type="checkbox"   id="sidebar-toggle">
  <div class="sidebar ltr">
    <div class="sidebar-header">
      <h3 class="brande" id="logo">
         Syria Book
      </h3>

    <lable for="sidebar-toggle" class="ti-menu-alt pointer" onclick="document.getElementById('sidebar-toggle').checked = !document.getElementById('sidebar-toggle').checked;if(document.getElementById('sidebar-toggle').checked) {document.getElementById('logo').style.cssText='display:none;';document.getElementById('nav-header').style.cssText='  width: calc(100% - 60px);'; }else {document.getElementById('logo').style.cssText='display:block;';document.getElementById('nav-header').style.cssText='  width: calc(100% - 240px);';}"></lable>
    </div>
    <div class="sidebar-menu">
      <ul>

        <li v-for="(item, index) in sideBarItems " :key="item" class="" @click="liClick(index)" >
          <a href="#">

            <span v-bind:class="sideBarItems[index].icon"> </span>
            <span>{{item.name}}</span>
          </a>
        </li>

      </ul>
    </div>
  </div>
  <div class="main-content">
    <cheader id="nav-header">
      <div class="search-wrapper">
        <span class="ti-search"></span>
        <input type="search" placeholder="Search">
      </div>
      <div class="social-icons">
        <span class="ti-bell"></span>
        <span class="ti-comment"></span>

        <span v-if="currentUser"> {{ currentUser.name}}</span>
        &nbsp;&nbsp;
        <button @click="logOut" class="btn btn-light btn-sm logout-btn"> Logout </button>


      </div>
    </cheader>

    <div class="container bg-material p-3 ltr">
      <Settings v-if="page==='settings'"/>
      <RoleComponent v-if="page==='role-management'"/>


    </div>

  </div>
</div>

</template>


<script >

  // defineProps({
  //   msg: String,
  //   name: String
  // });


  import Settings from "./Settings.vue";
  import RoleComponent from "./RoleComponent.vue";
  export default {
    name:"home",
    components: {RoleComponent, Settings},
    mounted() {
      this.onPage();
      this.checkLogin();
      this.setCurrentUser();

      },
    data(){
      return{
        selected_item: 0,
        currentUser: null,
        page:"role-management",
        sideBarItems:[
          {
            name:"Dashboard",
            icon:'ti-stats-up',
          },{
            name:"Manage Roles",
            icon:'ti-layers-alt',
          },{
            name:"Users",
            icon:'ti-user',
          },{
            name:"Home Screen",
            icon:'ti-home',
          },{
            name:"Categories",
            icon:'ti-align-left',
          },{
            name:"stores",
            icon:'ti-shopping-cart',
          },{
            name:"trending",
            icon:'ti-layers-alt',
          },{
            name:"towers",
            icon:'ti-time b',
          },{
            name:"Notification Center",
            icon:'ti-announcement ',
          },{
            name:"AD Center",
            icon:'ti-pie-chart',
          },{
            name:"Reports",
            icon:'ti-agenda',
          },{
            name:"Settings",
            icon:'ti-settings'
          }
        ]
      }
    },

    methods:{
      liClick(index){
        this.selected_item=index;
        const lis = document.querySelectorAll('.sidebar li');
        lis.forEach((item)=>{
          item.classList.remove('active-li');
          let first_child=item.firstChild;
          let children = Array.from(first_child.children);
          children.forEach(child=>child.classList.remove('text-white'));
        });
        // item.classList.remove('active-li');
        //this.classList.add('active-li');
        lis[index].classList.add('active-li');
        let first_child=lis[index].firstChild;
        let children = Array.from(first_child.children);
        children.forEach(child=>child.classList.add('text-white'));
      },
      onPage() {
        const lis = document.querySelectorAll('.sidebar-menu li');
        console.log(lis);
        lis[this.selected_item].classList.add('active-li');

        let first_child=lis[this.selected_item].firstChild;

        let children = Array.from(first_child.children);

        children.forEach(child=>child.classList.add('text-white'));
      },
      async logOut(){
              let token=await localStorage.getItem('token');
                const headers = {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': 'JWT '+token,
                };
                let data={
                  'exit':true
                };
                this.$axios.post(this.$base_url+'auth/Exit', data,{headers:headers})
                        .then( async response =>  {
                          if(response.data.error === 'no'){
                            this.$toast.success("Logout successfully");
                            await localStorage.setItem("is_login","false");
                            await localStorage.setItem("token","token not provided");
                            await localStorage.setItem("user","no authenticated user");
                            await this.$router.push('/login')
                          }else{
                            await localStorage.setItem("is_login","false");
                            await localStorage.setItem("token","token not provided");
                            await localStorage.setItem("user","no authenticated user");
                            await this.$router.push('/login')
                          }

                })
                .catch( async error   => {
                  await localStorage.setItem("is_login","false");
                  await localStorage.setItem("token","token not provided");
                  await localStorage.setItem("user","no authenticated user");
                  await this.$router.push('/login')
                })

      },
      async checkLogin(){
        let is_login=await localStorage.getItem("is_login")??"false";
        if(is_login==="false"){
          await this.$router.push('/login')
        }
      },
      async setCurrentUser(){
        let user=await localStorage.getItem('user')??null;
        this.currentUser=JSON.parse(user);
      }

    },

  }

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
