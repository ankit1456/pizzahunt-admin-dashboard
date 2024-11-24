import { Flex, Select } from "antd";
import { UIEvent, useState } from "react";
import { useInfiniteRestaurants } from "../../hooks";
import { LIMIT_PER_SCROLL, TQueryParams } from "../../types";
import { Loader } from "../../ui";
import { debounce } from "../../utils";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
};

function SelectRestaurant({
  placeholder = "assign restaurant",
  onChange,
  value,
}: Props) {
  const [queryParams, setQueryParams] = useState<TQueryParams>({
    page: 1,
    limit: LIMIT_PER_SCROLL,
  });

  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteRestaurants(queryParams);

  const handleDebouncedSearch = debounce((value: string) => {
    setQueryParams((params) => ({ ...params, q: value }));
  });

  const handleScroll = (e: UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
    const target = e.target as HTMLElement;
    if (
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      hasNextPage &&
      !isFetching &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const handleFocus = () => {
    if (queryParams.q)
      setQueryParams((params) => ({
        ...params,
        page: 1,
        q: "",
      }));
  };

  return (
    <Select
      allowClear
      // className="width-full"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      listHeight={192}
      showSearch
      filterOption={false}
      loading={isFetching || isFetchingNextPage}
      onSearch={handleDebouncedSearch}
      onClear={() => setQueryParams({ page: 1, limit: LIMIT_PER_SCROLL })}
      onFocus={handleFocus}
      onPopupScroll={handleScroll}
    >
      {data?.map((page) =>
        page.data.data.map((restaurant) => (
          <Select.Option value={restaurant.id} key={restaurant.id}>
            {restaurant.name}, {restaurant.address}
          </Select.Option>
        ))
      )}

      {hasNextPage && (
        <Select.Option style={{ pointerEvents: "none" }} value="" disabled>
          {isFetchingNextPage && (
            <Flex align="center" justify="center">
              <Loader />
            </Flex>
          )}
        </Select.Option>
      )}
    </Select>
  );
}

export default SelectRestaurant;
