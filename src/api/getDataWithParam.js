export const getDataWithParam = async (url, param) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const resp = await fetch(url, {
    headers,
  });

  const data = await resp.json();

  return data;
};
