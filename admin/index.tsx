import AdminBro from 'admin-bro';
import AdminBroExpress from '@admin-bro/express';
import {createConnection} from 'typeorm';
import {Database, Resource} from '@admin-bro/typeorm';
import authenticate from './authenticate';
import UserResource, {labels as userLabels} from './resources/user.resource';
import ChatResource, {labels as chatLabels} from './resources/chat.resource';

AdminBro.registerAdapter({Database, Resource});

export default async function useAdminBroExpress(expressApp: any) {
  await createConnection();

  const chatResources = await ChatResource();
  const userResources = await UserResource();

  const adminBro = new AdminBro({
    resources: [...userResources, ...chatResources],
    locale: {
      language: 'ko',
      translations: {
        messages: {
          loginWelcome: 'BounceCode CMS 에 오신 것을 환영합니다!',
        },
        labels: {
          loginWelcome: 'BounceCode CMS',
          UserEntity: '사용자 관리',
          ...userLabels,
          ...chatLabels,
        },
      },
    },
    rootPath: '/admin',
    branding: {
      companyName: 'BounceCode CMS',
      softwareBrothers: false,
      logo: '',
    },
    dashboard: {
      component: AdminBro.bundle('./components/Dashboard'),
    },
  });

  const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate,
    cookiePassword: String(Math.random()),
  });

  expressApp.use(adminBro.options.rootPath, router);
}
