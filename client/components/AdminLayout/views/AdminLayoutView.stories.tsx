/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.AdminLayout.views
 */

import * as React from 'react';
import {AdminLayoutView, IAdminLayoutView} from './AdminLayoutView';
import {AdminLayoutDrawerView} from './AdminLayoutDrawerView';
import {action} from '@storybook/addon-actions';
import {withKnobs, text} from '@storybook/addon-knobs';

export default {
  title: 'AdminLayout/AdminLayoutView',
  component: AdminLayoutView,
  decorators: [withKnobs],
};

export const defaultView = () => {
  const drawer = <AdminLayoutDrawerView />;

  const data = {
    me: {
      id: 1,
      email: text('Email', 'test@example.com'),
      isAdmin: false,
    },
  };

  return (
    <AdminLayoutView
      drawer={drawer}
      data={data}
      handleLogout={action('handleLogout')}
    />
  );
};
