export interface Topping {
  id: string;
  name: string;
  type: string;
  price: number;
  createdDate?: Date;
  createdBy?: string;
  modifiedDate?: Date;
  modifiedBy?: string;
}