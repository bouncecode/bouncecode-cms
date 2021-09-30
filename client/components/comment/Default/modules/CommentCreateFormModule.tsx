/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module pages
 */

import React from 'react';
import {
  Grid,
  Button,
  Container,
  TextField,
  CircularProgress,
  Typography,
  Avatar,
} from '@material-ui/core';
import {useMeQuery} from 'client/generated/graphql';
import {useCommentCreateFormik} from '../hooks/useCommentCreateFormik';
import {observer} from 'mobx-react-lite';
import {PostState} from '../hooks/usePostState';

interface ICommentDefaultListModule {
  post?: PostState;
}

function CommentCreateFormModule({post}: ICommentDefaultListModule) {
  const postId = post?.id;

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isSubmitting,
    handleReset,
  } = useCommentCreateFormik(postId);

  console.log('errors', errors);

  const {data} = useMeQuery();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar></Avatar>
        </Grid>
        <Grid item xs>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                name="text"
                // label="댓글을 입력해주세요."
                placeholder="댓글을 입력해주세요."
                multiline
                // variant="outlined"
                value={values.text}
                onChange={handleChange}
                error={touched.text && Boolean(errors.text)}
                helperText={touched.text ? errors.text : ''}
                fullWidth
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center">
                <Grid item>
                  {/* <Rating
                          name="rating"
                          onChange={handleChange}
                          value={values.rating}
                        /> */}
                </Grid>
                <Grid item>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <Button
                        fullWidth
                        variant="text"
                        color="primary"
                        onClick={handleReset}>
                        취소
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        // size="large"
                        disabled={!values.text || isSubmitting}
                        endIcon={
                          isSubmitting ? (
                            <CircularProgress size={16} />
                          ) : (
                            undefined
                          )
                        }>
                        댓글
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default observer(CommentCreateFormModule);
