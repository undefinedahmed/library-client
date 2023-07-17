import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import Menu from 'mdi-material-ui/Menu'
import { useRouter } from 'next/router'

const AppBarContent = props => {
  const router = useRouter()
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}

        <Button
          size='large'
          variant='contained'
          sx={{ marginBottom: 7, mt: 4, float: 'left' }}
          onClick={() => {
            localStorage.removeItem('library-token')
            router.push('/auth/login')
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  )
}

export default AppBarContent
