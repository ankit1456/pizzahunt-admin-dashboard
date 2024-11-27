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
  description: string;
  image: { imageId: string; url: string };
  priceConfiguration: TPriceConfiguration;
  attributes: TAttribute[];
  isPublished?: boolean;
  categoryId: string;
  category: { _id: string; categoryName: string };
  tenantId: string;
  createdAt: string;
  updatedAt: string;
};

export type TProductPayload = Omit<
  TProduct,
  "createdAt" | "updatedAt" | "category" | "_id" | "image"
> & { image: File };

export type TProductFormValues = Omit<
  TProductPayload,
  "attributes" | "image"
> & {
  attributes: Record<string, string | boolean>;
  image: {
    file: File;
  };
};
