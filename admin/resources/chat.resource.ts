import {ChatRoomEntity} from '../../server/models/Chat/entities/ChatRoom.entity';
import {ChatCategoryEntity} from '../../server/models/Chat/entities/ChatCategory.entity';
import {ChatMessageEntity} from '../../server/models/Chat/entities/ChatMessage.entity';

const NAVIGATION_NAME = '채팅';

export const labels = {
  ChatCategoryEntity: '채팅 카테고리',
  ChatRoomEntity: '채팅 룸',
  ChatMessageEntity: '채팅 메시지',
};

export default async function ChatResource() {
  return [
    {
      resource: ChatCategoryEntity,
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
        },
      },
    },
    {
      resource: ChatRoomEntity,
      options: {
        navigation: {
          name: NAVIGATION_NAME,
        },
        actions: {
          edit: {isAccessible: false},
          new: {isAccessible: false},
        },
      },
    },
    {
      resource: ChatMessageEntity,
      options: {
        navigation: {
          name: NAVIGATION_NAME,
        },
        actions: {
          edit: {isAccessible: false},
          new: {isAccessible: false},
        },
      },
    },
  ];
}
