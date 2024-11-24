type TPriceConfiguration = Map<
  string,
  {
    priceType: string;
    availableOptions: Map<string, number>;
  }
>;
type TAttribute = {
  attributeName: string;
  value: unknown;
};

export type TProduct = {
  _id: string;
  productName: string;
  image: { imageId: string; url: string };
  category: { _id: string; categoryName: string };
  priceConfiguration: TPriceConfiguration;
  attributes: TAttribute[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};
