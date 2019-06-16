<template>
  <div>
    <form id="app">
      <table cellpadding="3">
        <tr>
          <th colspan="2">{{$t("signing_up")}}</th>
        </tr>
        <tr>
          <td>{{$t("email")}}:</td>
          <td>
            <label>
              <input
                :placeholder="$t('email')"
                name="nickname"
                type="text"
                v-model.trim="usr_email"/>
            </label>
          </td>
        </tr>
        <tr>
          <td>{{$t("password")}}:</td>
          <td>
            <label>
              <input
                :placeholder="$t('password')"
                name="password"
                type="text"
                v-model="usr_pass"/>
            </label>
          </td>
        </tr>
        <tr>
          <td>{{$t("password")}}:</td>
          <td>
            <label>
              <input
                :placeholder="$t('password')"
                name="password"
                type="text" v-model="rep_pass"/>
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <input :value="$t('signing_up')" type="button"
                   v-on:click="onregister"/>
            <input :value="$t('signing_up3')" type="button"
                   v-on:click="get"/>
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
    name: 'SignUp',
    data() {
      return {
        usr_email: '',
        usr_pass: '',
        rep_pass: ''
      }
    },
    methods: {
      onregister: function () {
        //todo: add field validation
        if (this.usr_pass === this.rep_pass) {
          // usr.firstName = 'denis';
          // usr.lastName = 'Denis1996';
          // usr.email = 'd.karzykin@oblakogroup.ru';
          HTTP.post('sign_up', {email: this.usr_email, firstPassword: this.usr_pass})
            .then((response) => {
              console.log(response);
            });
        } else {
          alert("passwords are different")
        }
      },
      get: function () {
        HTTP.get('get')
          .then((response) => {
            console.log(response);
          });
      },
    },
  };
</script>

<style scoped>

</style>
