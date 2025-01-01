/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Box, Stack, Typography, Pagination, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import NestedModal from '../components/BlogAddModal';
import { getAllBlogs } from '../services/blogService';
import DisplayQuillContent from '../components/DisplayQuillContent';
import { AuthContext } from '../Context/AuthContext';

function BlogListPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { authUser } = useContext(AuthContext);

  const handleFetchBlogs = async (page = 1) => {
    setLoading(false)
    try {
      const response = await getAllBlogs(page, 10);
      setBlogs(response.blogs);
      setTotalPages(response.totalPages);
    } catch (error) {
      setLoading(true)
    }finally{
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

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ height: "auto", marginBottom: '50px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: "space-between",
            alignContent: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" sx={{ color: "black", margin: '30px' }}>
            Blogs
          </Typography>
          <Stack
            direction="column-reverse"
            sx={{ display: 'flex', justifyContent: "center", alignContent: "center" }}
          >
            {
              authUser && <NestedModal update={handleFetchBlogs} />
            }
          </Stack>
        </Box>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {!loading && (Array.from(new Array(10))).map((item, index) => (
            <Box key={index} sx={{ minHeight: 350, maxWidth: 500, maxHeight: 500 }}>
              <Skeleton variant="rectangular" width={350} height={200} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
          ))
          }
          {
            !blogs ? <div>Not Post</div> : blogs?.map((blog, index) => (
              <Grid key={index} size={{ xs: 12, sm: 4, md: 3 }}>
                <Card sx={{ minHeight: 350, maxWidth: 500, maxHeight: 400 }} >
                  <CardActionArea onClick={() => navigate(`blog/${blog.id}`)}>
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
              </Grid>
            ))
          }
        </Grid>
        {
          blogs && <Stack
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
      </Container>
    </>
  );
}

export default BlogListPage;