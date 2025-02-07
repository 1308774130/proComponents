import { useAntdTable } from 'ahooks';
import { Button, Card, Space, TablePaginationConfig } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { Form, Table, useForm } from 'cruise-components';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import type { QueryTableProps, QueryTableRef } from './interface';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_CURRENT = 1;

const QueryTable = forwardRef<QueryTableRef, QueryTableProps<any>>(
  (
    {
      searchColumns,
      formProps,
      columns,
      rowKey,
      pagination: paginationProps,
      refreshDeps = [],
      data: staticData = [],
      remoteRequest,
      firstRequest = true,
      autoRefresh = true,
      noReset = false,
      optionButtons = [],
      ...restProps
    },
    ref
  ) => {
    const [innerFormRef] = useForm();
    const formRef = formProps?.form || innerFormRef;
    const [pagination, setPagination] = useState<TablePaginationConfig>({
      current: DEFAULT_CURRENT,
      pageSize: DEFAULT_PAGE_SIZE,
    });
    // const watchValues = useWatchForm(formRef);
    const watchValues = useWatch([], formRef);

    useEffect(() => {
      submit();
    }, [watchValues]);

    useEffect(() => {
      if (paginationProps !== false && typeof paginationProps === 'object') {
        setPagination(prev => ({
          ...prev,
          ...paginationProps,
        }));
      }
    }, [paginationProps]);

    const getTableData = async (
      {
        current = DEFAULT_CURRENT,
        pageSize = DEFAULT_PAGE_SIZE,
        ...paginationProps
      }: TablePaginationConfig,
      formData: Record<string, any>
    ) => {
      try {
        if (remoteRequest) {
          return await remoteRequest({
            pageIndex: current,
            pageSize,
            ...paginationProps,
            ...formData,
          });
        } else {
          const start = (current - 1) * pageSize;
          const end = start + pageSize;
          const list = staticData.slice(start, end);
          return { list, total: staticData.length };
        }
      } catch (error) {
        console.error('Failed to fetch table data:', error);
        return { list: [], total: 0 };
      }
    };

    const { tableProps, search, loading } = useAntdTable(getTableData, {
      defaultPageSize: pagination.pageSize,
      form: formRef,
      manual: !firstRequest,
      defaultType: formProps?.defaultType || 'simple',
      refreshDeps,
    });

    const { submit, reset } = search;

    useImperativeHandle(ref, () => ({
      resetParams: reset,
      submitParams: (params: Record<string, any>) => {
        formRef?.setFieldsValue(params);
        submit();
      },
      refresh: submit,
      getColumns: () => columns,
      getDataSource: () => tableProps.dataSource || [],
      getParams: () => ({
        ...formRef?.getFieldsValue(),
        pageIndex: tableProps.pagination?.current,
        pageSize: tableProps.pagination?.pageSize,
      }),
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
        <Table
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
  }
);

export default QueryTable;
