<template>
  <div>
    <form action="/jchat/profile" method="post" name="loginForm">
      <table cellpadding="3">
        <tr>
          <th colspan="2">{{$t("login")}}</th>
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
  export default {
    name: 'SignIn',
    props: {},
    methods: {
      onlogin: () => {
        alert('Not supported yet');
      },
    },
  };
</script>

<style scoped></style>
