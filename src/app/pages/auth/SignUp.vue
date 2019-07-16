<template>
  <div>
    <form id="new_user_registration"
          v-if="!set_additional_info">
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
                name="emil"
                type="text"
                v-model.trim="user.email"
                v-on:keyup.enter="onedit"/>
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
                type="password"
                v-model="password"
                v-on:keyup.enter="onedit"/>
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
                type="password"
                v-model="repeat_password"
                v-on:keyup.enter="onedit"
              />
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <input :value="$t('next')" type="button"
                   v-on:click="onedit"/>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <router-link to="/">{{$t("back")}}</router-link>
          </td>
        </tr>
      </table>
    </form>


    <form id="additional_info"
          v-else>
      <table cellpadding="3">
        <tr>
          <th colspan="2">{{$t("signing_up")}}</th>
        </tr>
        <tr>
          <td>{{$t("first_name")}}:</td>
          <td>
            <label>
              <input
                :placeholder="$t('first_name')"
                name="first_name"
                type="text"
                v-model.trim="user.firstName"
                v-on:keyup.enter="onregister"/>
            </label>
          </td>
        </tr>
        <tr>
          <td>{{$t("last_name")}}:</td>
          <td>
            <label>
              <input
                :placeholder="$t('last_name')"
                name="last_name"
                type="text"
                v-model.trim="user.lastName"
                v-on:keyup.enter="onregister"/>
            </label>
          </td>
        </tr>
        <tr>
          <td>{{$t("birth_date")}}:</td>
          <td>
            <label>
              <input
                :placeholder="$t('birth_date')"
                name="birth_date"
                type="date"
                v-model="user.birthDate" v-on:keyup.enter="onregister"/>
            </label>
          </td>
        </tr>
        <tr>
          <td>{{$t("gender")}}:</td>
          <td>
            <label>
              <input
                :placeholder="$t('male')"
                name="male"
                type="radio"
                v-bind:value="gender.MALE" v-model="user.gender"/>
              <label>{{$t("male")}}</label>
            </label>
            <label>
              <input
                :placeholder="$t('female')"
                name="female"
                type="radio"
                v-bind:value="gender.FEMALE" v-model="user.gender"
              />
              <label>{{$t("female")}}</label>
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <input :value="$t('signing_up')" type="button"
                   v-on:click="onregister"/>
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
  import {User} from '../../core/model/user';
  import {Gender} from '../../core/model/gender';

  export default {
    name: 'SignUp',
    data() {
      return {
        set_additional_info: false,
        user: new User(),
        password: '',
        repeat_password: '',
        gender: Gender,
      };
    },
    methods: {
      onedit() {
        // todo: add field validation
        if (this.password === this.repeat_password) {
          HTTP.get('has_mail', {params: {email: this.user.email}})
            .then((response) => {
              if (response.status === 200) {
                this.$logger.log(response.data);
                this.set_additional_info = true;
                this.repeat_password = '';
              }
            });
        } else {
          alert('passwords are different');
        }
      },
      onregister() {
        // todo: add field validation
        HTTP.post('sign_up', JSON.parse(this.user))
          .then((response) => {
            if (response.status === 200) {
              this.$logger.log(response.data);
              this.$router.push({name: 'Profile', params: {nickname: response.data.nickname}});
            }
          });
      },
    },
  };
</script>

<style scoped>

</style>
