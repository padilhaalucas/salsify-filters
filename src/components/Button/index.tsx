import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

const transitionStyles = {
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
}

export const BlackWhiteButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '6px 12px',
  borderRadius: '8px',
  border: '1px solid #000',
  backgroundColor: '#fff',
  color: '#000',
  ...transitionStyles,
}));

interface GradientButtonProps extends ButtonProps {
  filteringNotStarted?: boolean;
}

export const GradientButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'filteringNotStarted',
})<GradientButtonProps>(({ theme, filteringNotStarted }) => ({
  padding: '6px 12px',
  borderRadius: '8px',
  color: theme.palette.getContrastText('#c31f83'),
  backgroundImage: filteringNotStarted
    ? 'linear-gradient(90deg, #4CAF50 0%, #45a049 100%)'
    : 'linear-gradient(90deg, #c31f83 0%, #8a25f8 100%)',
  transition: 'all 0.3s ease-in-out',
  border: filteringNotStarted ? '1px solid #45a049' : 'none',
  '&.Mui-disabled': {
    color: filteringNotStarted ? theme.palette.text.disabled : 'white',
    cursor: 'not-allowed',
    pointerEvents: 'auto',
    opacity: 0.6,
    boxShadow: 'none',
  },
  '&:hover': {
    backgroundImage: filteringNotStarted
      ? 'linear-gradient(90deg, #45a049 0%, #4CAF50 100%)'
      : 'linear-gradient(90deg, #c31f83 0%, #8a25f8 100%)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
}));