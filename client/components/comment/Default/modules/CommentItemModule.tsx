/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module pages
 */

import React from 'react';
import {
  Grid,
  Button,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Drawer,
  Container,
  Box,
} from '@material-ui/core';
import {
  CommentMyEmotionDocument,
  CommentsQuery,
  useCommentEmotionMutation,
  useCommentEmotionUndoMutation,
  useCommentMyEmotionQuery,
  useMeQuery,
} from 'client/generated/graphql';
import {useCommentCreateFormik} from '../hooks/useCommentCreateFormik';
import {observer} from 'mobx-react-lite';
import {PostState} from '../hooks/usePostState';
import {
  ThumbUpOutlined,
  ThumbDownOutlined,
  KeyboardArrowDown,
  MoreVert,
  AssistantPhotoOutlined,
} from '@material-ui/icons';
import CommentCreateFormModule from './CommentCreateFormModule';
import {formatDistance} from 'date-fns';

interface ICommentItemModule {
  post?: PostState;
  comment: CommentsQuery['comments'][0];
}

function CommentItemModule({post, comment}: ICommentItemModule) {
  const [moreVert, setMoreVert] = React.useState(null);
  const openMoreVert = Boolean(moreVert);
  const toggleMoreVert = open => {
    return event => {
      if (open) {
        setMoreVert(event.currentTarget);
      } else {
        setMoreVert(null);
      }
    };
  };

  const [commentDrawer, setCommentDrawer] = React.useState(null);
  const toggleCommentDrawer = open => {
    return event => {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }

      setCommentDrawer(open);
    };
  };

  const [
    emotionMutation,
    {loading: emotionLoading},
  ] = useCommentEmotionMutation();
  const [
    undoEmotionMutation,
    {loading: undoEmotionLoading},
  ] = useCommentEmotionUndoMutation();
  const updateEmotion = emotion => {
    return () => {
      console.log(myEmotion);
      console.log(emotion);
      if (myEmotion === emotion.toLowerCase()) {
        undoEmotionMutation({
          variables: {
            where: {
              id: comment.id,
            },
          },
          refetchQueries: [
            {
              query: CommentMyEmotionDocument,
              variables: {where: {id: comment.id}},
            },
          ],
        });
      } else {
        emotionMutation({
          variables: {
            where: {
              id: comment.id,
            },
            data: {emotion},
          },
          refetchQueries: [
            {
              query: CommentMyEmotionDocument,
              variables: {where: {id: comment.id}},
            },
          ],
        });
      }
    };
  };

  const {
    data: myEmotionData,
    loading: myEmotionLoading,
  } = useCommentMyEmotionQuery({
    variables: {where: {id: comment.id}},
  });
  const myEmotion = myEmotionData?.commentMyEmotion?.emotion;

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar></Avatar>
          </Grid>
          <Grid item xs>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body2">
                      {comment.user.email}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      {formatDistance(
                        new Date(comment.createdDate),
                        new Date(),
                        {addSuffix: true},
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body1">{comment.text}</Typography>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center">
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<ThumbUpOutlined />}
                        onClick={updateEmotion('LIKE')}
                        disabled={
                          myEmotionLoading ||
                          emotionLoading ||
                          undoEmotionLoading
                        }>
                        {comment.like || ''}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<ThumbDownOutlined />}
                        onClick={updateEmotion('UNLIKE')}
                        disabled={
                          myEmotionLoading ||
                          emotionLoading ||
                          undoEmotionLoading
                        }>
                        {comment.unlike || ''}
                      </Button>
                    </Grid>
                    {post ? (
                      <Grid item>
                        <Button
                          variant="text"
                          size="small"
                          onClick={toggleCommentDrawer(true)}
                          disabled>
                          답글
                        </Button>
                        <Drawer
                          anchor="bottom"
                          open={commentDrawer}
                          onClose={toggleCommentDrawer(false)}>
                          <Container maxWidth="md">
                            <Box pt={2} pb={2}>
                              <CommentCreateFormModule />
                            </Box>
                          </Container>
                        </Drawer>
                      </Grid>
                    ) : (
                      undefined
                    )}
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton onClick={toggleMoreVert(true)} disabled>
                    <MoreVert fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={moreVert}
                    open={openMoreVert}
                    onClose={toggleMoreVert(false)}>
                    <MenuItem
                      // selected={option === 'Pyxis'}
                      onClick={toggleMoreVert(false)}>
                      <ListItemIcon>
                        <AssistantPhotoOutlined />
                      </ListItemIcon>
                      <Typography variant="inherit">신고</Typography>
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
              {/* {post ? (
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<KeyboardArrowDown />}>
                        답글 1개 보기
                      </Button>
                    </Grid>
                    <Grid item>
                      <CommentItemModule comment />
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                undefined
              )} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default observer(CommentItemModule);
