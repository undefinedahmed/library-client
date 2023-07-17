import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

const FormLayoutsIcons = ({ heading, submitHandler, unEditable = false, decodedData = {} }) => {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    phoneNumber: '',
    nationalIdentity: ''
  })

  const [error, setError] = React.useState({
    nameError: '',
    emailError: '',
    phoneNumberError: '',
    nationalIdentityError: ''
  })

  useEffect(() => {
    console.log('unEditable: ', unEditable)
    if (unEditable) {
      setData({
        name: decodedData.name,
        email: decodedData.email,
        phoneNumber: decodedData.phoneNumber,
        nationalIdentity: decodedData.nationalIdentity
      })
    }
  }, [])

  const changeHandler = e => {
    const { name, value } = e.target
    setData(prevState => ({ ...prevState, [name]: value }))
  }

  const isValidate = () => {
    let isValid = true
    const newErrors = { ...error }

    // Name validation
    if (data.name.trim() === '') {
      newErrors.nameError = 'Name is required'
      isValid = false
    } else {
      newErrors.nameError = ''
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.emailError = 'Invalid email address'
      isValid = false
    } else {
      newErrors.emailError = ''
    }

    // Number validation
    if (!/^\d{2}-\d{3} \d{4}$/.test(data.phoneNumber)) {
      newErrors.phoneNumberError = 'Invalid phone number (Format: xx-xxx xxxx)'
      isValid = false
    } else {
      newErrors.phoneNumberError = ''
    }

    // NIC validation
    if (data.nationalIdentity.trim() === '') {
      newErrors.nationalIdentityError = 'No NIC number'
      isValid = false
    } else {
      newErrors.nationalIdentityError = ''
    }

    setError(newErrors)

    return isValid
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (isValidate()) {
      console.log('Form submitted successfully!')
      submitHandler(data)
    } else {
      alert('Please Fill All The Fields')
    }
  }

  return (
    <Card>
      <CardHeader title={`${heading} Form`} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Full Name'
                disabled={unEditable}
                name='name'
                error={error.nameError}
                value={data.name}
                onChange={changeHandler}
                placeholder='Full Name Here'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled={unEditable}
                type='email'
                label='Email'
                name='email'
                error={error.emailError}
                value={data.email}
                onChange={changeHandler}
                placeholder='Email Here'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled={unEditable}
                label='Phone No.'
                name='phoneNumber'
                error={error.phoneNumberError}
                value={data.phoneNumber}
                helperText='Use xx-xxx xxxx format'
                onChange={changeHandler}
                placeholder='xx-xxx xxxx'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='number'
                disabled={unEditable}
                label='National Identity'
                name='nationalIdentity'
                error={error.nationalIdentityError}
                value={data.nationalIdentity}
                onChange={changeHandler}
                placeholder='National Identity Number Here'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                {heading}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsIcons
