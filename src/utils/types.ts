export type OperatorID = 'equals' | 'greater_than' | 'less_than' | 'any' | 'none' | 'in' | 'contains'

export interface IProduct {
  id: number
  property_values: IPropertyValues[]
}

export interface IPropertyValues {
  property_id: number
  value: string | number | boolean
}

export interface IProperty {
  id: number
  name: string
  type: 'string' | 'number' | 'enumerated'
  values?: string[]
}

export interface IOperator {
  text: string
  id: string
}

export interface IBuiltFilter {
  property?: IProperty
  operator?: IOperator
  selectedValues?: (string | number | boolean)[]
  ready?: boolean
}

export interface IQuickSearch {
  property_id: number
  selectedValues: string[]
}