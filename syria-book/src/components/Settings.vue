<template>
    <div class="container-fluid ltr">
        <h2> <span class="ti-settings"></span> Settings </h2>
        <ChangePassword/>
    </div>
</template>

<script>
    import LoadingButton from './widgets/LoadingButton.vue';
    import ChangePassword from './widgets/ChangePassword.vue';
    export default {
        name: "Settings",
        components:{LoadingButton,ChangePassword},
        data(){
            return{
                loading:false
            }
        }
    }
</script>

<style scoped>

</style>