'use client'

import React, { useState } from 'react'
import { TextField, Box } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'

import type { IOperator, IProperty } from '@/utils/types'

interface FilterItemProps {
  property: IProperty
  onChange: (id: number, value: string) => void
}

export const SelectProperty = ({
  options,
  label,
  value,
  onChange,
  disabled,
  defaultSelected
}: {
  options: Omit<IProperty, 'values'>[],
  label: string,
  value: string | undefined,
  onChange: (e: SelectChangeEvent) => void,
  disabled: boolean,
  defaultSelected: boolean
}) => (
  <div>
    <FormControl sx={{ minWidth: 180, height: '44px' }} disabled={disabled}>
      <InputLabel id="demo-simple-select-autowidth-label">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={value}
        defaultChecked={defaultSelected}
        onChange={onChange}
        autoWidth
        label={label}
      >
        {options.map((opt: Omit<IProperty, 'values'>, i: number) => (
          <MenuItem key={`${opt.name}-${i}`} value={opt.name}>
            {opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
) 

export const SelectOperator = ({
  options,
  label,
  value,
  onChange,
}: {
  options: IOperator[],
  label: string,
  value: string | undefined,
  onChange: (e: SelectChangeEvent) => void
}) => {
  return (
    <div>
      <FormControl sx={{ minWidth: 180, height: '44px' }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={onChange}
          autoWidth
          label={label}
        >
          {options.map((opt: IOperator, i: number) => (
            <MenuItem key={`${opt.id}-${i}`} value={opt.text}>
              {opt.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: '44px',
    color: '#fff',
  },
  '& .MuiInputBase-input': {
    padding: '0 14px',
  },
  '& .MuiInputLabel-root': {
    color: '#aaa',
    '&.Mui-focused': {
      color: '#fff',
    },
  },
  '& .MuiInputLabel-outlined': {
    transform: 'translate(14px, 10px) scale(1)',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
  },
}));

const FilterItem: React.FC<FilterItemProps> = ({ property, onChange }) => {
  const [value, setValue] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value
    setValue(newValue)
    onChange(property.id, newValue)
  }

  return (
    <Box sx={{ height: '44px', display: 'flex', alignItems: 'center' }}>
      <CustomTextField
        label={value?.length === 0 ? 'Write the product name' : property.name}
        value={value}
        type={property.type}
        onChange={handleChange}
        variant='outlined'
        fullWidth
        InputLabelProps={{
          shrink: value?.length > 0,
        }}
      />
    </Box>
  )
}

export default FilterItem
