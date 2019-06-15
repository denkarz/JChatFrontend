<template>
  <!--  Todo: change locale button design-->
  <div id="app">
    <div>
      <select v-model="$i18n.locale">
        <option :key="`Lang${i}`" :value="lang" v-for="(lang, i) in langs">{{ lang }}</option>
      </select>
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
  };
</script>

<style>
  #app {
  }
</style>
