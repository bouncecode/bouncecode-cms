import {UserEntity} from '../../server/models/User/entities/User.entity';

const NAVIGATION_NAME = '사용자';

export const labels = {
  UserNavigation: '사용자',
};

export default async function UserResource() {
  return [
    {
      resource: UserEntity,
      options: {
        navigation: {
          name: NAVIGATION_NAME,
        },
        properties: {
          payload: {
            type: 'mixed',
          },
          // 'payload.field0': {
          //   type: 'string',
          // },
          password: {
            type: 'string',
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
          passwordEncrypted: {
            type: 'string',
            isVisible: {
              list: false,
              edit: false,
              filter: false,
              show: true,
            },
          },
        },
      },
    },
  ];
}
