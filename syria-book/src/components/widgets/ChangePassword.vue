<template>
    <div class="container-fluid">

        <div class="row mt-3">
            <div class="card p-2 ">
                <h3 class="text-primary"><span class="ti-lock"></span> Change Password </h3>
                <div class="row mt-3">
                    <div class="col-lg-6 col-md-6 col-sm-12 mt-2">

                        <label>current password</label>
                        <input v-model="formFildes.current_password" type="text" class="form-control" placeholder="current password">

                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 mt-2">

                        <label>new password</label>
                        <input v-model="formFildes.new_password" type="text" class="form-control" placeholder="new password">

                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 mt-3 offset-lg-6 offset-md-6 text-right">
                        <LoadingButton @click="changePassord" name="change password" :loading="loading" />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import LoadingButton from './LoadingButton.vue';
    export default {
        name: "ChangePassword",
        components:{LoadingButton},
        data(){
            return{
                loading:false,
                formFildes:{
                    current_password:"",
                    new_password:""
                }
            }
        },
        methods:{
           async changePassord(){
               if(this.loading) return ;
               this.loading=true;
               let token=await localStorage.getItem('token');
               const headers = {
                   'Content-Type': 'application/json',
                   'Accept': 'application/json',
                   'Authorization': 'JWT '+token,
               };
               let data=this.formFildes;
               this.$axios.post(this.$base_url+'auth/ChangePassword', data,{headers:headers})
                   .then( async response =>  {
                       if(response.data.error === 'no'){
                           this.$toast.success(response.data.message);
                       }else{
                           this.$toast.error(response.data.message);
                       }
                       this.loading=false;
                    })
                   .catch( async error   => {
                       this.$toast.error(error.message);
                       this.loading=false;
                   })

            }
        }
    }
</script>

<style scoped>

</style>