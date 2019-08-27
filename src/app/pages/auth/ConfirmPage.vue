<template>
  
</template>

<script>
  import {HTTP} from '../../core/constants/api.service';
  export default {
    name: "ConfirmPage",
    data(){
      return{
        code: '',
      }
    },
    mounted() {
      this.$logger.setPrefix('ConfirmPage');

      this.code = this.$route.params.code;
        HTTP.auth_api.get(`activate/${this.code}`)
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch('set_jwt', response.headers.authorisation).then(() => {
                this.$store.dispatch('set_user', this.$store.getters._jwt.user_id).then(() => {
                  this.$router.push({name: 'Profile', params: {id: this.$store.getters._jwt.user_nick}});
                })
              })
            }
          });
    },
  }
</script>

<style scoped>

</style>
