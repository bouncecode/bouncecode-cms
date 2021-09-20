import {UserEntity} from '../../server/models/User/entities/User.entity';

export default async function userResource(connection: any) {
  UserEntity.useConnection(connection);

  return {
    resource: UserEntity,
    options: {
      properties: {
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
  };
}
