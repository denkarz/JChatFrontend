<template>
  <div>
    <form id="new_user_registration">
      <table cellpadding="3">
        <tr>
          <th colspan="2">{{$t("reset_password")}}</th>
        </tr>
        <tr>
          <td>{{$t("password")}}:</td>
          <td>
            <label>
              <input
                :placeholder="$t('password')"
                name="password"
                type="password"
                v-model="user_password"
                v-on:keyup.enter="onPasswordReset"/>
            </label>
            <div class="error" v-if="validation_errors.has('passwordError')">
              {{$t(validation_errors.get('passwordError'))}}
            </div>
          </td>
        </tr>
        <tr>
          <td>{{$t("password")}}:</td>
          <td>
            <label>
              <input
                :placeholder="$t('password')"
                name="password"
                type="password"
                v-model="repeat_password"
                v-on:keyup.enter="onPasswordReset"
              />
            </label>
            <div class="error" v-if="validation_errors.has('passwordError')">
              {{$t(validation_errors.get('passwordError'))}}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <input :value="$t('reset')" type="button"
                   v-on:click="onPasswordReset"/>
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
    name: "ResetPassword",
    data() {
      return {
        code: '',
        user_password: null,
        repeat_password: null,
        validation_errors: new Map(),
      }
    },    methods: {
      onPasswordReset() {
        this.$logger.setPrefix('ResetPassword');
        this.code = this.$route.params.code;
        this.validation_errors = new Map();
        if (this.repeat_password === '') {
          this.repeat_password = null;
        }
        if (this.user_password === '') {
          this.user_password = null;
        }
        if (this.user_password === this.repeat_password) {
          HTTP.auth_api.post(`reset/${this.code}`, {password: this.user_password})
            .then((response) => {
              if (response.status === 200) {
                this.$store.dispatch('set_jwt', response.headers.authorisation).then(() => {
                  this.$store.dispatch('set_user', this.$store.getters._jwt.user_id).then(() => {
                    this.$router.push({name: 'Profile', params: {id: this.$store.getters._jwt.user_nick}});
                  })
                })
              }
            });
        } else {
          alert('passwords are different');
        }
      }
    }
  }
</script>

<style scoped>

</style>
