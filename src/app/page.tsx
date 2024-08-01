import React from 'react'
import { Container, Typography, Box } from '@mui/material'

import Filter from '@/components/Filter'
import ProductList from '@/components/ProductList'
import { AppProvider } from '@/store/AppContext'

export default function Home() {
  return (
    <AppProvider>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Product Filtering
          </Typography>
          <Filter />
          <ProductList />
        </Box>
      </Container>
    </AppProvider>
  );
}
