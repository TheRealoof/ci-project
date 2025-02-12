import axios from 'axios';

describe('GET /api/auth', () => {
  it('should fail when redirect_uri is undefined', async () => {
    try {
      await axios.get(`/api/auth`);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toEqual({ error: 'redirect_uri is required' });
    }
  });

  it('should return a message when redirect_uri is defined', async () => {
    const redirectUri = 'http://localhost:3000';
    const res = await axios.get(`/api/auth?redirect_uri=${redirectUri}`);

    expect(res.status).toBe(200);
    expect(res.data.url).toBeTruthy();
  });
});

describe('GET /api/auth/token', () => {
  it('should fail when code is undefined', async () => {
    try {
      await axios.post(`/api/auth/token`);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toEqual({ error: 'code is required' });
    }
  });

  it('should fail when redirect_uri is undefined', async () => {
    try {
      await axios.post(`/api/auth/token?code=1234`);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toEqual({ error: 'redirect_uri is required' });
    }
  });

  it('should fail when the code is invalid', async () => {
    try {
      await axios.post(`/api/auth/token?code=0&redirect_uri=http://localhost:3000`);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBeTruthy();
    }
  });
});
