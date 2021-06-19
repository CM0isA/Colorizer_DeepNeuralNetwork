export interface User {
  id?: string,
  email: string;
  role: string;
  firstName: string;
  hashedPassword: string;
  accountStatus: string;
  lastName: string;
  accountCode: string;
}
