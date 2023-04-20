import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Plan } from '@/types';
import api from '@/services/api';
import { benefitsToArray, contentsToArray } from '@/utils';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import GetPlanFOrm from '@/components/GetPlanForm';

function Index() {
  const [plans, setPlans] = React.useState<Array<Plan>>([])
  const [planSelected, setPlanSelected] = React.useState({})
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  React.useEffect(() => {
    getPlanData()
  }, [])

  async function getPlanData(){
    const response = (await api.get<Array<Plan>>('plan')).data
    setPlans(response)
  }


  function handleGetNow(plan: Plan) {
    setOpen(true)
    setPlanSelected(plan)
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
            Alaris
          </Typography>
          <Button href="/admin" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Admin
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {plans.map((plan) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={plan.id}
              xs={12}
              sm={6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={plan.name}
                  subheader={plan.featured == '1' ? "Most popular" : ""}
                  titleTypographyProps={{ align: 'center' }}
                  action={plan.featured == '1' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <ul>
                    {benefitsToArray(plan.benefits).map((benefit) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={benefit}
                      >
                        {benefit}
                      </Typography>
                    ))}
                  </ul>
                  <Typography component="h6" variant="h6" color="text.primary">
                    Contents:
                  </Typography>
                  <ul>
                    {contentsToArray(plan.contents).map((content, index) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={index}
                      >
                        <img src={content.iconUrl} width="30" height="30" />
                        {content.text}
                      </Typography>
                    ))}
                  </ul>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h5" variant="h5" color="text.primary">
                      ${plan.value}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant='contained'
                    onClick={() => handleGetNow(plan)}
                  >
                    Get now
                  </Button>
                  <Button
                    fullWidth
                    variant='text'
                    onClick={() => window.location.replace(plan.terms)}
                  >
                    Terms
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={styleModal}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Request Plan
              </Typography>
              <GetPlanFOrm plan={planSelected} sended={() => setOpen(false)} />
            </Box>
          </Fade>
        </Modal>
      </Container>
     
    </React.Fragment>
  );
}

export default function Pricing() {
  return <Index />;
}