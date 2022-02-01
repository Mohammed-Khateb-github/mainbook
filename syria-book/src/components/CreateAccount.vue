<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 mt-2 mb-2">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-md-8 col-sm-12">
                        <div class="card ltr">
                            <div class="card-body" >
                                <div class="row">
                                    <img src="../../public/images/site/smp.png">
                                </div>
                                <h3> Create New Account </h3>
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group mt-3">
                                            <label> Name </label>
                                            <input v-model="formFildes.name" placeholder="User Name" type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group mt-3">
                                            <label> Phone Number </label>
                                            <input v-model="formFildes.phone" placeholder="Phone Number" type="text" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group mt-3">
                                            <label> city </label>
                                            <input v-model="formFildes.city" placeholder="City" type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group mt-3">
                                            <label> region </label>
                                            <input v-model="formFildes.region" placeholder="Region" type="text" class="form-control">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group mt-3">
                                            <label> birthday </label>
                                            <input v-model="formFildes.birthday" placeholder="Region" type="date" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group mt-3">
                                            <label> password </label>
                                            <input v-model="formFildes.password" placeholder="password" type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group mt-3">
                                            <label> gender </label>
                                            <select v-model="formFildes.gender" class="form-select">
                                                <option value="male" selected>male</option>
                                                <option value="female">female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>



                                <div class="row">

                                    <div class="col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group mt-3">
                                            <LoadingButton @click="CreateAccount" name="Create Account"  :loading="loading"/>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 text-right">
                                        <div class="form-group mt-3">
                                            <router-link   to="/login" class="btn info btn-sm"> Do you have an Account - login ? </router-link>
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

<script >

    import LoadingButton from "./widgets/LoadingButton.vue";
    export default {
        name: "CreateAccount",
        components: {LoadingButton},
        data(){
            return{
                loading:false,
                formFildes:{
                    name:"",
                    phone:"",
                    password:"",
                    birthday:"",
                    gender:"male",
                    region:"",
                    city:"",
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
            CreateAccount(e){

                if(this.loading)return;
                this.loading=true;
                if(this.formFildes.city.trim()==="" ||this.formFildes.region.trim()==="" ||this.formFildes.gender.trim()==="" ||this.formFildes.phone.trim()==="" ||this.formFildes.name.trim()==="" ||this.formFildes.password.trim()==="" ||this.formFildes.birthday.trim()==="" ){
                    this.$toast.error(`fill all fildes `);
                    setTimeout(()=>  this.loading=false ,3000)
                    return;
                }

                        //'Authorization': 'JWT fefege...'
                    let data=this.formFildes;
                    const headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    };
                    this.$axios.post(this.$base_url+'auth/register', data,{headers:headers})
                        .then( async response => {
                            if(response.data.error === 'no'){
                                this.$toast.success("Your Account created successfully");
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