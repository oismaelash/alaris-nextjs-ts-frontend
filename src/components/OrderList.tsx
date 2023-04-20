import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Title from './Title';
import { Order } from '@/types';
import api from '@/services/api';

export default function Orders(props: any) {

  function onHandleUpdate(row: Order) {
    window.location.href = `order?id=${row.id}`
  }

  async function onHandleDelete(row: Order) {
    const isDelete = window.confirm('You really about this');

    if(isDelete){
      await api.delete<Array<Order>>(`order?id=${row.id}`)
      window.location.reload()
    }
  }

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row: Order) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">
              <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={() => onHandleUpdate(row)}>
                Update
              </Button>
              <Button color='error' variant="outlined" sx={{ my: 1, mx: 1.5 }}  onClick={() => onHandleDelete(row)}>
                Delete
              </Button>
             </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}