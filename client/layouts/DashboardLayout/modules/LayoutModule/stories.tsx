/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.AdminLayout.views
 */

import * as React from 'react';
import {AdminLayoutModule} from '.';
// import {AdminLayoutDrawerModule} from '../modules/AdminLayoutDrawerModule';
import {action} from '@storybook/addon-actions';
import {withKnobs, text} from '@storybook/addon-knobs';

export default {
  title: 'Layouts/AdminLayout',
  component: AdminLayoutModule,
  decorators: [withKnobs],
};

export const LayoutModule = () => {
  // const drawer = <AdminLayoutDrawerModule />;

  const data = {
    me: {
      id: 1,
      email: text('Email', 'test@example.com'),
      isAdmin: false,
    },
  };

  return (
    <AdminLayoutModule
      // drawer={drawer}
      data={data}
      handleLogout={action('handleLogout')}
    />
  );
};
