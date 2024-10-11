import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Breadcrumb as AntBreadcrumb } from "antd";

type Props = {
  items: { label: string; to: string }[];
};

function Breadcrumb({ items }: Readonly<Props>) {
  const breadcrumbLinks = [{ label: "Dashboard", to: "/" }, ...items];
  return (
    <AntBreadcrumb
      separator={<FaAngleRight style={{ marginBottom: "-2px" }} />}
      style={{ fontSize: ".8rem" }}
      items={breadcrumbLinks.map((item) => ({
        title: (
          <Link className="link" key={item.label} to={item.to}>
            {item.label}
          </Link>
        ),
      }))}
    />
  );
}

export default Breadcrumb;
