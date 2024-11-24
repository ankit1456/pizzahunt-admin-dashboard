import { ReactNode } from "react";

type Props<T> = {
  data: T[] | undefined;
  render: (item: T) => ReactNode;
};

function List<T>({ data, render }: Props<T>) {
  return data?.map(render);
}

export default List;
