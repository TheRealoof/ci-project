import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Welcome to api!' });
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
