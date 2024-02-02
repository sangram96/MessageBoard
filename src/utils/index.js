export const API_URL = "https://mapi.harmoney.dev/api/v1/messages/";
export const API_KEY = "r46DVCo9wwPzo3Om";

export const getData = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
    });
    const responseJson = await response.json();
    if (response.ok) {
        return responseJson;
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

export const postData = async (text) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
      body: JSON.stringify({ text }),
    });
    const responseJson = await response.json();
    if (response.ok) {
        return responseJson;
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

export const deleteData = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
