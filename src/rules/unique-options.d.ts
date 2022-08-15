export interface UniqueOptions
{
  connection? :string;
  table: string;
  field?: string;
  except?: {
    type: string = "params" | "query",
    field: string
  }
}
