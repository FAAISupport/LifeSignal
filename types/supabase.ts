export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type GenericRow = Record<string, any>;

type GenericTable = {
  Row: GenericRow;
  Insert: GenericRow;
  Update: GenericRow;
  Relationships: [];
};

type GenericView = {
  Row: GenericRow;
  Relationships: [];
};

type GenericFunction = {
  Args: Record<string, any>;
  Returns: any;
};

export type Database = {
  public: {
    Tables: {
      [key: string]: GenericTable;
    };
    Views: {
      [key: string]: GenericView;
    };
    Functions: {
      [key: string]: GenericFunction;
    };
    Enums: {
      [key: string]: string;
    };
    CompositeTypes: {
      [key: string]: GenericRow;
    };
  };
};
