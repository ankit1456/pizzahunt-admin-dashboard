import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Upload, UploadProps } from "antd";
import { Dispatch, useEffect, useState } from "react";
import { formatValidValuesMessage } from "../../utils/formatValidValuesMessage";

type Props = {
  initialImage?: { url: string };
  onChange?: () => void;
  setError?: Dispatch<React.SetStateAction<string>>;
};

const accept = [
  { extension: ".jpg", mimeType: "image/jpg" },
  { extension: ".jpeg", mimeType: "image/jpeg" },
  { extension: ".png", mimeType: "image/png" },
  { extension: ".webp", mimeType: "image/webp" },
  { extension: ".svg", mimeType: "image/svg+xml" },
];

function ImageUpload({ initialImage, onChange, setError }: Props) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    initialImage?.url
  );

  const validateImage = (file: File) => {
    const mimeTypes = accept.map((option) => option.mimeType);

    const isValidMimeType = mimeTypes.includes(file.type);
    if (!isValidMimeType) {
      setError?.(
        `You can only upload ${formatValidValuesMessage(
          accept.map((option) => option.extension.slice(1))
        )}  file`
      );
      return Upload.LIST_IGNORE;
    }

    const isLt500KB = file.size / 1024 < 500; // 500KB
    if (!isLt500KB) {
      setError?.("Image must be smaller than 500KB!");
      return Upload.LIST_IGNORE;
    }

    setError?.("");
    setImageUrl(URL.createObjectURL(file));
    return false;
  };

  const uploaderConfig: UploadProps = {
    name: "file",
    multiple: false,
    onChange,
    showUploadList: false,
    beforeUpload: validateImage,
  };

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <Upload
      accept={accept.map((option) => option.extension).join(",")}
      listType="picture-card"
      {...uploaderConfig}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="image"
          style={{
            width: "90%",
            height: "90%",
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      ) : (
        <Button
          style={{
            border: 0,
            background: "none",
          }}
        >
          <Flex vertical align="center">
            {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            <PlusOutlined />
            <div style={{ marginTop: 5 }}>Upload</div>
          </Flex>
        </Button>
      )}
    </Upload>
  );
}

export default ImageUpload;
