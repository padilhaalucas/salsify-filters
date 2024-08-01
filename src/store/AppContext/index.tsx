'use client'

import React, { createContext, useReducer, Dispatch } from 'react'

import datastore from '@/datastore'
import { filterActions, FilterActionTypes } from './actions'
import type { IProduct, IProperty, IOperator, IBuiltFilter } from '@/utils/types'

export interface IAppState {
  products: IProduct[]
  properties: IProperty[]
  operators: IOperator[]
  builtFilter: IBuiltFilter
}

type AppAction =
  | { type: FilterActionTypes.CLEAR; payload: [] }
  | { type: FilterActionTypes.QUICK_SEARCH, payload: { property_id: number, selectedValues: string[] } }
  | { type: FilterActionTypes.CONSTRUCT, payload: Partial<IBuiltFilter> }
  | { type: FilterActionTypes.SEARCH; payload?: any }

const initialState: IAppState = {
  ...datastore,
  builtFilter: { ready: false },
}

const reducer = (state: IAppState, action: AppAction): IAppState => {
  const actionHandler = filterActions[action.type as keyof typeof filterActions]
  return actionHandler ? actionHandler(state, action.payload) : state
}

interface AppContextProps {
  appState: IAppState
  dispatch: Dispatch<AppAction>
}

export const AppContext = createContext<AppContextProps>({
  appState: initialState,
  dispatch: () => undefined
})

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appState, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}