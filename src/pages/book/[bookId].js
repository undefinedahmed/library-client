import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import CustomCard from 'src/@core/components/details-card'
import api from 'src/api'

const BookDetails = () => {
  const router = useRouter()
  const { bookId } = router.query

  const [bookData, setBookData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await api.get(`book/${bookId}`)
        console.log('response: ', response.data)
        setBookData(response.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError('Something Went Wrong')
        alert("Ops. Something's Fishy!")
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

  const formatKeys = str => {
    if (str === 'phoneNumber') return 'Phone Number'
    if (str === 'nationalIdentity') return 'National Identity'
    if (str === 'checkOutDate') return 'Check Out Date'
    if (str === 'defaultCheckInDate') return 'To Be Returned On'
    if (str === 'checkedBy') return 'Checked By'
    if (str === 'checkInOutHistory') return 'Check In/Out History'
    return str
  }

  return (
    <div>
      <h1>Book Details</h1>
      <p>Book ID: {bookId}</p>
      {loading && !error ? (
        'Loading Details...'
      ) : !loading && error ? (
        'Error!'
      ) : (
        <>
          {bookData && (
            <>
              <CustomCard details={bookData} buttonClickHandler={clickHandler} />
              {bookData.checkInOutHistory.length > 0 && (
                <>
                  <h3>Check In/Out History</h3>
                  {bookData.checkInOutHistory.map((each, i) => (
                    <>
                      <span style={{ marginTop: '0.5rem' }}>{i + 1}.</span>
                      {Object.keys(each).map(key => (
                        <div key={key} style={{ marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: 'bold' }}>{formatKeys(key)}: </span>
                          <span>{each[key]}</span>
                        </div>
                      ))}
                    </>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default BookDetails
