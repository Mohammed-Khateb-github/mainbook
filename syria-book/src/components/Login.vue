<template>
    <div class="container-fluid">
        <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 mt-5 mb-2">
                   <div class="row justify-content-center">
                       <div class="col-lg-6 col-md-8 col-sm-12">
                           <div class="card ltr">
                               <div class="card-body" >
                                    <div class="row">
                                        <img src="../../public/images/site/smp.png">
                                    </div>
                                   <h3> Login </h3>
                                   <div class="form-group mt-3">
                                       <label> Phone Number </label>
                                       <input v-model="formFildes.phone" placeholder="Phone Number" type="text" class="form-control">
                                   </div>
                                   <div class="form-group mt-3">
                                       <label> Password </label>
                                       <input v-model="formFildes.password" placeholder="Password" type="text" class="form-control">
                                   </div>
                                   <div class="row">
                                       <div class="col-lg-6 col-md-6 col-sm-12 ">
                                           <div class="form-group mt-3">

                                               <LoadingButton @click="login" name="Login"  :loading="loading"/>

                                           </div>

                                       </div>
                                       <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                                           <div class="form-group mt-3">
                                               <router-link   to="/createAccount" class="btn info btn-sm"> Don't have an Account - Create new Account ? </router-link>
                                           </div>
                                       </div>

                                   </div>

                               </div>
                           </div>
                       </div>
                   </div>
                </div>
        </div>
    </div>
</template>

<script>
    import LoadingButton from "./widgets/LoadingButton.vue";
    export default {
        name: "Login",
        components: {LoadingButton},
        data(){
            return{
                loading:false,
                formFildes:{
                    phone:"",
                    password:""
                }
            }
        },
        mounted() {
            this.checkLogin();
        },
        methods:{
            async checkLogin(){
                let is_login=await localStorage.getItem("is_login")??"false";
                if(is_login==="true"){
                    await this.$router.push('/dashboard')
                }
            },
            async login(){
                if(this.loading)return;
                this.loading=true;
                if (this.formFildes.password.trim()==="" || this.formFildes.phone.trim()===""){
                    this.$toast.error(`fill all fieldes `);
                    setTimeout(()=>  this.loading=false ,3000)
                }
                let data=this.formFildes;
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                };
                this.$axios.post(this.$base_url+'auth/sign_in', data,{headers:headers})
                    .then( async response =>  {
                        if(response.data.error === 'no'){
                            this.$toast.success("login successfully");
                            await localStorage.setItem("is_login","true");
                            await localStorage.setItem("token",response.data.token);
                            await localStorage.setItem("user",JSON.stringify(response.data.user));
                            await this.$router.push('/dashboard')
                        }else{
                            this.$toast.error(response.data.message)
                        }
                        this.loading=false;
                    })
                    .catch(error   => { this.$toast.error(error.message);this.loading=false;})
                    this.loading=false;


            }
        }
    }
</script>

<style scoped>

</style>

