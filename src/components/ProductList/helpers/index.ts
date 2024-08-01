import { IAppState } from "@/store/AppContext"
import {
  OperatorID,
  IPropertyValues,
  IBuiltFilter,
  IProduct
} from "@/utils/types"

type NormalizedValue = string | number | boolean | null | undefined;
type FilterValue = (string | number | boolean)[];

const stringCheckers = {
  some: (filterValue: FilterValue, propertyValue: NormalizedValue) =>
    filterValue.some(v => String(v).toLowerCase().includes(String(propertyValue).toLowerCase())),
  every: (filterValue: FilterValue, propertyValue: NormalizedValue) =>
    filterValue.every(v => String(v).toLowerCase() === String(propertyValue).toLowerCase()),
}

const normalizeValue = (value: string | number | boolean): NormalizedValue =>
  typeof value === 'string' ? value.toLowerCase() : value

const checkNumberValue = (
  filterValue: FilterValue,
  propertyValue: NormalizedValue,
  comparator: (a: number, b: number) => boolean
): boolean => (
  typeof propertyValue === 'number'
  && filterValue.some(value => comparator(propertyValue, Number(value)))
)

const operators: Record<OperatorID, (
  filterValue: FilterValue,
  propertyValue: NormalizedValue
) => boolean> = {
  equals: stringCheckers.every,
  greater_than: (filterValue, propertyValue) =>
    checkNumberValue(filterValue, propertyValue, (a, b) => a > b),
  less_than: (filterValue, propertyValue) =>
    checkNumberValue(filterValue, propertyValue, (a, b) => a < b),
  any: (filterValues, propertyValue) => (
    propertyValue !== null && propertyValue !== undefined && propertyValue !== ''
  ),
  none: (filterValues, propertyValue) => (
    propertyValue === null || propertyValue === undefined || propertyValue === ''
  ),
  in: stringCheckers.some,
  contains: (filterValue, propertyValue) =>
    typeof propertyValue === 'string'
    && filterValue.some(value => String(propertyValue).toLowerCase().includes(String(value).toLowerCase())),
}

const compareValues = (
  value: IPropertyValues,
  builtFilter: IBuiltFilter
): boolean => {
  const currentPropertyValue = normalizeValue(value?.value)
  const currentOperator = builtFilter?.operator?.id as OperatorID

  if (currentOperator === 'any') {
    return operators.any([], currentPropertyValue)
  }
  if (currentOperator === 'none') {
    return operators.none([], currentPropertyValue)
  }

  if (!currentOperator || !builtFilter?.selectedValues) return false

  if (currentOperator === 'greater_than' || currentOperator === 'less_than') {
    const numericPropertyValue = Number(currentPropertyValue)
    const numericFilterValue = builtFilter.selectedValues.map(Number)
    return operators[currentOperator](numericFilterValue, numericPropertyValue)
  }

  return operators[currentOperator](
    builtFilter.selectedValues, currentPropertyValue
  )
}

const applyFilters = (currentState: IAppState): IProduct[] => {
  const { products, builtFilter } = currentState

  if (!builtFilter?.ready) return products

  const valuesToLook = products.reduce((
    acc: IPropertyValues[],
    currentValue: IProduct
  ): IPropertyValues[] => {
    const valuesFound = currentValue?.property_values?.find(
      (pv: IPropertyValues) => pv.property_id === builtFilter?.property?.id
    )

    if (valuesFound && !acc.find((item: IPropertyValues) => item.value === valuesFound.value)) {
      acc.push(valuesFound)
    }
    return acc
  }, [])

  const comparedValues = valuesToLook.filter(
    (v: IPropertyValues) => compareValues(v, builtFilter)
  )

  return products.filter(product =>
    product.property_values.some(property_value =>
      comparedValues.some((compared: IPropertyValues) =>
        compared.property_id === property_value.property_id
        && compared.value === property_value.value
      )
    )
  )
}

export default applyFilters