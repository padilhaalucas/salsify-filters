'use client'

import { useCallback, useContext } from 'react'

import { AppContext } from '@/store/AppContext'
import { FilterActionTypes } from '@/store/AppContext/actions'
import { getAvailableOperators } from '@/utils/data'
import type { IPropertyValues, IProperty } from '@/utils/types'

export const useFilterActions = () => {
  const { appState, dispatch } = useContext(AppContext)
  const { properties, builtFilter } = appState
  const availableOperators = getAvailableOperators(builtFilter?.property)

  const submitFilter = useCallback(() => {
    dispatch({ type: FilterActionTypes.SEARCH })
  }, [dispatch])

  const changeProperty = useCallback((choosedProperty: string) => {
    const newProperty = properties?.find(
      (property: IProperty) => property.name === choosedProperty
    )
    if (newProperty) {
      dispatch({
        type: FilterActionTypes.CONSTRUCT,
        payload: { property: newProperty }
      })
    }
  }, [dispatch, properties])

  const changeOperator = useCallback((choosedOperator: string) => {
    dispatch({
      type: FilterActionTypes.CONSTRUCT,
      payload: {
        ...(builtFilter?.property && { property: builtFilter?.property }),
        ...(builtFilter?.selectedValues && { selectedValues: [] }),
        ...(builtFilter?.ready && { ready: false })
      }
    })
    const newOperator = availableOperators && availableOperators.find(
      operator => operator.text === choosedOperator
    )
    if (newOperator) {
      dispatch({
        type: FilterActionTypes.CONSTRUCT,
        payload: { operator: newOperator }
      })
    }
  }, [availableOperators, builtFilter?.property, builtFilter?.ready, builtFilter?.selectedValues, dispatch])

  const changeFilters = useCallback((option: IPropertyValues, checked: boolean) => {
    let value = option.value

    const radioOperators = ['equals', 'greater_than', 'less_than'];

    if (builtFilter?.operator?.id && radioOperators.includes(builtFilter?.operator?.id)) {
      dispatch({
        type: FilterActionTypes.CONSTRUCT,
        payload: { selectedValues: [value] }
      })
    } else {
      if (checked) {
        const updatedSelectedValues = builtFilter?.selectedValues
          ? [...builtFilter.selectedValues, value]
          : [value]

        dispatch({
          type: FilterActionTypes.CONSTRUCT,
          payload: { selectedValues: updatedSelectedValues }
        })
      } else {
        if (builtFilter?.selectedValues) {
          const remainingOptions = builtFilter.selectedValues.filter((v) =>
            typeof v === 'string' && typeof value === 'string'
              ? v.toLowerCase() !== value.toLowerCase()
              : v !== value
          )
          dispatch({
            type: FilterActionTypes.CONSTRUCT,
            payload: { selectedValues: remainingOptions }
          })
        }
      }
    }
  }, [builtFilter?.selectedValues, builtFilter?.operator?.id, dispatch])

  return {
    submitFilter,
    changeProperty,
    changeOperator,
    changeFilters,
  }
}