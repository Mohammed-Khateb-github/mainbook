<template>
    <div class="container-fluid ">
        <h3 class="text-warning"> <span class="ti-panel"></span> Role Manger</h3>
        <div class="row mt-2">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="card p-3">
                    <h4> create role</h4>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12 mt-2">
                            <p>role name</p>
                            <input v-model="createRoleFildes.name" type="text" class="form-control" placeholder="role name">
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 mt-2">
                            <p>role description</p>
                            <input v-model="createRoleFildes.description" type="text" class="form-control" placeholder="role description">
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 mt-2">
                            <p>role permissions</p>
                            <input @keyup.enter="pushPermission" type="text" class="form-control" placeholder="role permissions">
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 mt-2">
                           <div class="row" id="permissions-container">
                               <div class="bd-example">
                               <span class="badge rounded-pill bg-warning text-dark p-2 m-1"    v-for="(item, index) in createRoleFildes.permissions " :key="item"  >{{item}} <span class="ti-close text-dark pointer" style="background-color: white;border-radius: 50%;padding: 5px" @click="removePermission(index)"> </span></span>
                               </div>
                           </div>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 mt-2 text-right">
                            <LoadingButton @click="createRole" name="create role" :loading="loading" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SpinnerComponent v-if="!load_roles_complete"/>

        <div class="row p-0 m-0 mt-3" v-if="load_roles_complete">
           <h3 class="text-warning p-0 mb-2">Current Roles</h3>
            <div class="row p-0 m-0">
                <div class="col-lg-6 col-md-6 col-sm-12 mt-2"  v-for="(role, index) in roles " :key="role">
                    <div class="card">
                        <div class="card-header bg-white text-primary font-weight-bold ">
                            {{role.name}}
                        </div>

                        <div class="card-body bp-5">
                            <p class=" mb-2"> {{role.description}}</p>
                            <div class="bd-example">
                                <span class="badge rounded-pill bg-primary text-white p-2 m-1"    v-for="(permission, pindex) in role.permissions " :key="permission"  >{{permission}} </span>
                            </div>
                            <div class="row d-flex text-right mt-3" dir="rtl">
                                <span class="btn text-btn-danger d-inline-block ml-10" @click="removeRole(role._id)">remove</span>
                                <span class="btn text-btn-warning d-inline-block" @click="editRole(role)">edit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        <div class="row p-0 m-0 mt-3" v-if="active_edit">
            <div class="card p-3">
                <h3 class="text-warning p-0 mb-2"> <span class="ti-pencil-alt"> </span> Edit Role</h3>
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 mt-2">
                        <p>role name</p>
                        <input v-model="role_to_edit.name" type="text" class="form-control" placeholder="role name">
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 mt-2">
                        <p>role description</p>
                        <input v-model="role_to_edit.description" type="text" class="form-control" placeholder="role description">
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 mt-2">
                        <p>role permissions</p>
                        <input @keyup.enter="pushPermissionToEdit" type="text" class="form-control" placeholder="role permissions">
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 mt-2">
                        <div class="row" >
                            <div class="bd-example">
                                <span class="badge rounded-pill bg-warning text-dark p-2 m-1"    v-for="(item, index) in role_to_edit.permissions " :key="item"  >{{item}} <span class="ti-close text-dark pointer" style="background-color: white;border-radius: 50%;padding: 5px" @click="removePermissionToEdit(index)"> </span></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 mt-2 text-right">
                        <Button type="button" class="btn btn-outline-success btn-sm " @click="updateRole"  >update</Button>
                        <Button type="button" class="btn btn-outline-dark btn-sm ml-10" @click="cancelEdit"  >cancel</Button>
                    </div>
                </div>
            </div>

        </div>



    </div>
</template>

<script>
    import LoadingButton from './widgets/LoadingButton.vue';
    import SpinnerComponent from "./widgets/SpinnerComponent.vue";
    export default {
        name: "RoleComponent",
        components:{SpinnerComponent, LoadingButton},
        data(){
            return{
                loading:false,
                load_roles_complete:false,
                remove_loading:false,
                update_loading:false,
                active_edit:false,
                createRoleFildes:{
                    permissions:["explore platform"],
                    name:"",
                    description:"",
                },
                roles:[],

                role_to_edit:{
                    _id:"",
                    permissions:[],
                    name:"",
                    description:"",
                }



            }
        },
        mounted() {
            this.getRoles();
        },
        methods:{
            pushPermission(e) {
                if (e.target.value.trim()==='')
                    return;
                this.createRoleFildes.permissions.push(e.target.value.trim());
                e.target.value = '';
            },
            removePermission(index){
                this.createRoleFildes.permissions.splice(index,1);
            },
            pushPermissionToEdit(e) {
                if (e.target.value.trim()==='')
                    return;
                this.role_to_edit.permissions.push(e.target.value.trim());
                e.target.value = '';
            },
            removePermissionToEdit(index){
                this.role_to_edit.permissions.splice(index,1);
            },
            async createRole(){

                if(this.loading) return ;
                this.loading=true;

                if (this.createRoleFildes.name.trim()==="" || this.createRoleFildes.description.trim()===""){
                    this.$toast.error(`fill all fieldes `);
                    setTimeout(()=>  this.loading=false ,3000);
                    return;
                }

                let token=await localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'JWT '+token,
                };
                let data=this.createRoleFildes;
                this.$axios.post(this.$base_url+'role/create', data,{headers:headers})
                    .then( async response =>  {
                        if(response.data.error === 'no'){
                            this.$toast.success(response.data.message);
                            this.roles.push(response.data.role);
                            this.createRoleFildes.name="";
                            this.createRoleFildes.description="";
                            this.createRoleFildes.permissions=[];


                        }else{
                            this.$toast.error(response.data.message);
                        }
                        this.loading=false;
                    })
                    .catch( async error   => {
                        this.$toast.error(error.message);
                        this.loading=false;
                    })
            },
            async getRoles(){

                this.load_roles_complete=false;

                let token=await localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'JWT '+token,
                };

                this.$axios.post(this.$base_url+'role/read',{}, {headers:headers})
                    .then( async response =>  {
                        if(response.data.error === 'no'){
                            this.roles=response.data.roles;
                        }else{
                            this.$toast.error(response.data.message);
                        }
                        this.load_roles_complete=true;
                    })
                    .catch( async error   => {
                        this.$toast.error(error.message);
                        this.load_roles_complete=false;
                    })
            },
            async removeRole(role_id){
                if(!confirm("do you want to delete this item")) return;
                if(this.remove_loading) return;
                this.remove_loading=true;


                let token=await localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'JWT '+token,
                };

                this.$axios.post(this.$base_url+'role/remove',{role_id:role_id}, {headers:headers})
                    .then( async response =>  {
                        if(response.data.error === 'no'){
                            this.$toast.success(response.data.message);
                            this.roles=response.data.roles;
                        }else{
                            this.$toast.error(response.data.message);
                        }
                        this.remove_loading=false;
                    })
                    .catch( async error   => {
                        this.$toast.error(error.message);
                        this.remove_loading=false;
                    })
            },
            editRole(role){
                this.role_to_edit._id=role._id;
                this.role_to_edit.name=role.name;
                this.role_to_edit.description=role.description;
                this.role_to_edit.permissions=role.permissions;
                this.active_edit=true;
                setTimeout(_=>window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight),200)

            },
            cancelEdit(){
                this.role_to_edit._id="";
                this.role_to_edit.name="";
                this.role_to_edit.description="";
                this.role_to_edit.permissions=[];
                this.active_edit=false;
            },
            async updateRole(){
                if (!confirm("do you want to update ?")) return;

                if(this.update_loading)return;
                this.update_loading=true;

                if (this.role_to_edit.name.trim()==="" || this.role_to_edit.description.trim()==="" || this.role_to_edit.permissions.length===0  || this.role_to_edit._id.trim()===""){
                    this.$toast.error(`fill all edited text box `);
                    setTimeout(()=>  this.update_loading=false ,3000)
                }
                let data=this.role_to_edit;

                let token=await localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'JWT '+token,
                };

                this.$axios.post(this.$base_url+'role/update',data, {headers:headers})
                    .then( async response =>  {
                        if(response.data.error === 'no'){
                            this.$toast.success(response.data.message);
                            this.cancelEdit();
                            this.roles=response.data.roles;
                        }else{
                            this.$toast.error(response.data.message);
                        }
                        this.update_loading=false;
                    })
                    .catch( async error   => {
                        this.$toast.error(error.message);
                        this.update_loading=false;
                    })

            }

        }
    }
</script>

<style scoped>

</style>