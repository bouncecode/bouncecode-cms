/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import CommentDefaultListModule from 'client/components/comment/Default/CommentDefaultListModule';
import {useRouter} from 'next/router';

function CommentPage() {
  const router = useRouter();
  const postId = router.query.postId as string;

  return <CommentDefaultListModule postId={postId} />;
}

export default CommentPage;
