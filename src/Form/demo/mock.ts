import moment from 'moment';

// 添加默认数据
export const defaultValues = {
  cruiseLine: 'japan',
  departureDate: [
    moment('2015-01-01', 'YYYY-MM-DD'),
    moment('2015-02-01', 'YYYY-MM-DD'),
  ],
  departureTime: moment(),
  adults: 2,
  children: 1,
  roomType: 'ocean',
  dining: 'breakfast',
  activities: ['shore', 'spa'],
  insurance: true,
  specialRequests: '需要准备儿童床',
  contactName: '张三',
  contactPhone: '13800138000',
  email: 'zhangsan@example.com',
  phone: '13800138000',
};
