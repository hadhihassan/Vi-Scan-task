import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';

function BlogListPage() {

  const navigate = useNavigate()

  return (<>
    <CssBaseline />
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{
        color: "black",
        margin: '15px'
      }} >
        Blogs
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

        {Array.from(Array(6)).map((_, index) => (

          <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.pexels.com/photos/247204/pexels-photo-247204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={()=>navigate("/blog/12")}>
                Continue reading
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </>
  )
}

export default BlogListPage