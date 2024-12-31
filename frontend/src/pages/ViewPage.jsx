import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import { getBlog } from '../services/blogService';
import DisplayQuillContent from '../components/DisplayQuillContent';
import { useParams } from 'react-router-dom';

function ViewPage() {

    const [blog, setBlog] = useState(null)
    const { id } = useParams();

    const getPost = async () => {
        try {
            const res = await getBlog(id)
            console.log(res)
            setBlog(res.blog)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }

    };

    useEffect(() => {
        getPost()
    }, [])

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
                {blog?.title}
            </Typography>
            <Box sx={{ flexGrow: 1, height: '400px', borderColor: "gray" }}>
                <Card>
                    <CardActionArea sx={{ display: 'flex', flexDirection: 'row', }}>
                        <CardMedia
                            component="img"
                            height="450px"
                            weidth="auto"
                            image={blog?.poster}
                            alt="green iguana"
                            sx={{
                                borderRadius: '10px'
                            }}
                        />
                    </CardActionArea>
                    <CardActions>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {blog?.title}
                            </Typography>
                            < DisplayQuillContent content={blog?.content} />
                        </CardContent>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    </>
    )
}

export default ViewPage