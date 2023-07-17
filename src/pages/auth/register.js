// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import api from 'src/api'
import { useRouter } from 'next/router'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  const router = useRouter()
  const [values, setValues] = useState({
    name: '',
    email: '',
    nationalIdentity: '',
    phoneNumber: '',
    password: ''
  })
  const [error, setError] = useState({
    nameError: '',
    emailError: '',
    nationalIdentityError: '',
    phoneNumberError: '',
    passwordError: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const isValidate = () => {
    let isValid = true
    const newErrors = { ...error }

    // Name validation
    if (values.name.trim() === '') {
      newErrors.nameError = 'Name is required'
      isValid = false
    } else {
      newErrors.nameError = ''
    }
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

    // Number validation
    if (!/^\d{2}-\d{3} \d{4}$/.test(values.phoneNumber)) {
      newErrors.phoneNumberError = 'Invalid phone number (Format: xx-xxx xxxx)'
      isValid = false
    } else {
      newErrors.phoneNumberError = ''
    }

    // NIC validation
    if (values.nationalIdentity.trim() === '') {
      newErrors.nationalIdentityError = 'No NIC number'
      isValid = false
    } else {
      newErrors.nationalIdentityError = ''
    }

    setError(newErrors)

    return isValid
  }

  const registerHandler = async e => {
    e.preventDefault()
    if (isValidate()) {
      const response = await api.post(`user/signup`, values)
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
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              Register Here 🚀
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={registerHandler}>
            <TextField
              autoFocus
              fullWidth
              name='email'
              value={values.email}
              error={error.emailError}
              onChange={handleChange}
              id='email'
              label='Email'
              sx={{ marginBottom: 4 }}
            />
            <TextField
              fullWidth
              name='name'
              error={error.nameError}
              value={values.name}
              onChange={handleChange}
              label='Name'
              sx={{ marginBottom: 4 }}
            />
            <TextField
              fullWidth
              type='password'
              name='password'
              error={error.passwordError}
              value={values.password}
              onChange={handleChange}
              label='Password'
              sx={{ marginBottom: 4 }}
            />

            <TextField
              fullWidth
              name='phoneNumber'
              value={values.phoneNumber}
              error={error.phoneNumberError}
              onChange={handleChange}
              label='Phone Number'
              helperText='xx-xxx xxxx'
              sx={{ marginBottom: 4 }}
            />
            <TextField
              fullWidth
              name='nationalIdentity'
              value={values.nationalIdentity}
              error={error.nationalIdentityError}
              onChange={handleChange}
              label='National Identity'
              sx={{ marginBottom: 4 }}
            />
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7, mt: 4 }}>
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/auth/login'>
                  <LinkStyled>Sign in instead</LinkStyled>
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
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
