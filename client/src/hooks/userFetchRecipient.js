import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const userFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== user?._id);

  useEffect(() => {
    (async () => {
      if (!recipientId) return;

      try {
        const response = await getRequest(`${baseUrl}/platform/find/${recipientId}`);
        if (response) {
          setRecipientUser(response);
        } else {
          setError("No response from server");
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    })();
    return ()=>{
      recipientId
    }
  }, [recipientId]);

  return { recipientUser, error };
};
