export class User {
  public id: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';

  public toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  }
}
