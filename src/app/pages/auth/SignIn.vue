<template>
  <div>
    <form id="user_login">
      <table cellpadding="3">
        <tr>
          <th colspan="2">{{$t("login")}}</th>
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
                v-on:keyup.enter="onlogin"/>
            </label>
            <div class="error" v-if="validation_errors.has('emailError')">
              {{$t(validation_errors.get('emailError'))}}
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
                v-model="user_password"
                v-on:keyup.enter="onlogin"/>
            </label>
            <div class="error" v-if="validation_errors.has('passwordError')">
              {{$t(validation_errors.get('passwordError'))}}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <input :value="$t('login')" type="button"
                   v-on:click="onlogin"/>
          </td>
        </tr>
        <tr>
          <td colspan="2">{{$t("not_registered")}}?
            <router-link to="/signup">{{$t("sign_up")}}</router-link>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
  import {HTTP} from '../../core/constants/api.service';

  export default {
    name: 'SignIn',
    data() {
      return {
        user_email: null,
        user_password: null,
        validation_errors: new Map(),
      }
    },
    props: {},
    methods: {
      onlogin() {
        if (this.user_email === '') {
          this.user_email = null;
        }
        if (this.user_password === '') {
          this.user_password = null;
        }
        HTTP.post('auth/sign_in', {email: this.user_email, password: this.user_password})
          .then((response) => {
            if (response.status === 200) {
              this.$logger.log(response.data);
              this.$router.push({name: 'Profile', params: {id: response.data.nickname}});
            }
          })
          .catch((error) => {
            if (error.response.status === 409) {
              this.validation_errors = new Map();
              const keys = Object.keys(error.response.data);
              for (const key of keys) {
                this.validation_errors.set(key, error.response.data[key]);
              }
            }
          });
      },
    },
  };
</script>

<style scoped>
  @import "../../../styles/common.less";
</style>
