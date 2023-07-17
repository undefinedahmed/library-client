import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import jwt from 'jsonwebtoken'
import api from 'src/api'

const CheckIn = () => {
  const [data, setData] = useState(null)
  const router = useRouter()
  const { bookId } = router.query

  useEffect(() => {
    const token = localStorage.getItem('library-token')
    const decodedToken = jwt.decode(token)
    if (decodedToken) {
      setData(decodedToken)
      console.log('Decoded Token:', decodedToken)
    } else {
      console.log('Invalid or expired token')
    }
  }, [])

  const submitHandler = async data => {
    console.log(data)

    const objectForApi = {
      action: 'check-in',
      historyObject: {
        ...data,
        checkInDate: new Date()
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
        {!data ? (
          'Loading...'
        ) : (
          <FormLayoutsIcons heading='Check-In' submitHandler={submitHandler} unEditable={true} decodedData={data} />
        )}
      </Grid>
    </Grid>
  )
}

export default CheckIn
