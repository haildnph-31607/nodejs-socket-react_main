export const baseUrl = "http://localhost:8000/api";
export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await response.json();

  if (!response.ok) {
    let messages;
    if (data?.message) {
      messages = data.message;
    } else {
      messages = data;
    }
    return { error: true, messages };
  }
  return data;
};
export const getRequest = async (url) => {
  
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    let message = "An error occurend...";

    if (data?.message) {
      message = data.message;
    }
    return { error: true, message };
  }
  return data;
};
