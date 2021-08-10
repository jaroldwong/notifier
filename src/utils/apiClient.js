const apiClient = {
  get: async function (url) {
    const response = await fetch(url);
    return await response.json();
  },
  post: async function (url, body) {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  },
};

export default apiClient;
