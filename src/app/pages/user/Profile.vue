<template>
  <div v-if="user">
    <table cellpadding="3" v-if="!show_edit">
      <tr>
        <th colspan="2">{{$t("profile")}}
          <a v-if="editable" @click="show_edit=!show_edit" href="#">{{$t("edit")}}</a>
        </th>
      </tr>
      <tr v-if="is_activated">
        <th colspan="2">{{$t("profile")}}
          <a @click="updateActivation" href="#">{{$t("activate")}}</a>
        </th>
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
        <td>{{user.formatted_birth_date()}}</td>
      </tr>
      <tr>
        <td>{{$t("gender")}}:</td>
        <td>{{$t(user.gender.toString().toLowerCase())}}</td>
      </tr>
      <!--<tr>
        <th colspan="2">User's dialogs <a href="#">create</a></th>
      </tr>
      <tr>
        <td colspan="2">
          <a href="#">hardcode dialog title #1</a><br>
          <a href="#">hardcode dialog title #2</a><br>
          <a href="#">hardcode dialog title #3</a><br>
        </td>
      </tr>-->
    </table>

    <!-- edit user-->
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
              v-model="user.password"
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
              :value="user.birthDate.split('T')[0]"
              @input="user.update_bd($event.target.value)"
              v-on:keyup.enter="onedit"/>
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
              v-bind:value="gender[gender.MALE]" v-model="user.gender"/>
            <label>{{$t("male")}}</label>
          </label>
          <label>
            <input
              :placeholder="$t('female')"
              name="female"
              type="radio"
              v-bind:value="gender[gender.FEMALE]" v-model="user.gender"
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

    <!--      admin section-->
    <table v-if="is_admin">
      <tr>
        <th colspan="2">admin section</th>
      </tr>
      <tr>
        <td colspan="2">
          <div :key="usr.id" v-for="usr in all_users">
            <li>{{`${usr.firstName} ${usr.lastName} [${usr.roles},]`}}<a
              @click="edit_roles=!edit_roles; selected_user=usr "
              href="#">
              {{$t("edit")}}</a></li>
            <table v-if="edit_roles&& selected_user.id === usr.id">
              <tr>
                <td>{{$t("nick_name")}}:</td>
                <td>{{usr.nickname}}</td>
              </tr>
              <tr>
                <td>roles:</td>
                <td>
                  <div :key="index" v-for="(role, index) of roles">
                    <label> {{role}}
                      <input
                        @change="changeRoles(usr)"
                        name="role"
                        type="checkbox"
                        v-bind:value="role" v-model="usr.roles">
                    </label>
                  </div>
                </td>
              </tr>
            </table>
          </div>
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
  import {Role} from '../../core/model/role';

  export default {
    name: 'Profile',
    data() {
      return {
        route_id: '',
        user: null,
        show_edit: false,
        repeat_password: '',
        gender: Gender,
        //////
        ///
        //
        all_users: [],
        selected_user: User,
        roles: Object.keys(Role).filter(key => !isNaN(Number(Role[key]))),
        edit_roles: false
      };
    },
    computed: {
      editable: function () {
        return this.route_id === this.$store.getters.current_user.nickname;
      },
      is_activated: function () {
        return this.$store.getters.current_user.activationCode;
      },
      is_admin: function () {
        this.$logger.log(this.roles);
        return this.user.roles.includes("ADMIN");
      }
    },
    mounted() {
      this.$logger.setPrefix('Profile');

      this.route_id = this.$route.params.id;
      // todo: add field validation
      if (this.route_id === this.$store.getters.current_user.nickname ||
        this.route_id === this.$store.getters.current_user.id) {
        this.user = this.$store.getters.current_user
      } else {
        console.log('else works');
        HTTP.api.get('user/get', {params: {id: this.route_id, nickname: this.route_id}})
          .then((response) => {
            this.user = plainToClass(User, response.data);
            this.$logger.log(this.user);
          });
      }
      /// admin section
      // console.log(this.user.roles[this.roles.ADMIN])
      if (this.user.roles[this.roles.ADMIN]!== undefined) {
      HTTP.api.get('admin/get_all_users')
        .then((response) => {
          this.all_users = plainToClass(User, response.data);
        });
      }
    },
    methods: {
      updateActivation() {
        HTTP.api.post('/user/update_activation_code',  {id: this.$store.getters._jwt.user_id})
          .catch((error) => {
            if (error.response.status === 409) {
              const keys = Object.keys(error.response.data);
              for (const key of keys) {
                this.validation_errors.set(key, error.response.data[key]);
              }
            }
          });
      },
      onedit() {
        this.validation_errors = new Map();
        this.$logger.log(this.user, 'log', 'user');
        if (this.user.password === this.repeat_password) {
          HTTP.api.post('/user/update', this.user)
            .then((response) => {
              if (response.status === 200) {
                this.$store.dispatch('set_jwt', response.headers.authorisation).then(() => {
                  this.$store.dispatch('set_user', this.$store.getters._jwt.user_id).then(() => {
                    this.repeat_password = '';
                    this.show_edit = false;
                    this.$router.push({name: 'Profile', params: {id: this.$store.getters.current_user.nickname}});
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
        }
        // this.show_edit = !this.show_edit;
        // this.$router.go(-1);
      },
      onback() {
        this.show_edit = !this.show_edit;
        this.$router.go(-1);
      },
      changeRoles(user) {
        console.log(this.roles);
        HTTP.api.post('/admin/update_roles', {id: user.id, roles: user.roles})
          .then((response) => {
            if (response.status === 200) {
              HTTP.api.get('user/get', {params: {id: this.route_id, nickname: this.route_id}})
                .then((response) => {
                  this.user = plainToClass(User, response.data);
                  this.$logger.log(this.user);
                });
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
        console.log(user.roles)
      }
    },
  };
</script>

<style scoped>

</style>
