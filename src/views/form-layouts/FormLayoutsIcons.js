import React from 'react'
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

const FormLayoutsIcons = ({ heading, submitHandler }) => {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    number: '',
    nic: ''
  })

  const changeHandler = e => {
    const { name, value } = e.target
    setData(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <Card>
      <CardHeader title={`${heading} Form`} titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form
          onSubmit={e => {
            e.preventDefault()
            submitHandler({ ...data, checkOutDate: new Date() })
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Full Name'
                name='name'
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
                type='email'
                label='Email'
                name='email'
                value={data.email}
                onChange={changeHandler}
                placeholder='Email Here'
                helperText='You can use letters, numbers & periods'
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
                type='number'
                label='Phone No.'
                name='number'
                value={data.number}
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
                label='National Identity'
                name='nic'
                value={data.nic}
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
