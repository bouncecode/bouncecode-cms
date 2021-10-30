/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import Router from 'next/router';
import {useSnackbar} from 'notistack';
import {AdminLayoutDrawerModule} from './modules/DrawerModule';
import {useSignOutCallback} from './hooks/useSignOutCallback';
import {PageLoadingView} from '../../commons/PageLoading/views/PageLoadingView';
import {AdminLayoutModule} from './modules/LayoutModule';
import {IComponent} from './interfaces';
import {useMeQuery} from 'client/generated/graphql';

const AdminLayout: IComponent = ({children}) => {
  const handleLogout = useSignOutCallback();
  const {enqueueSnackbar} = useSnackbar();
  const {data, loading, error} = useMeQuery({
    onCompleted: data => {
      if (!data?.me?.isAdmin) {
        enqueueSnackbar('권한이 없습니다.', {variant: 'error'});
        Router.push('/');
      }
    },
    onError: () => {
      Router.push('/signin');
    },
  });

  if (loading || !data || !data?.me?.isAdmin) {
    return <PageLoadingView />;
  }

  return (
    <AdminLayoutModule
      drawer={<AdminLayoutDrawerModule />}
      data={data}
      handleLogout={handleLogout}
      children={children}
    />
  );
};

export default AdminLayout;
