import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function ViewPage() {
    return (<>
        <CssBaseline />
        <Container maxWidth="lg" sx={{
            // display: 'flex',
            // justifyItems: "center",
            // alignItems: "center",
            height: "87vh"
        }}
        >
            <Typography sx={{
                marginTop: '40px',
                marginBottom: '40px',
            }} gutterBottom variant="h5" component="div">
                Lizard
            </Typography>
            <Box sx={{ flexGrow: 1, height: '400px', borderColor: "gray" }}>
                <Card>
                    <CardActionArea sx={{ display: 'flex', flexDirection: 'row', }}>
                        <CardMedia
                            component="img"
                            height="450px"
                            weidth="auto"
                            image="https://images.pexels.com/photos/247204/pexels-photo-247204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="green iguana"
                            sx={{
                                borderRadius: '10px'
                            }}
                        />
                    </CardActionArea>
                    <CardActions>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    </>
    )
}

export default ViewPage