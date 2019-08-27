<template>
  <div>
    <form id="user_login">
      <table cellpadding="3">
        <tr>
          <th colspan="2">{{$t("reset_password")}}</th>
        </tr>
        <tr>
          <td>{{$t("email")}}:</td>
          <td>
            <label>
              <input
                :placeholder="$t('email')"
                name="emil"
                type="text"
                v-model.trim="user_email"
                v-on:keyup.enter="onSendResetRequest"/>
            </label>
            <div class="error" v-if="validation_errors.has('emailError')">
              {{$t(validation_errors.get('emailError'))}}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <input :value="$t('reset')" type="button"
                   v-on:click="onSendResetRequest"/>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <router-link to="/">{{$t("back")}}</router-link>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
  import {HTTP} from '../../core/constants/api.service';
  export default {
    name: "ForgotPassword",
    data() {
      return {
        user_email: null,
        validation_errors: new Map(),
      };
    },
    methods: {
      onSendResetRequest() {
        if (this.user_email === '') {
          this.user_email = null;
        }
        this.validation_errors = new Map();
        HTTP.auth_api.post('forgot_password', {email: this.user_email})
          .then((response) => {
            if (response.status === 200) {
              // this.$store.dispatch('set_jwt', response.headers.authorisation).then(() => {
              //   this.$store.dispatch('set_user', this.$store.getters._jwt.user_id).then(() => {
              //     this.$router.push({name: 'Profile', params: {id: this.$store.getters._jwt.user_nick}});
              //   })
              // })
            }
          })
          .catch((error) => {
            if (error.response.status === 409) {
              const keys = Object.keys(error.response.data);
              for (const key of keys) {
                this.validation_errors.set(key, error.response.data[key]);
              }
            }
          });
      },
    },
  }
</script>

<style scoped>

</style>
