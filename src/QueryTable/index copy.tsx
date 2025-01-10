import { Button, Card, Space, Table } from 'antd';
import { Form } from 'cruise-components';
import { FormRef } from 'cruise-components/Form/interface';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { QueryTableProps, QueryTableRef } from './interface';

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

      // Data props
      data: staticData,
      remoteRequest,
      firstRequest = true,

      // Other props
      optionButtons = [],
      ...restProps
    }: QueryTableProps<T>,
    ref: React.Ref<QueryTableRef>,
  ) => {
    const innerFormRef = useRef<FormRef>(null);
    // 使用外部传入的 form 或内部的 formRef
    const formRef =
      (formProps?.form as React.MutableRefObject<FormRef>) || innerFormRef;

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const searchParamsRef = useRef<Record<string, any>>({});

    // 查询数据
    const fetchData = async (params = {}) => {
      if (!remoteRequest) return;

      setLoading(true);
      try {
        const { list: responseData, total: totalCount } = await remoteRequest({
          ...params,
          current: currentPage,
          pageSize,
        });
        setData(responseData);
        setTotal(totalCount);
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        setLoading(false);
      }
    };
    // 处理重置
    const handleReset = () => {
      formRef.current?.resetFields();
      searchParamsRef.current = {};
      setCurrentPage(1);
      if (remoteRequest) {
        fetchData({});
      }
    };

    // 暴露给外部的方法
    useImperativeHandle(ref, () => ({
      reset: handleReset,
      getColumns: () => columns,
      getData: () => data,
      getParams: () => ({
        ...searchParamsRef.current,
        current: currentPage,
        pageSize,
      }),
    }));

    // 处理表单提交
    const handleSearch = async (values: any) => {
      searchParamsRef.current = values;
      setCurrentPage(1); // 重置页码
      await fetchData(values);
    };

    // 处理分页变化
    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
      setCurrentPage(pagination.current);
      setPageSize(pagination.pageSize);

      if (remoteRequest) {
        fetchData({
          ...searchParamsRef.current,
          ...filters,
          ...sorter,
        });
      }
    };

    // 监听静态数据变化
    useEffect(() => {
      if (staticData) {
        setData(staticData);
        setTotal(staticData.length);
      }
    }, [staticData]);

    // 首次加载或表单变化时请求数据
    useEffect(() => {
      if (remoteRequest && firstRequest) {
        fetchData(searchParamsRef.current);
      }
    }, [firstRequest, remoteRequest]);

    return (
      <Card bordered={false}>
        {/* 查询表单 */}
        {searchColumns && (
          <div style={{ marginBottom: 16 }}>
            <Form
              ref={formRef}
              columns={searchColumns}
              onFinish={handleSearch}
              {...formProps}
            />
          </div>
        )}

        {/* 操作按钮 */}
        {optionButtons.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Space>
              {optionButtons.map((btn, index) => (
                <Button
                  key={index}
                  type={btn.type}
                  onClick={btn.onClick}
                  {...btn}
                >
                  {btn.text}
                </Button>
              ))}
            </Space>
          </div>
        )}

        {/* 数据表格 */}
        <Table
          {...restProps}
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey={rowKey}
          pagination={
            paginationProps === false
              ? false
              : {
                  current: currentPage,
                  pageSize,
                  total,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  ...paginationProps,
                }
          }
          onChange={handleTableChange}
        />
      </Card>
    );
  },
);

export default QueryTable;
