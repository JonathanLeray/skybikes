export class User {
  id: string;
  photo: string;
  constructor(public email: string,
              public firstname: string,
              public lastname: string,
              public emergencyPhoneNumber: string,
              public profile: string) {
    this.id =  Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  }
}
