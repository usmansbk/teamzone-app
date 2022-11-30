import { StoreObject, useApolloClient } from "@apollo/client";
import { useCallback, useState } from "react";
import { tokenVar } from "src/graphql/vars";
import useMe from "./useMe";

export default function useUploadAvatar() {
  const { data: me } = useMe();
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);

  const uploadAvatar = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);
      const token = tokenVar();

      try {
        setData(null);
        setLoading(true);
        const uploadUrl = `${process.env.REACT_APP_REST_API_ENDPOINT}/user/picture`;
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        setData(json);
        client.cache.modify({
          id: client.cache.identify(me as StoreObject),
          fields: {
            picture() {
              return json.picture;
            },
          },
        });
      } catch (e) {
        setError(e as Error);
      }
      setLoading(false);
    },
    [me]
  );

  return {
    data,
    error,
    loading,
    uploadAvatar,
  };
}
