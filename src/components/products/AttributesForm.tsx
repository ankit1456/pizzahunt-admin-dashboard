import { useCategory } from "@hooks/categories";
import { Form, Radio, Switch } from "antd";

type Props = {
  selectedCategoryId: string;
};

function AttributesForm({ selectedCategoryId }: Props) {
  const { data: category } = useCategory(selectedCategoryId);

  return category?.attributes.map((attribute) => {
    const isSwitch = attribute.widgetType === "switch";
    const isRadio = attribute.widgetType === "radio";

    const isChecked = attribute.defaultValue === "Yes";

    return (
      <div key={attribute.attributeName}>
        <Form.Item
          name={["attributes", attribute.attributeName]}
          label={attribute.attributeName}
          initialValue={isRadio ? attribute.defaultValue : isChecked}
          valuePropName={isSwitch ? "checked" : "value"}
        >
          {isRadio ? (
            <Radio.Group>
              {attribute.availableOptions.map((option) => (
                <Radio.Button
                  style={{ fontSize: "13px" }}
                  value={option}
                  key={String(option)}
                >
                  {String(option)}
                </Radio.Button>
              ))}
            </Radio.Group>
          ) : isSwitch ? (
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          ) : null}
        </Form.Item>
      </div>
    );
  });
}

export default AttributesForm;
