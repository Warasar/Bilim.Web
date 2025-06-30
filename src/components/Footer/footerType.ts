export type IfooterDataMain = {
  subtitle: string;
  icons: IfooterIcons[];
  data: IfooterData[];
  map: string;
  end: IfooterEnd;
};

export type IfooterIcons = {
  code: string;
  link: string;
};

export type IfooterData = {
  code: string;
  name: string;
  items: IfooterItems[];
};

export type IfooterItems = {
  code: string;
  name: string;
  link: string;
  icon: null;
};

export type IfooterEnd = {
  title: string;
  info: IfooterEndInfo[];
  text: string;
};

export type IfooterEndInfo = {
  code: string;
  text: string;
};
