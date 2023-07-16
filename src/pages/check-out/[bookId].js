import Grid from '@mui/material/Grid'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import 'react-datepicker/dist/react-datepicker.css'

const CheckOut = () => {
  const submitHandler = data => {
    console.log(data)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <FormLayoutsIcons heading='Check-Out' submitHandler={submitHandler} />
      </Grid>
    </Grid>
  )
}

export default CheckOut
