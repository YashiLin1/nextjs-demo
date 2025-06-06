// utils/models/PostModel.tsx

import { BodyContent } from "./BlockContentModel";

export interface PostModel {
  _id: string;
  _type: "post";
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  author?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
  };
  mainImage?: {
    _type: "image";
    asset?: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  };
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
  }>;
  publishedAt?: string;
  body?: BodyContent;
}
