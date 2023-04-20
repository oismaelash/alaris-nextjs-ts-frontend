import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Orders from '@/components/OrderList';
import Plans from '@/components/PlanList';
import api from '@/services/api';
import { Order, Plan } from '@/types';

function Admin() {

  const [orders, setOrders] = React.useState<Array<Order>>([])
  const [plans, setPlans] = React.useState<Array<Plan>>([])

  React.useEffect(() => {
    getOrderData()
    getPlanData()
  }, [])

  async function getOrderData(){
    const response = (await api.get<Array<Order>>('order')).data
    setOrders(response)
  }

  async function getPlanData(){
    const response = (await api.get<Array<Plan>>('plan')).data
    setPlans(response)
  }

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Admin
          </Typography>
          <Button href="/plan" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            New Plan
          </Button>
          <Button href="/" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Home
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 8, pb: 6 }}>
        <Plans title="Plans" rows={plans} />
      </Container>
      <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 8, pb: 6 }}>
        <Orders title="Orders" rows={orders} />
      </Container>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <Admin />;
}