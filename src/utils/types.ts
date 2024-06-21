export interface ResponsedData {
  id: string;
  data: SupplyData;
}

export interface SupplyData {
  number: number;
  date: string;
  city: Cities;
  quantity: string;
  deliveryType: DeliveryType;
  stock: Stocks;
  status: Status;
}

export enum Cities {
  Moscow = "Москва",
  Pskov = "Псков",
  Tver = "Тверь",
  Abakan = "Абакан",
  NizhniiNovgorod = "Нижний Новгород",
  Kostroma = "Кострома",
  Yaroslavl = "Ярославль",
}

export enum DeliveryType {
  box = "Короб",
  pallet = "Монопаллета",
}

export enum Stocks {
  stock = "Cклад",
  Abakan = "СЦ Абакан",
  ChernayaGryaz = "Черная Грязь",
  Vnukovo = "Внуково",
  BelayaDacha = "Белая дача",
  Electrostal = "Электросталь",
  Вёшки = "Вёшки",
}

export enum Addresses {
  "Cклад" = "ул. Индустриальная, д. 9/1",
  "СЦ Абакан" = "ул. Игарская, д. 21г",
  "Черная Грязь" = "д. Черная Грязь, ул. Промышленная, с.2",
  "Внуково" = "С19М, Новомосковский административный округ, г.Москва",
  "Белая дача" = "Яничкин проезд, 3",
  "Электросталь" = "Ногинский р-н, Московская обл., г. Электросталь",
  "Вёшки" = "Липкинское шоссе, 2-й километр, вл1с1, посёлок Вёшки, городской округ Мытищи, Московская область",
}

export enum Status {
  transit = "В пути",
  delayed = "Задерживается",
}

export enum SortOptions {
  number = "По номеру",
  city = "По городу",
  deliveryType = "По типу поставки",
  status = "По статусу",
}
