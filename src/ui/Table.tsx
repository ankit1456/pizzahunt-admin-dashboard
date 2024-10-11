import { Table as AntTable, Typography } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/lib/table";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  const showTotal = useCallback(
    (total: number, range: [number, number]) => (
      <Typography.Text className="font-12">
        showing {range[0]}-{range[1]} of {total}{" "}
        {location.pathname.split("/")[1]}
      </Typography.Text>
    ),
    [location.pathname]
  );

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
      }}
    >
      <AntTable<T>
        pagination={{
          total: data?.totalCount,
          pageSize: data?.limit,
          current: data?.page,
          responsive: true,
          size: "small",
          onChange: onPageChange,
          showTotal: showTotal,
          hideOnSinglePage: true,
        }}
        rowKey={rowKey}
        dataSource={data?.data}
        columns={columns}
        scroll={{ x: 700, y: "calc(100dvh - 360px)" }}
      />
    </div>
  );
}

export default Table;
