export enum Gender {
  male = 1, // 男
  female = 2, // 女
}

export class UserInfo {
  name: string = ''
  nickName: string = ''
  intro: string = ''
  gender: Gender = Gender.male
  tags: string = ''
}
