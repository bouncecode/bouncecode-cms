/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import CommentList from 'client/components/Comment/CommentList';
import {useRouter} from 'next/router';

function CommentPage() {
  const router = useRouter();
  const postId = router.query.postId as string;

  return <CommentList postId={postId} />;
}

export default CommentPage;
