'use client'

import React, { useContext } from 'react'
import { Box, Chip, Grow } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'

import ProductCard from './ProductCard'
import applyFilters from './helpers'
import { AppContext } from '@/store/AppContext'
import type { IProduct } from '@/utils/types'

const compStyle = {
  wrapper: {
    height: '55vh',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '2px 2px 4px rgba(200, 200, 200, 0.6)',
    transition: 'all 0.3s ease-in-out',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '12px',
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(90deg, #c31f83 0%, #8a25f8 100%)',
      border: '4px solid transparent',
      borderRadius: '8px',
      backgroundClip: 'padding-box'
    },
    '&::-webkit-scrollbar-button': {
      width: 0,
      height: 0,
      display: 'none',
    },
    '&::-webkit-scrollbar-corner': {
      background: 'transparent',
    },
  }
}

const ProductList: React.FC = () => {
  const { appState } = useContext(AppContext)
  const { builtFilter } = appState
  const products = applyFilters(appState)

  const isFilterApplied = builtFilter?.selectedValues && builtFilter.selectedValues.length > 0 && builtFilter?.ready
  const chipSuffix = products.length === 1 ? ' was' : 's were'

  return (
    <Box component="div" sx={{ ...compStyle.wrapper, ...(isFilterApplied && products?.length >= 1 && { border: '1px solid green' }) }}>
      <Grow in={isFilterApplied} timeout={300}>
        <Box>
          {isFilterApplied && (
            <Chip
              label={
                products?.length > 0 ? (
                  <Box>
                    <strong>{products.length}</strong>
                    {' '}product{chipSuffix} found
                  </Box>
                ) : 'No products found'
              }
              style={{ margin: '0px 8px 16px 0px' }}
              color={products.length > 0 ? 'success' : 'error'}
              variant='outlined'
            />
          )}
        </Box>
      </Grow>
      <TransitionGroup>
        {products.length > 0 && (
          products.map((product: IProduct, i: number) => (
            <Grow key={`${product.id}-${i}`} timeout={300 + i * 100}>
              <div>
                <ProductCard
                  product={product}
                  searchStarted={builtFilter?.ready ?? false}
                />
              </div>
            </Grow>
          ))
        )}
      </TransitionGroup>
    </Box>
  )
}

export default ProductList