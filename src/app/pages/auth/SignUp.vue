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
                v-model="user.password"
                v-on:keyup.enter="onedit"/>
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
                v-on:keyup.enter="onedit"
              />
            </label>
            <div class="error" v-if="validation_errors.has('passwordError')">
              {{$t(validation_errors.get('passwordError'))}}
            </div>
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
            <div class="error" v-if="validation_errors.has('firstNameError')">
              {{$t(validation_errors.get('firstNameError'))}}
            </div>
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
            <div class="error" v-if="validation_errors.has('lastNameError')">
              {{$t(validation_errors.get('lastNameError'))}}
            </div>
            <label>
              <input
                hidden
                name="nickname"
                type="text"
                v-model.trim="user.nickname"/>
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
            <div class="error" v-if="validation_errors.has('birthDateError')">
              {{$t(validation_errors.get('birthDateError'))}}
            </div>
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
        validation_errors: new Map(),
        repeat_password: null,
        gender: Gender,
      };
    },
    methods: {
      onedit() {
        this.validation_errors = new Map();
        if (this.user.password === this.repeat_password) {
          HTTP.auth_api.post('/registration_setup', {email: this.user.email, password: this.user.password})
            .then((response) => {
              if (response.status === 200) {
                this.$logger.log(response.data);
                this.set_additional_info = true;
                this.repeat_password = '';
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
        } else {
          alert('passwords are different');
        }
      },
      onregister() {
        this.user.nickname = Math.floor(Math.random() * 999) + 1000;
        this.validation_errors = new Map();
        this.$logger.log(this.user, 'log', 'user');
        HTTP.auth_api.post('/sign_up', this.user)
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch('set_jwt', response.headers.authorisation).then(() => {
                this.$store.dispatch('set_user', this.$store.getters._jwt.user_id).then(() => {
                  this.$router.push({name: 'Profile', params: {id: this.$store.getters.current_user.id}});
                })
              })
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
  };
</script>

<style scoped>
  @import "../../../styles/common.less";
</style>
