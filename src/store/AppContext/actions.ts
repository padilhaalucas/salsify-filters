import { IAppState } from '.'
import type { IBuiltFilter } from '@/utils/types'

export enum FilterActionTypes {
  CLEAR = 'FILTER::CLEAR',
  QUICK_SEARCH = 'FILTER::QUICK_SEARCH',
  CONSTRUCT = 'FILTER::CONSTRUCT',
  SEARCH = 'FILTER::SEARCH'
}

export const filterActions = {
  [FilterActionTypes.CLEAR]:
    (state: IAppState) => ({ ...state, builtFilter: { ready: false } }),
  [FilterActionTypes.QUICK_SEARCH]:
    (state: IAppState, payload: { property_id: number, selectedValues: string[] }) => {
      const property = state.properties.find(p => p.id === payload.property_id)
      const operator = { text: 'Contains', id: 'contains' }

      return {
        ...state,
        builtFilter: {
          ...payload,
          ready: true,
          property,
          operator
        }
      }
    },
  [FilterActionTypes.CONSTRUCT]:
    (state: IAppState, payload: Partial<IBuiltFilter>) =>
      ({ ...state, builtFilter: { ...state.builtFilter, ...payload }}),
  [FilterActionTypes.SEARCH]:
    (state: IAppState) =>
      ({ ...state, builtFilter: { ...state.builtFilter, ready: true }})
}