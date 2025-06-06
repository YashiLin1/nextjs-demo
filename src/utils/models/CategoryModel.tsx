// utils/models/CategoryModel.tsx

export interface CategoryModel {
  _id: string;
  _type: "category";
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  title: string;
  description?: string;
}
