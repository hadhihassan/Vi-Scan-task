import { useContext, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Box, Stack, Typography, Pagination, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
// import { useNavigate } from 'react-router-dom';
import NestedModal from '../components/BlogAddModal';
import { getMyBlogs } from '../services/blogService';
import DisplayQuillContent from '../components/DisplayQuillContent';
import toast from 'react-hot-toast';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../Context/AuthContext';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function ProfilePage() {

  const [blogs, setBlogs] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { authUser } = useContext(AuthContext);


  const handleFetchBlogs = async (page = 1) => {
    try {
      const response = await getMyBlogs(page, 10);

      setBlogs(response.blogs);
      setTotalPages(response.totalPages);

      toast.success("Blogs fetched successfully!");
    } catch (error) {
      if (error.response?.data?.errors) {
        toast.error(error.response.data.errors[0]?.msg);
      } else {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    handleFetchBlogs(value);
  };

  useEffect(() => {
    handleFetchBlogs(currentPage);
  }, [currentPage]);

  return (<>
    <CssBaseline />
    <Container maxWidth="xl" sx={{ height: "auto", marginBottom: '50px', marginTop: '70px' }}>
      <Grid container spacing={2} columns={12} height={'auto'}>
        <Grid size={{ sm: 12, md: 2, lg: 4, xs: 12 }} columns={{ xs: 2, sm: 8, md: 12 }}>
          <Item sx={{ gap: "10px" }}>
            <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                alt={authUser.name}
                src={authUser.profilePic}
                sx={{ width: 200, height: 200 }}
              />
            </Stack>
            <Box component="section" sx={{ p: 2, textAlign: "center" }}>
              <Typography textAlign="center" variant='h6'>
                {authUser.name}
              </Typography>
              <Typography textAlign="center" variant='subtitle2'>
                {authUser.email}
              </Typography>
              <Typography textAlign="center" variant='subtitle2'>
                Total Post:{blogs?.length}
              </Typography>
              <Button variant='contained' fullWidth >Edit</Button>
            </Box>
          </Item>
        </Grid>
        <Grid size={{ md: 8, sm: 12, xs: 12 }} >
          <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 8, md: 12 }}>
            {blogs?.map((blog, index) => (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                <Card sx={{ minHeight: 350, maxWidth: 500, maxHeight: 400 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={blog.poster}
                      alt="Blog Image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {blog.title}
                      </Typography>
                      <DisplayQuillContent content={blog.content} />
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Box display="flex" gap={2} sx={{ padding: "5px", marginTop: "10px" }}>
                  <Button
                    variant="contained"
                    sx={{ flex: 1 }}
                    size="small"
                    color="red"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ flex: 1 }}
                    size="small"
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </>)
}

export default ProfilePage
