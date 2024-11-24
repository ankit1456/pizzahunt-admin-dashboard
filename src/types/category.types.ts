type TPriceConfiguration = Map<
  string,
  {
    priceType: string;
    availableOptions: Array<string>;
  }
>;

type TAttribute = {
  attributeName: string;
  widgetType: string;
  defaultValue: string;
  availableOptions: Array<string>;
};

export type TCategory = {
  _id: string;
  categoryName: string;
  priceConfiguration: TPriceConfiguration;
  attributes: TAttribute[];
  createdAt: string;
  updatedAt: string;
};
