import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Table as AntTable, TablePaginationConfig } from 'antd';
import { TableProps, TableRef, TableWithColumns } from './interface';
import { useAntdTable } from 'ahooks';
import { Button, Card, Space } from 'antd';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_CURRENT = 1;

const Table = forwardRef<TableRef<any>, TableProps<any>>(
  (
    {
      columns,
      rowKey,
      pagination: paginationProps,
      refreshDeps = [],
      dataSource: staticData = [],
      remoteRequest,
      firstRequest = true,
      ...restProps
    },
    ref
  ) => {
    const [dataSource, setDataSource] = useState(staticData);
    const [total, setTotal] = useState<number>(staticData?.length || 0);
    const [pagination, setPagination] = useState<TablePaginationConfig | false>({
      current: DEFAULT_CURRENT,
      pageSize: DEFAULT_PAGE_SIZE,
    });

    useEffect(() => {
      if (firstRequest) {
        getTableData();
      }
    }, [firstRequest, ...refreshDeps]);

    useEffect(() => {
      if (!remoteRequest) {
        setDataSource(staticData);
        setTotal(staticData.length);
      }
    }, [staticData]);

    useEffect(() => {
      if (paginationProps === false) {
        setPagination(false);
      } else if (typeof paginationProps === 'object') {
        setPagination({
          ...pagination,
          ...paginationProps,
        });
      }
    }, [paginationProps]);

    const getTableData = async () => {
      if (!remoteRequest) return;
      const params: Record<string, any> = {};
      if (pagination) {
        params.pageIndex = pagination.current;
        params.pageSize = pagination.pageSize;
      }
      try {
        const res = await remoteRequest(params);
        setDataSource(res.list);
        setTotal(res.total);
      } catch (error) {
        console.error('Failed to fetch table data:', error);
      }
    };

    useImperativeHandle(ref, () => ({
      refresh: getTableData,
      getDataSource: () => [...dataSource],
      getColumns: () => columns,
    }));

    return (
      <AntTable
        {...restProps}
        columns={columns}
        rowKey={rowKey}
        pagination={pagination ? { ...pagination, total } : false}
        dataSource={dataSource}
        onChange={pagination => {
          setPagination(pagination);
          getTableData();
        }}
      />
    );
  }
) as TableWithColumns<any>;
// 挂载 Column 和 ColumnGroup
Table.Column = AntTable.Column;
Table.ColumnGroup = AntTable.ColumnGroup;
export default Table;
