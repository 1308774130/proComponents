import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Table as AntTable, TablePaginationConfig } from 'antd';
import { TableProps, TableRef, TableWithColumns } from './interface';
import { EditableRow } from './components/editTableRow';
import { EditableCell } from './components/editTableCell';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_CURRENT = 1;

const Table = forwardRef<TableRef<any>, TableProps<any>>(
  (
    {
      columns: originalColumns,
      rowKey,
      pagination: paginationProps,
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
    }, [firstRequest]);

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

    const handleSave = (row: any) => {
      setDataSource(prevData => {
        const newData = [...prevData];
        const index = newData.findIndex(item => row[rowKey] === item[rowKey]);
        const item = newData[index];
        newData[index] = { ...item, ...row };
        return newData;
      });
    };

    const columns = useMemo(() => {
      return originalColumns?.map((col: any) => {
        console.log(col, 'col');
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record: any) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            render: col.render,
            title: col.title,
            handleSave,
          }),
        };
      });
    }, [originalColumns]);

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
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
      />
    );
  }
) as TableWithColumns<any>;
// 挂载 Column 和 ColumnGroup
Table.Column = AntTable.Column;
Table.ColumnGroup = AntTable.ColumnGroup;
export default Table;
