// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import api from 'src/api'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const LoginPage = () => {
  const router = useRouter()

  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({
    emailError: '',
    passwordError: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const isValidate = () => {
    let isValid = true
    const newErrors = { ...error }

    if (values.password.trim() === '') {
      newErrors.passwordError = 'Password is required'
      isValid = false
    } else {
      newErrors.passwordError = ''
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.emailError = 'Invalid email address'
      isValid = false
    } else {
      newErrors.emailError = ''
    }

    setError(newErrors)

    return isValid
  }

  const loginHandler = async e => {
    e.preventDefault()
    if (isValidate()) {
      const response = await api.post(`user/login`, values)
      if (response.status === 200) {
        localStorage.setItem('library-token', response.data.token)
        router.push(`/`)
      } else {
        alert(`Something Went Wrong! ${response.message || response.error}`)
      }
    } else {
      alert('Please Fill All The Fields')
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Please Sign-In
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='email'
              name='email'
              value={values.email}
              error={error.emailError}
              onChange={handleChange}
              label='Email'
              sx={{ marginBottom: 4 }}
            />
            <TextField
              fullWidth
              id='password'
              name='password'
              type='Password'
              value={values.password}
              error={error.passwordError}
              onChange={handleChange}
              label='Password'
              sx={{ marginBottom: 4 }}
            />

            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7, mt: 4 }} onClick={loginHandler}>
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/auth/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
