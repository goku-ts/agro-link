
export type UserRegisterTypes = {

  name: string,
  phone_number: number
  password: string,
  type: string,
  image: string,
  region: string,
  farm_size: {
    length: number,
    width: number
  },
  crops_cultivated: string[],
  farm_location: string,
  document_type: {
    type: string,
    ref_url: string
  }

}

export type UserLoginTypes = {

  phone_number: string
  password: string,

}

export type ProduceTypes = {

  name: string
  description: string,
  image: string
  variety: string,
  origin: string,
  harvest_date: String,
  unit_price: string,
  quantity: number,
  type: string,
  isAvailable: boolean
  seller: any
}

export type ServiceTypes = {

  name: string
  type: string,
  description: string,
  image: string
  working_hours: string,
  rate: number,
  isAvailable: boolean,
  seller: any
}