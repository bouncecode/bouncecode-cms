import AdminBro from 'admin-bro';
import AdminBroExpress from '@admin-bro/express';
import {createConnection} from 'typeorm';
import {Database, Resource} from '@admin-bro/typeorm';
import authenticate from './authenticate';

import userResource from './resources/user.resource';

AdminBro.registerAdapter({Database, Resource});

export default async function useAdminBroExpress(expressApp: any) {
  const connection = await createConnection();

  const userNavigation = {name: '사용자'};

  const adminBro = new AdminBro({
    resources: [
      ...[await userResource(connection)].map((resource: any) => {
        resource.options = resource.options || {};
        resource.options.navigation = userNavigation;
        return resource;
      }),
    ],
    locale: {
      language: 'ko',
      translations: {
        messages: {
          loginWelcome: 'BounceCode CMS 에 오신 것을 환영합니다!',
        },
        labels: {
          loginWelcome: 'BounceCode CMS',
          UserEntity: '사용자 관리',
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
