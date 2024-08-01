'use client'

import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import { Card, CardContent, Typography, Grid } from '@mui/material'

import { IProduct, IPropertyValues } from '@/utils/types'
import { AppContext } from '@/store/AppContext'

interface ProductCardProps {
  product: IProduct
  searchStarted: boolean
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: '15px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}))

const ProductCard: React.FC<ProductCardProps> = ({ product, searchStarted }) => {
  const { appState } = useContext(AppContext)
  const { builtFilter } = appState

  const CardSection: React.FC<{ title?: string; propertyID: number }> = ({ title, propertyID }) => {
    const textStyle = {
      margin: '8px 0px 0px 0px',
      ...(searchStarted && builtFilter?.property?.id === propertyID && { fontWeight: 'bolder', color: 'green' })
    }

    return (
      <Grid item>
        {propertyID !== 0 && (
          <Typography color="textSecondary" style={{ ...textStyle, margin: '8px 0px 0px 0px' }}>
            {title}
          </Typography>
        )}
        <Typography
          variant={propertyID === 0 ? "h5" : "body1"}
          component="div"
          style={{ ...propertyID === 0 && textStyle, margin: '0px 0px 8px 0px' }}
        >
          <strong>
            {product.property_values?.find((pv: IPropertyValues) => pv.property_id === propertyID)?.value ?? '-'}
          </strong>
        </Typography>
      </Grid>
    )
  }

  return (
    <StyledCard style={{ marginBottom: '15px', ...(searchStarted && { border: '2px solid green' }) }}>
      <CardContent>
        <CardSection propertyID={0} />
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
          <CardSection title='Color:' propertyID={1} />
          <CardSection title='Weight (oz):' propertyID={2} />
          <CardSection title='Category:' propertyID={3} />
          <CardSection title='Wireless?' propertyID={4} />
        </Grid>
      </CardContent>
    </StyledCard>
  )
}

export default ProductCard