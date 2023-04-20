import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import api from '@/services/api';
import { Order } from '@/types';
const theme = createTheme();

export default function Order() {
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState('IN PROGRESS');
  const [order, setOrder] = React.useState<Order>({
    name: '',
    email: '',
    id: '',
    phone: '',
    status: ''
  })
  
  React.useEffect(() => {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    if (id) {
      getData(id)
    } else {
      window.location.href = '/admin'
    }
  }, [])

  function handleChange(event: SelectChangeEvent) {
    setStatus(event.target.value as string);
  };

  async function handleUpdate() {
    const payload: Order = {...order, status: status}
    await api.put(`order?id=${order.id}`, payload)
    window.location.href = '/admin'
  };

  async function getData(id: string) {
    const response = (await api.get<Array<Order>>('order')).data
    const orderResponse: Order = response.filter(order => order.id == id)[0]
    setOrder(orderResponse)
    setStatus(orderResponse.status)
    setLoading(false)
  }

  if(loading){
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Order
          </Typography>
          <Button href="/admin" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Admin
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xl">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Order
          </Typography>
          <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="Id"
              name="id"
              autoFocus
              disabled
              value={order.id}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              disabled
              value={order.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              disabled
              value={order.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              autoFocus
              disabled
              value={order.phone}
            />
            <FormControl fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                value={status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="IN PROGRESS">IN PROGRESS</MenuItem>
                <MenuItem value="DONE">DONE</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handleUpdate}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}