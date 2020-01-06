/* eslint-disable simple-import-sort/sort */

import { RequestType } from '../store/types'

import img_type_food from './type_food.svg'
import img_type_invite from './type_invite.svg'
import img_type_money from './type_money.svg'
import img_type_physical from './type_physical.svg'

export { default as img_menu_close } from './menu_close.svg'
export { default as img_menu_open } from './menu_open.svg'

export { default as img_helpling } from './helpling.svg'

export const img_request_types: Record<RequestType, string> = {
  food: img_type_food,
  invite: img_type_invite,
  money: img_type_money,
  physical: img_type_physical
}
