import {Gender} from '@/app/core/model/gender';

export class User {
  public id: string = '';
  public firstName: string | null = '';
  public lastName: string | null = '';
  public email: string | null = null;
  public nickname: string = '';
  public birthDate: Date | null = null;
  public gender: Gender = Gender.MALE;
  public age: number | null = null;
  public active: boolean = false;
  public roles: string[] = [];
  public password: string | null = null;


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
