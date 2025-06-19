export interface IconListItemModel {
  title: string;
  body: string;
  icon?: {
    asset?: {
      url: string;
    };
  };
}

export interface HomepageModel {
  headerSection?: {
    heading?: string;
    image?: {
      asset?: {
        url: string;
      };
    };
  };
  iconListSection?: IconListItemModel[];
}
