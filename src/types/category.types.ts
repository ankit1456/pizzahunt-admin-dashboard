import { EResponseStatus } from ".";

type TPriceConfiguration = Map<
  string,
  {
    priceType: string;
    availableOptions: Array<string>;
  }
>;

type TAttribute = {
  attributeName: string;
  widgetType: "radio" | "switch";
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

export type TCategoryResponse = {
  category: TCategory;
  status: EResponseStatus;
};
