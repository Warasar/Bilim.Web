export interface ContainerButton {
  code: string;
  icon: string;
  link: string;
  name: string;
  text: string;
  [key: string]: any; // для дополнительных полей
}

export interface ButtonTitle {
  title: string;
  subtitle: string;
  [key: string]: any;
}

export interface GreetingItems {
  pic: string;
  allButtons: ContainerButton[];
  buttons: ContainerButton[];
  buttonTitle: ButtonTitle;
  text: string;
  title: string;
  title2: string;
  title3: string;
  welcome: string;
  [key: string]: any;
}

export interface ContainerItem {
  id: number;
  containerCode: string;
  description: string;
  isVisible: boolean;
  items: GreetingItems;
  itemsAsString: string | null;
  ord: number | null;
  [key: string]: any;
}
