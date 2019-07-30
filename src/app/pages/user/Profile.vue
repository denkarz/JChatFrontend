<template>
  <div>
    <table cellpadding="3" v-if="!show_edit">
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
      <tr>
        <th colspan="2">{{$t("profile")}} <a
          @click="show_edit=!show_edit" href="#">{{$t("edit")}}</a></th>
      </tr>
      <tr>
        <td>{{$t("first_name")}}:</td>
        <td>{{user.firstName}}</td>
      </tr>
      <tr>
        <td>{{$t("last_name")}}:</td>
        <td>{{user.lastName}}</td>
      <tr>
      <tr>
        <td>{{$t("is_active")}}:</td>
        <td v-if="user.active">{{$t("online")}}</td>
        <td v-else>{{$t("offline")}}</td>
      <tr>
      <tr>
        <td>{{$t("age")}}:</td>
        <td>{{user.age}}</td>
      <tr>
      <tr>
        <td>{{$t("birth_date")}}:</td>
        <td>{{user.birthDate}}</td>
      </tr>
      <tr>
        <td>{{$t("gender")}}:</td>
        <td>{{$t(user.gender.toString().toLowerCase())}}</td>
      </tr>
      <tr>
        <th colspan="2">User's dialogs <a href="#">create</a></th>
      </tr>
      <tr>
        <td colspan="2">
          <a href="#">hardcode dialog title #1</a><br>
          <a href="#">hardcode dialog title #2</a><br>
          <a href="#">hardcode dialog title #3</a><br>
        </td>
      </tr>
    </table>

    <table v-else>
      <tr>
        <th colspan="2">{{$t("editing")}}</th>
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
              v-on:keyup.enter="onedit"/>
          </label>
        </td>
      </tr>
      <tr>
        <td>{{$t("nick_name")}}:</td>
        <td>
          <label>
            <input
              :placeholder="$t('nick_name')"
              name="last_name"
              type="text"
              v-model.trim="user.nickname"
              v-on:keyup.enter="onedit"/>
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
              v-model="user.birthDate" v-on:keyup.enter="onedit"/>
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
          <input :value="$t('edit')" type="button"
                 v-on:click="onedit"/>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <a @click="onback" href="#">{{$t('back')}}</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {HTTP} from '../../core/constants/api.service';
  import {User} from '../../core/model/user';
  import {plainToClass} from 'class-transformer';
  import {Gender} from '../../core/model/gender';

  export default {
    name: 'Profile',
    data() {
      return {
        user: new User(),
        show_edit: false,
        password: '',
        repeat_password: '',
        gender: Gender,
      };
    },
    beforeMount() {
      this.$logger.setPrefix('Profile');
      const id = this.$route.params.id;
      // todo: add field validation
      HTTP.get('user/profile', {params: {id}})
        .then((response) => {
          this.user = plainToClass(User, response.data);
          this.$logger.log(this.user);
          this.$logger.log(response);
        });
    },
    methods: {
      onedit() {
        alert('not supported yet');
        this.show_edit = !this.show_edit;
        this.$router.go(-1);
      },
      onback() {
        this.show_edit = !this.show_edit;
        this.$router.go(-1);
      },
    },
  };
</script>

<style scoped>

</style>
