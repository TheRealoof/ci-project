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
