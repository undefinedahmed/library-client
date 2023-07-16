import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { useRouter } from 'next/router'

const CustomCard = ({ details, buttonClickHandler }) => {
  console.log('details: ', details)
  const { title, ISBN, history, coverPrice, publishYear, availability } = details

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{title}</Typography>
            <Typography variant='body1' sx={{ letterSpacing: '0.25px' }}>
              ISBN: {ISBN || 'N/A'}
            </Typography>
            <Typography variant='body2'>Year: {publishYear || 'N/A'}</Typography>
            <Typography variant='h5' sx={{ mt: 4, color: 'primary.main' }}>
              ${coverPrice || 'N/A'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Chip
              label={availability ? 'Available' : 'Not Available' || 'N/A'}
              color={availability ? 'success' : 'error'}
              sx={{
                maxWidth: 'max-content',
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 }
              }}
            />
            <Button
              size='small'
              variant='contained'
              onClick={() => buttonClickHandler(availability ? 'Check-out' : 'Check-in')}
            >
              {availability ? 'Check-out' : 'Check-in'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CustomCard
