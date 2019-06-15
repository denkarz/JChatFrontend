<template>
  <div>
    <form action="/jchat/reg" method="post" name="loginForm">
      <table cellpadding="3">
        <tr>
          <th colspan="2">{{$t("signing_up")}}</th>
        </tr>
        <tr>
          <td>{{$t("email")}}:</td>
          <td>
            <input :placeholder="$t('email')" name="nickname" type="text" value=""/>
          </td>
        </tr>
        <tr>
          <td>{{$t("password")}}:</td>
          <td>
            <input :placeholder="$t('password')" name="password" type="password" value=""/>
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
  import {User} from '../../core/model/user';
  import {HTTP} from '../../core/constants/api.service';

  export default {
    name: 'SignUp',
    props: {},
    methods: {
      onregister: () => {
        const usr = new User();
        usr.firstName = 'denis';
        usr.lastName = 'karzykin';
        usr.email = 'd.karzykin@oblakogroup.ru';

        HTTP.post('sign_up', {crossDomain: true}, {
          body: {
            firstName: usr.firstName,
            lastName: usr.lastName,
            email: usr.email,
          },
        })
          .then((response) => {
            console.log(response);
          });
      },
      get: () => {
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
