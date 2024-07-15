import { Table as AntTable } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { TPaginatedResponse } from "../types";

type Props<T> = {
  data: TPaginatedResponse<T> | undefined;
  columns: ColumnsType<T>;
  rowKey: string;
  onPageChange: (page: number) => void;
};

function Table<T extends AnyObject>({
  data,
  columns,
  rowKey,
  onPageChange,
}: Readonly<Props<T>>) {
  return (
    <AntTable<T>
      pagination={{
        total: data?.totalCount,
        pageSize: data?.limit,
        current: data?.page,
        onChange: onPageChange,
        responsive: true,
      }}
      rowKey={rowKey}
      dataSource={data?.data}
      columns={columns}
      scroll={{ x: 700 }}
    />
  );
}

export default Table;
