import {Gender} from '@/app/core/model/gender';
import {pretty_short_date} from '@/app/core/service/date-time';
import {Role} from '@/app/core/model/role';

export class User {
  public id: string = '';
  public firstName: string | null = '';
  public lastName: string | null = '';
  public email: string | null = null;
  public nickname: string = '';
  public birthDate: string = '';
  public gender: Gender = Gender.MALE;
  public age: number | null = null;
  public active: boolean = false;
  public roles: Role[] = [];
  public password: string | null = null;

  public formatted_birth_date() {
    return pretty_short_date(this.birthDate);
  }

  private update_bd(value: string | Date) {
    this.birthDate = new Date(value).toISOString();
  }


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
