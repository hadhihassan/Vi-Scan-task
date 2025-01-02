/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Box, Stack, Typography, Button, Skeleton, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { deleteBlog, getMyBlogs } from '../services/blogService';
import DisplayQuillContent from '../components/DisplayQuillContent';
import toast from 'react-hot-toast';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../Context/AuthContext';
import EditBlogForm from '../components/EditBlogForm';
import UpdateProfileForm from '../components/UpdateProfileForm';
import { useNavigate } from 'react-router-dom';


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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleFetchBlogs = async (page = 1) => {
    setLoading(false)
    try {
      const response = await getMyBlogs(page, 10);

      setBlogs(response.blogs);
      setTotalPages(response.totalPages);

      setLoading(true)
    } catch (error) {
      if (error.response?.data?.errors) {
        toast.error(error.response.data.errors[0]?.msg);
      } else {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
      setLoading(true)
    } finally {
      setLoading(true)
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    handleFetchBlogs(value);
  };

  useEffect(() => {
    handleFetchBlogs(currentPage);
  }, [currentPage]);

  const hadleDeleteBlog = async (id) => {
    try {
      const response = await deleteBlog(id)
      toast.success(response?.message)
      handleFetchBlogs(currentPage);
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (<>
    <CssBaseline />
    <Container maxWidth="xl" sx={{ height: "auto", marginBottom: '50px', marginTop: '70px' }}>
      <Grid container spacing={2} columns={12} height={'auto'}>
        <Grid size={{ sm: 12, md: 2, lg: 4, xs: 12 }} columns={{ xs: 2, sm: 8, md: 12 }}>
          <Item sx={{ gap: "10px" }}>
            <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                sx={{
                  "&:hover": {
                    backgroundColor: "gray",
                    cursor: "pointer"
                  },
                  width: 200, height: 200
                }}
                alt={authUser.name}
                src={authUser.profilePic}
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
              <UpdateProfileForm userData={authUser} />
            </Box>
          </Item>
        </Grid>
        <Grid size={{ md: 8, sm: 12, xs: 12 }} >
          <Grid sx={{ display: 'flex', flexDirection: "row" }} container spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 8, md: 12 }}>
            {blogs?.map((blog, index) => (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                <Card sx={{ minHeight: 350, maxWidth: 500, maxHeight: 400 }}>
                  <CardActionArea onClick={() => navigate(`/blog/${blog.id}`)}>
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
                  <EditBlogForm update={handleFetchBlogs} data={blog} />
                  <Button
                    variant="contained"
                    sx={{ flex: 1 }}
                    size="small"
                    onClick={() => hadleDeleteBlog(blog.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            ))}

            {!blogs?.length && "No Post"}
            {!loading && (Array.from(new Array(10))).map((item, index) => (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                <Card sx={{ minHeight: 350, maxWidth: 500, maxHeight: 400 }}>
                  <Box key={index} sx={{ minHeight: 350, maxWidth: 500, maxHeight: 500 }}>
                    <Skeleton variant="rectangular" width={350} height={250} />
                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))
            }
          </Grid>

          {
            blogs?.length !== 0 && <Stack
              spacing={2}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          }
        </Grid>

      </Grid>
    </Container>
  </>)
}

export default ProfilePage
