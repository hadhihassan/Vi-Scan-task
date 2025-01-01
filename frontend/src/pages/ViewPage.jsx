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
import moment from 'moment';

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
            height: "87vh"
        }}
        >
            <Card sx={{ display: 'flex', marginTop: "50px" }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'row' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 80, height: 80, borderRadius: "50%", borderColor: "red" }}
                        image={blog?.author.profilePic}
                        alt="Live from space album cover"
                    />
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {blog?.title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                        >
                            {blog?.author.name}
                        </Typography>
                        <Typography variant="subtitle2"
                            component="div"
                            sx={{ color: 'text.secondary' }}>
                            Published On {moment(blog?.createdAt).format('MMM D, YYYY')}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            <Box sx={{ flexGrow: 1, height: '400px', borderColor: "gray", marginTop: "10px" }}>
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
                            < DisplayQuillContent content={blog?.content} viewPage={true} />
                        </CardContent>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    </>
    )
}

export default ViewPage