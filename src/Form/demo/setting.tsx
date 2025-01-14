import { FormColumn } from '../interface';

export const columns1: FormColumn[] = [
  {
    type: 'customInput',
    field: 'customInput',
    label: '自定义输入框',
  },
  {
    type: 'select',
    field: 'cruiseLine',
    label: '邮轮航线',
    required: true,
    options: [
      { label: '日本横滨-东京6日游', value: 'japan' },
      { label: '新加坡-马来西亚8日游', value: 'singapore' },
      { label: '地中海巡游12日游', value: 'mediterranean' },
    ],
    props: {
      allValue: -1,
      defaultValue: 'japan',
    },
  },
  {
    type: 'date',
    field: 'departureDate',
    label: '出发日期',
    required: true,
    range: true,
  },
  {
    type: 'date',
    picker: 'time',
    field: 'departureTime',
    label: '出发时间',
    required: true,
  },
  {
    type: 'number',
    field: 'adults',
    label: '成人人数',
    required: true,
    min: 1,
    max: 9,
  },
  {
    type: 'number',
    field: 'children',
    label: '儿童人数',
    min: 0,
    max: 9,
    width: 300,
  },
  {
    type: 'radio',
    field: 'roomType',
    label: '房间类型',
    required: true,
    options: [
      { label: '海景房', value: 'ocean' },
      { label: '内舱房', value: 'interior' },
      { label: '阳台房', value: 'balcony' },
    ],
  },
  {
    type: 'select',
    field: 'dining',
    label: '用餐时段',
    required: true,
    options: [
      { label: '早餐时段 (7:00-9:00)', value: 'breakfast' },
      { label: '午餐时段 (12:00-14:00)', value: 'lunch' },
      { label: '晚餐时段 (18:00-20:00)', value: 'dinner' },
    ],
  },
  {
    type: 'checkbox',
    field: 'activities',
    label: '附加活动',
    options: [
      { label: '岸上观光', value: 'shore' },
      { label: 'SPA护理', value: 'spa' },
      { label: '赌场体验', value: 'casino' },
      { label: '健身房', value: 'gym' },
      { label: '其他', value: 'other' },
    ],
  },
  {
    type: 'input',
    field: 'activitiesExtra',
    label: ' ',
    hide: values => !values?.activities?.includes('other'),
  },
  {
    type: 'switch',
    field: 'insurance',
    label: '旅游保险',
  },
  {
    type: 'input',
    field: 'specialRequests',
    label: '特殊要求',
    placeholder: '如果有任何特殊需求，请在此说明',
  },
  {
    type: 'input',
    field: 'contactName',
    label: '联系人姓名',
    required: true,
  },
  {
    type: 'input',
    field: 'contactPhone',
    label: '联系电话',
    required: true,
  },
  {
    type: 'input',
    field: 'email',
    label: '电子邮箱',
    required: true,
    validator: [{ type: 'email', message: '请输入有效的邮箱地址' }],
  },
  {
    type: 'input',
    field: 'phone',
    label: '手机号码',
    required: true,
    validator: /^1[3-9]\d{9}$/,
  },
];

export const columns2 = onChange => [
  {
    type: 'select',
    field: 'select1',
    label: 'select1',
    options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 },
    ],
    onChange,
  },
  {
    type: 'select',
    field: 'select2',
    label: 'select2',
    onChange: (value, form) => {
      form.setFieldValue('select3', value);
    },
  },
  {
    field: 'select3',
    label: 'select2的值',
    hide: values => !values?.select2,
    readOnly: true,
  },
];
