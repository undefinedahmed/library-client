import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import CustomCard from 'src/@core/components/details-card'
import api from 'src/api'

const BookDetails = () => {
  const router = useRouter()
  const { bookId } = router.query

  const [bookData, setBookData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await api.get(`book/${bookId}`)
        console.log('response: ', response.data)
        setBookData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (bookId) {
      fetchData()
    }
  }, [bookId])

  const clickHandler = action => {
    action = action.toLowerCase()
    console.log(action)
    if (action === 'check-in') {
      router.push(`/check-in/${bookId}`)
    } else if (action === 'check-out') {
      router.push(`/check-out/${bookId}`)
    }
  }

  // Fetch the book details using the bookId from the database or API

  return (
    <div>
      <h1>Book Details</h1>
      <p>Book ID: {bookId}</p>
      {loading ? 'Loading Details...' : <CustomCard details={bookData} buttonClickHandler={clickHandler} />}
    </div>
  )
}

export default BookDetails
