import datastore from '@/datastore'
import type { IProduct, IProperty, IOperator } from '../types'

export const getAvailableOperators = (property?: IProperty): IOperator[] => {
  if (!property) return []

  const { operators } = datastore
  const operatorMap: { [key: string]: string[] } = {
    string: ['equals', 'any', 'none', 'in', 'contains'],
    number: ['equals', 'greater_than', 'less_than', 'any', 'none', 'in'],
    enumerated: ['equals', 'any', 'none', 'in']
  }

  return operators.filter(operator => operatorMap[property.type].includes(operator.id))
}

export const getCurrentFilterCheckboxes = (products: IProduct[], property?: IProperty) => {
  if (!property) return { property_id: null, values: [] }

  const uniqueValues = new Set<string | number | boolean>()
  products.forEach(product => {
    const propertyValue = product.property_values.find(pv => pv.property_id === property.id)?.value
    if (propertyValue !== undefined) uniqueValues.add(propertyValue)
  })

  return {
    property_id: property.id,
    values: Array.from(uniqueValues).sort()
  }
}