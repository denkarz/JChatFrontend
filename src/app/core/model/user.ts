import {Gender} from '@/app/core/model/gender';

export class User {
  public id: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public nickname: string = '';
  public birthDate: Date = new Date();
  public gender: Gender = Gender.MALE;
  public age: number = -1;
  public active: boolean = false;
  public roles: string[] = [];


  // public toJSON() {
  //   return {
  //     id: this.id,
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     email: this.email,
  //     nickname: this.nickname,
  //     birthDate: this.birthDate,
  //     gender: this.gender,
  //   };
  // }
  //
  // public toJSON_with_password(password: string) {
  //   return {
  //     id: this.id,
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     email: this.email,
  //     nickname: this.nickname,
  //     birthDate: this.birthDate,
  //     gender: this.gender,
  //     password,
  //   };
  // }
}
