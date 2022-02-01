<script setup>
    defineProps({
        loading: Boolean,
        name: String
        });

</script>
<template>
    <button class="btn btn-primary btn-sm" >
           <div v-if="loading" class="spinner-border text-light spinner-border-sm"></div>

        {{name}}

    </button>
</template>




<style scoped>

</style>