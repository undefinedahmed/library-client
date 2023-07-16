import React from 'react'
import Grid from '@mui/material/Grid'
import api from 'src/api'
import Table from 'src/views/dashboard/Table'

const Dashboard = () => {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('book/')
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Table bookData={data} />
      </Grid>
    </Grid>
  )
}

export default Dashboard
