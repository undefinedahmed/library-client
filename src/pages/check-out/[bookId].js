import Grid from '@mui/material/Grid'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import { useRouter } from 'next/router'
import api from 'src/api'

const CheckOut = () => {
  const router = useRouter()
  const { bookId } = router.query

  const submitHandler = async data => {
    console.log(data)

    const objectForApi = {
      action: 'check-out',
      historyObject: {
        ...data,
        checkOutDate: new Date()
      }
    }

    const response = await api.post(`book/${bookId}/update-book`, objectForApi)
    if (response.status === 200) {
      router.push(`/book/${response.data.book._id}`)
    } else {
      alert(`Something Went Wrong! ${response.message || response.error}`)
    }
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
