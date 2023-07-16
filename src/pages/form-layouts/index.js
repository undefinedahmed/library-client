import Grid from '@mui/material/Grid'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import 'react-datepicker/dist/react-datepicker.css'

const FormLayouts = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <FormLayoutsIcons />
      </Grid>
    </Grid>
  )
}

export default FormLayouts
