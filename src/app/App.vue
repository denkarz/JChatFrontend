<template>
  <!--  Todo: change locale button design-->
  <div id="app">
    <div>
      <a @click="logout()" href="#" v-if="$store.getters._jwt.user_id">{{$t("logout")}}</a>
      <select v-model="$i18n.locale">
        <option :key="`Lang${i}`" :value="lang" v-for="(lang, i) in langs">{{ lang }}</option>
      </select>
      <form name="findForm">
        <tr>
          <td>
            <input class="edit-field" id="nickname-id" name="nickname" placeholder="User Name" type="text" value=""/>
          </td>
          <td>
            <input id="button-id" type="button" value="Find">
          </td>
        </tr>
      </form>
    </div>
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {langs: ['ru', 'en']};
    },
    components: {},
    methods: {
      logout() {
        this.$store.dispatch('logout', this.$store.getters._jwt.user_id).then(() => {
          this.$router.push({name: 'SignIn'});
        })
      }
    }
  };
</script>

<style>
  #app {
  }
</style>
