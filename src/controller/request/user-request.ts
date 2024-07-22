export interface Address {
  street: string
  city: string
  state: string
  zip: string
}

export interface User {
  username: string
  email: string
  password: string
  phone: string
  address: Address
}