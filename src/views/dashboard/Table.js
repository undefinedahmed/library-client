import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Link from 'next/link'

const statusObj = {
  false: { color: 'error' },
  true: { color: 'success' }
}

const DashboardTable = ({ bookData }) => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Availability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookData &&
              bookData.map(row => (
                <Link href={`/book/${row._id}`} key={row._id}>
                  <TableRow
                    hover
                    key={row._id}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 }, cursor: 'pointer' }}
                  >
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.title}</Typography>
                        <Typography variant='caption'>Year: {row.publishYear || 'N/A'}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.ISBN}</TableCell>
                    <TableCell>${row.coverPrice}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.availability ? 'Available' : 'Not Available' || 'N/A'}
                        color={statusObj[row.availability].color}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </Link>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
