export default function generateFormData<T extends object>(
  data: T,
  fileKey = "image"
): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) formData.append(fileKey, value);
    else if (
      typeof value === "string" ||
      typeof value === "boolean" ||
      typeof value === "number"
    )
      formData.append(key, value as string);
    else formData.append(key, JSON.stringify(value));
  });

  return formData;
}
