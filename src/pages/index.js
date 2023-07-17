import React from 'react'
import Grid from '@mui/material/Grid'
import api from 'src/api'
import Table from 'src/views/dashboard/Table'
import useAuth from 'src/hooks/useAuth'

const Dashboard = () => {
  useAuth('/auth/login')

  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await api.get('book/')
        setData(response.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {loading ? <h1>Loading...</h1> : <Table bookData={data} />}
      </Grid>
    </Grid>
  )
}

export default Dashboard
