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
import { Plan } from '@/types';
const theme = createTheme();

export default function Plan() {
  const [loading, setLoading] = React.useState(true);
  const [id, setId] = React.useState('');
  const [benefits, setBenefits] = React.useState('benefit 1;');
  const [contents, setContents] = React.useState('url logo|content name;');
  const [featured, setFeatured] = React.useState('0');
  const [name, setName] = React.useState('');
  const [terms, setTerms] = React.useState('url.com/terms');
  const [value, setValue] = React.useState('$99,99/month');
  
  React.useEffect(() => {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    if (id) {
      getData(id)
    } else {
      setLoading(false)
    }
  }, [])

  async function handleCreate() {
    const payload: Plan = {
      id, 
      benefits,
      contents,
      featured,
      name,
      terms,
      value
    }
    await api.post(`plan`, payload)
    window.location.href = '/admin'
  };

  async function handleUpdate() {
    const payload: Plan = {
      id, 
      benefits,
      contents,
      featured,
      name,
      terms,
      value
    }
    await api.put(`plan?id=${id}`, payload)
    window.location.href = '/admin'
  };

  async function getData(id: string) {
    const response = (await api.get<Array<Plan>>('plan')).data
    const planResponse: Plan = response.filter(plan => plan.id == id)[0]
    setId(id)
    setBenefits(planResponse.benefits)
    setContents(planResponse.contents)
    setFeatured(planResponse.featured)
    setName(planResponse.name)
    setTerms(planResponse.terms)
    setValue(planResponse.value)
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
            Plan
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
            Plan
          </Typography>
          <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
            {id !== '' && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="id"
                label="Id"
                name="id"
                autoFocus
                disabled={id !== ''}
                value={id}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Typography variant="h6" component="h6">
              add ; on final
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Benefits"
              name="benefits"
              autoFocus
              multiline
              rows={5}
              value={benefits}
              onChange={e => setBenefits(e.target.value)}
            />
            <Typography variant="h6" component="h6">
              use | for separate
            </Typography>
             <Typography variant="h6" component="h6">
              add ; on final
            </Typography>
             <Typography variant="h6" component="h6">
              e.g: url logo|name content;
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="contents"
              label="Contents"
              name="contents"
              autoFocus
              multiline
              rows={5}
              value={contents}
              onChange={e => setContents(e.target.value)}
            />
              <TextField
              margin="normal"
              required
              fullWidth
              id="value"
              label="value"
              name="value"
              autoFocus
              value={value}
              onChange={e => setValue(e.target.value)}
            />
              <TextField
              margin="normal"
              required
              fullWidth
              id="terms"
              label="terms"
              name="terms"
              autoFocus
              value={terms}
              onChange={e => setTerms(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="featured">Featured</InputLabel>
              <Select
                labelId="featured"
                id="featured"
                value={featured}
                label="featured"
                onChange={e => setFeatured(e.target.value)}
              >
                <MenuItem value="0">False</MenuItem>
                <MenuItem value="1">True</MenuItem>
              </Select>
            </FormControl>
            {id == '' && (
              <Button
                onClick={handleCreate}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            )}

            {id != '' && (
              <Button
                onClick={handleUpdate}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Update
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}