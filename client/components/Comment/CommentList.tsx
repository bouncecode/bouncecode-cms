/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import {Container, Divider, Grid, Typography} from '@material-ui/core';
import CommentCreateFormModule from './modules/CommentCreateFormModule';
import CommentItemModule from './modules/CommentItemModule';
import usePostState from './hooks/usePostState';
import {useCommentsQuery, useCommentStatQuery} from 'client/generated/graphql';

interface ICommentList {
  postId: string;
}

function CommentList({postId}: ICommentList) {
  const [post] = usePostState({id: postId});
  const {data: commentStatData} = useCommentStatQuery({
    variables: {
      where: {postId},
    },
  });
  const {data: commentsData} = useCommentsQuery({
    variables: {
      where: {postId},
    },
  });

  const count = commentStatData?.commentStat?.count || 0;
  const comments = commentsData?.comments;

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography>댓글 {count}개</Typography>
        </Grid>
        <Grid item>
          <CommentCreateFormModule post={post} />
        </Grid>
        {comments?.map(comment => {
          return (
            <Grid item>
              <CommentItemModule post={post} comment={comment} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default CommentList;
