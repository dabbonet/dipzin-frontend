import { useEffect } from "react";

function useSEO({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;
    if (description && metaDescription) {
      metaDescription.content = description;
    }
  }, [title, description]);
}

export default useSEO;
