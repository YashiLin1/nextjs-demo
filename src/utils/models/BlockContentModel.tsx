// utils/models/BlockContentModel.tsx
export interface BlockContentModel {
  _key: string;
  _type: "block";
  children: Array<{
    _key: string;
    _type: "span";
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  list?: "bullet";
}

export interface BlockContentImage {
  _key: string;
  _type: "image";
  asset: {
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
}

export type BodyContent = Array<BlockContentModel | BlockContentImage>;
