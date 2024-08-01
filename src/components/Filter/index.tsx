'use client'

import React, { useCallback, useContext, useState, useEffect, useMemo, memo } from 'react'
import {
  Box,
  SelectChangeEvent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Stack,
  Fade,
  RadioGroup,
  Radio,
  Grow,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import NorthIcon from '@mui/icons-material/North'
import CancelIcon from '@mui/icons-material/Cancel'

import FilterItem, { SelectProperty, SelectOperator } from '../FilterItem'
import { GradientButton, BlackWhiteButton } from '../Button'
import { useFilterActions } from '@/hooks/filter'
import { AppContext } from '@/store/AppContext'
import { getAvailableOperators, getCurrentFilterCheckboxes } from '@/utils/data'
import { FilterActionTypes } from '@/store/AppContext/actions'
import type { IBuiltFilter } from '@/utils/types'

const FilterButtonIcon = memo(({ builtFilter }: { builtFilter: IBuiltFilter }) => (
  builtFilter?.ready && builtFilter?.operator?.id !== 'any' && builtFilter?.operator?.id !== 'none'
    ? <NorthIcon /> : <FilterAltIcon />
))

FilterButtonIcon.displayName = 'FilterButtonIcon'

const Filter = memo(() => {
  const { appState, dispatch } = useContext(AppContext)
  const { properties, products, builtFilter } = appState
  const { submitFilter, changeProperty, changeOperator, changeFilters } = useFilterActions()

  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>({})
  const [quickSearchIsOn, setQuickSearchIsOn] = useState(false)

  const availableOperators = useMemo(() => getAvailableOperators(builtFilter?.property), [builtFilter?.property])
  const currentFilterCheckboxes = useMemo(() => getCurrentFilterCheckboxes(products, builtFilter?.property), [products, builtFilter?.property])

  const filterButtonIsDisabled = useMemo(() => {
    const selectedValuesHasValue = !!builtFilter?.selectedValues && builtFilter?.selectedValues?.length !== 0
    const isFilterOperatorNotAnyOrNone = builtFilter?.operator?.id !== 'any' && builtFilter?.operator?.id !== 'none'
    const isFilterReady = !!builtFilter?.ready
    return (!selectedValuesHasValue && isFilterOperatorNotAnyOrNone) || isFilterReady
  }, [builtFilter?.operator?.id, builtFilter?.ready, builtFilter?.selectedValues])

  useEffect(() => {
    if (builtFilter?.operator) {
      const newCheckboxStates: Record<string, boolean> = {}
      currentFilterCheckboxes?.values?.forEach((option: string | number | boolean) => {
        const optionString = String(option)
        newCheckboxStates[optionString] = builtFilter.selectedValues?.includes(option) || false
      })
      setCheckboxStates(newCheckboxStates)
    }
  }, [builtFilter?.operator, builtFilter?.selectedValues, currentFilterCheckboxes?.values])

  const filteringHasStarted = builtFilter?.ready && builtFilter?.operator?.id !== 'any' && builtFilter?.operator?.id !== 'none'
  const filterButtonText = filteringHasStarted
    ? 'You can continue filtering by changing the checkboxes above'
    : 'Filter it!'

  const renderPossibilitiesToFilter = useCallback(() => {
    if (!builtFilter?.operator) return null

    const radioOperators = ['equals', 'greater_than', 'less_than']

    if (radioOperators.includes(builtFilter.operator.id)) {
      return (
        <RadioGroup
          sx={{ flexDirection: 'row' }}
          value={builtFilter.selectedValues?.[0] || ''}
          onChange={(e) => {
            const newValue = e.target.value;
            changeFilters(
              {
                property_id: currentFilterCheckboxes?.property_id as number,
                value: newValue
              },
              true
            )
          }}
        >
          {currentFilterCheckboxes?.values?.map((option: string | number | boolean, i: number) => {
            const optionString = String(option);
            return (
              <Grow key={`${optionString}-${i}`} in={true} timeout={300 + i * 100}>
                <FormControlLabel
                  value={optionString}
                  control={<Radio />}
                  label={optionString}
                />
              </Grow>
            )
          })}
        </RadioGroup>
      )
    }

    return (
      <FormGroup sx={{ flexDirection: 'row' }}>
        {currentFilterCheckboxes?.values?.map((option: string | number | boolean, i: number) => {
          const optionString = String(option);
          return (
            <Grow key={`${optionString}-${i}`} in={true} timeout={300 + i * 100}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxStates[optionString] ?? false}
                    onChange={(e) => {
                      setCheckboxStates(prevState => ({
                        ...prevState,
                        [optionString]: e.target.checked
                      }));
                      changeFilters(
                        {
                          property_id: currentFilterCheckboxes?.property_id as number,
                          value: option
                        },
                        e.target.checked
                      )
                    }}
                  />
                }
                label={optionString}
              />
            </Grow>
          )
        })}
      </FormGroup>
    )
  }, [builtFilter?.operator, changeFilters, checkboxStates, currentFilterCheckboxes])

  const renderQuickSearch = useCallback(() => (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      width: '30%',
      background: 'linear-gradient(90deg, #c31f83 0%, #8a25f8 80%)',
      padding: '12px',
      color: '#fff',
      borderRadius: '8px'
    }}>
      <Box>
        <Box display='flex' justifyContent='space-between' alignItems='center' width='100%' height='20px' margin='0'>
          <strong>Just type and check the results ⚡️</strong>
          <IconButton onClick={() => setQuickSearchIsOn(false)}>
            <CancelIcon sx={{ ":hover": { cursor: 'pointer' } }} />
          </IconButton>
        </Box>
        <i>(by name)</i>
      </Box>
      <FilterItem
        key={properties[0].id}
        property={properties[0]}
        onChange={(id: number, value: string) => {
          if (value !== '') {
            dispatch({
              type: FilterActionTypes.QUICK_SEARCH,
              payload: { property_id: id, selectedValues: [value?.toLowerCase()] },
            })
          } else {
            dispatch({
              type: FilterActionTypes.CLEAR,
              payload: []
            })
          }
        }}
      />
    </Box>
  ), [dispatch, properties])

  const renderContent = useCallback(() => (
    <Box sx={{ height: '8rem' }}>
      {!quickSearchIsOn ? (
        <Fade in={!quickSearchIsOn} timeout={700}>
          <Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '28px' }}>
              <SelectProperty
                key={builtFilter?.property?.id}
                options={properties}
                label='Select a property'
                value={builtFilter?.property?.name ?? ''}
                defaultSelected={false}
                disabled={!!builtFilter?.operator}
                onChange={(e: SelectChangeEvent) => changeProperty(e.target.value)}
              />
              {builtFilter?.property && (
                <Fade in={!!builtFilter?.property} timeout={500}>
                  <div style={{ display: 'inline-block' }}>
                    <SelectOperator
                      key={builtFilter?.operator?.id}
                      options={availableOperators ?? []}
                      label='Select an Operator'
                      value={builtFilter?.operator?.text}
                      onChange={(e: SelectChangeEvent) => changeOperator(e.target.value)}
                    />
                  </div>
                </Fade>
              )}
              {builtFilter?.operator?.id !== 'any' && builtFilter?.operator?.id !== 'none' && !!builtFilter?.operator && renderPossibilitiesToFilter()}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Stack direction="row" spacing={1}>
                <BlackWhiteButton
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    dispatch({ type: FilterActionTypes.CLEAR, payload: [] })
                    setCheckboxStates({})
                  }}
                >
                  Clear filter
                </BlackWhiteButton>
                <GradientButton
                  endIcon={<FilterButtonIcon builtFilter={builtFilter} />}
                  onClick={submitFilter}
                  disabled={filterButtonIsDisabled}
                  filteringNotStarted={!filteringHasStarted && !filterButtonIsDisabled}
                  sx={filteringHasStarted && filterButtonIsDisabled ? { color: 'white' } : {}}
                >
                  {filterButtonText}
                </GradientButton>
                {filterButtonIsDisabled ? (
                  <GradientButton
                    endIcon='⚡️'
                    onClick={() => setQuickSearchIsOn(true)}
                    disabled={quickSearchIsOn}
                  >
                    <strong>{quickSearchIsOn ? 'Quick enabled' : 'Quick filter'}</strong>
                  </GradientButton>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'grey' }}>
                    or clear filter to allow quick filter again ⚡️
                  </Box>
                )}
              </Stack>
            </Box>
          </Box>
        </Fade>
      ) : (
        <Fade in={quickSearchIsOn} timeout={700}>
          <Box>
            {renderQuickSearch()}
          </Box>
        </Fade>
      )}
    </Box>
  ), [
    availableOperators,
    builtFilter,
    changeProperty,
    changeOperator,
    dispatch,
    filterButtonIsDisabled,
    filterButtonText,
    properties,
    quickSearchIsOn,
    renderPossibilitiesToFilter,
    submitFilter,
    renderQuickSearch,
    filteringHasStarted
  ])

  return renderContent()
})
Filter.displayName = 'Filter'

export default Filter