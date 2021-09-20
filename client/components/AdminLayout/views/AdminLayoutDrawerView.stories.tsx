/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.AdminLayout.views
 */

import * as React from 'react';
import {AdminLayoutDrawerView} from './AdminLayoutDrawerView';

export default {
  title: 'AdminLayout/AdminLayoutDrawerView',
  component: AdminLayoutDrawerView,
};

export const defaultView = () => {
  return <AdminLayoutDrawerView />;
};
