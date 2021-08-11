export const apiService = {
  async get(url) {
    const response = await fetch(url);
    return await response.json();
  },
  async post(url, body) {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  },
};
