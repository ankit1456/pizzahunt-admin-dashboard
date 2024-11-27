import { Col, Flex, Form, InputNumber, Row, Typography } from "antd";
import useCategory from "../../hooks/categories/useCategory";

type Props = {
  selectedCategoryId: string;
};

function PriceConfigurationForm({ selectedCategoryId }: Props) {
  const { data: category } = useCategory(selectedCategoryId);

  if (!category) return;

  return Object.entries(category.priceConfiguration).map(
    ([configKey, configValue]) => (
      <Flex vertical gap={5} key={configKey}>
        <Typography.Text className="font-12">
          {configKey}({configValue.priceType})
        </Typography.Text>
        <Row gutter={20}>
          {configValue.availableOptions.map((option: string) => {
            return (
              <Col span={8} key={option}>
                <Form.Item
                  label={option}
                  name={[
                    "priceConfiguration",
                    configKey,
                    "availableOptions",
                    option,
                  ]}
                  rules={[
                    {
                      required: true,
                      message: "value de de bhai?",
                    },
                  ]}
                >
                  <InputNumber accept="number" addonAfter="$" min={0} />
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <Form.Item
          name={["priceConfiguration", configKey, "priceType"]}
          initialValue={configValue.priceType}
          noStyle
        >
          <input type="hidden" />
        </Form.Item>
      </Flex>
    )
  );
}

export default PriceConfigurationForm;
