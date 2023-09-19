import { message } from 'antd';

export const MessageHandler = () => {
  const [messageApi] = message.useMessage();

  const error = (messageText: string) => {
    messageApi.open({
      type: 'error',
      content: messageText,
    });
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Field added successfully',
    });
  };
};

export const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0;

export const convertArrayToObject = (arr: Array<object>) => {
  const x = 0;
  // @ts-ignore
  return arr.reduce((obj, item) => Object.assign(obj, { [item.key]: item.value }), {});
};
