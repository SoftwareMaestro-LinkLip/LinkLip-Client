import axios, { AxiosRequestHeaders } from 'axios';

export const authHeader = (): AxiosRequestHeaders => {
  const temp = localStorage.getItem('accessToken');
  if (temp) {
    const accessToken = JSON.parse(temp);
    return {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  } else {
    return { 'Content-Type': 'application/json' };
  }
};

export const requestAccessToken = async () => {
  const rawAccessToken = localStorage.getItem('accessToken');
  const rawRefreshToken = localStorage.getItem('refreshToken');

  if (rawAccessToken && rawRefreshToken) {
    const accessToken = JSON.parse(rawAccessToken);
    const refreshToken = JSON.parse(rawRefreshToken);

    const body = {
      accessToken,
      refreshToken,
    };

    await axios
      .post(`${import.meta.env.VITE_API_SERVER}/token/v1/refresh-token`, body)
      .then((response) => {
        console.log('response.data.success', response.data.success);

        if (!response.data.success) {
          const accessToken = response.data.data.accessToken;
          const refreshToken = response.data.data.refreshToken;

          if (accessToken) {
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
          }

          if (refreshToken) {
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
          }
          return response.data.success;
        }

        return response.data.success;
      });
  } else {
    return false;
  }
};
