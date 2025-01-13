import { useAntdTable } from 'ahooks';
import { Button, Card, Space, Table, TablePaginationConfig } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { Form, useForm } from 'cruise-components';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import type { QueryTableProps, QueryTableRef } from './interface';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_CURRENT = 1;
const QueryTable = forwardRef<QueryTableRef, QueryTableProps>(
  <T extends Record<string, any>>(
    {
      // Form props
      searchColumns,
      formProps,

      // Table props
      columns,
      rowKey,
      pagination: paginationProps,
      refreshDeps = [],

      // Data props
      data: staticData = [],
      remoteRequest,
      firstRequest = true,
      autoRefresh = true,
      noReset = false,

      // Other props
      optionButtons = [],
      ...restProps
    }: QueryTableProps<T>,
    ref,
  ) => {
    const [innerFormRef] = useForm();
    const formRef = formProps?.form || innerFormRef;
    const [pagination, setPagination] = useState<TablePaginationConfig>({
      current: DEFAULT_CURRENT,
      pageSize: DEFAULT_PAGE_SIZE,
    });
    // const watchValues = useWatchForm(formRef);
    const watchValues = useWatch(['name2'], formRef);

    useEffect(() => {
      console.log(111, watchValues);
    }, [watchValues]);

    useEffect(() => {
      console.log(refreshDeps);
    }, [refreshDeps]);

    useEffect(() => {
      if (paginationProps !== false && typeof paginationProps === 'object') {
        setPagination({
          ...pagination,
          ...paginationProps,
        });
      }
    }, [paginationProps]);

    // 处理数据获取
    const getTableData = async (
      {
        current = DEFAULT_CURRENT,
        pageSize = DEFAULT_PAGE_SIZE,
        ...paginationProps
      }: TablePaginationConfig,
      formData: Record<string, any>,
    ) => {
      console.log(formData);
      if (remoteRequest) {
        // 远程请求数据
        return remoteRequest({
          pageIndex: current,
          pageSize,
          ...paginationProps,
          ...formData,
        });
      } else {
        // 处理静态数据
        const start = (current - 1) * pageSize;
        const end = start + pageSize;
        const list = staticData.slice(start, end);
        return Promise.resolve({
          list,
          total: staticData.length,
        });
      }
    };

    // 使用 ahooks 的 useAntdTable
    const { tableProps, search, loading } = useAntdTable(getTableData, {
      defaultPageSize: pagination.pageSize,
      form: formRef,
      manual: !firstRequest,
      defaultType: formProps?.defaultType || 'simple',
      refreshDeps: refreshDeps,
    });

    const { submit, reset } = search;

    // 暴露给外部的方法
    useImperativeHandle(ref, () => ({
      resetParams: reset, // 重置form表单
      submitParams: (params: Record<string, any>) => {
        formRef?.setFieldsValue(params);
        submit();
      }, // 手动提交查询表单
      refresh: submit, // 刷新表格
      getColumns: () => columns, // 获取列配置
      getDataSource: () => tableProps.dataSource || [], // 获取表格数据
      getParams: () => ({
        ...formRef?.getFieldsValue(),
        pageIndex: tableProps.pagination?.current,
        pageSize: tableProps.pagination?.pageSize,
      }), // 获取查询参数
    }));

    const OptionsBtn = useMemo(() => {
      if (optionButtons.length === 0) return null;
      const btnlist = [...optionButtons];
      if (searchColumns) {
        if (autoRefresh) {
          btnlist.push({
            text: '查询',
            onClick: () => {
              submit();
            },
          });
        }
        if (!noReset) {
          btnlist.push({
            text: '重置',
            onClick: () => {
              formRef?.resetFields();
            },
          });
        }
      }
      return (
        <div style={{ marginBottom: 16 }}>
          <Space>
            {btnlist.map(({ type, onClick, text, ...rest }, index) => (
              <Button key={index} type={type} onClick={onClick} {...rest}>
                {text}
              </Button>
            ))}
          </Space>
        </div>
      );
    }, [optionButtons]);

    return (
      <Card bordered={false}>
        {/* 查询表单 */}
        {searchColumns && (
          <div style={{ marginBottom: 16 }}>
            <Form
              layout="horizontal"
              columnGrid={3}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              form={formRef}
              columns={searchColumns}
              onFinish={submit}
              {...formProps}
            />
          </div>
        )}

        {/* 操作按钮 */}
        {OptionsBtn}

        {/* 数据表格 */}
        <Table<T>
          {...restProps}
          {...tableProps}
          columns={columns}
          rowKey={rowKey}
          loading={loading}
          pagination={
            paginationProps === false
              ? false
              : {
                  showSizeChanger: true,
                  showQuickJumper: true,
                  ...tableProps.pagination,
                  ...paginationProps,
                }
          }
        />
      </Card>
    );
  },
);

export default QueryTable;
