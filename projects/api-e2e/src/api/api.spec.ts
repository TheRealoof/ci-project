import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Welcome to api!' });
  });
});


describe('POST /verify', () => {
  it('should return the analysis of the comment', async () => {
    const comment = 'You are so stupid!';

    const response = await axios.post('/api/verify', { comment });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('attributeScores');
    expect(response.data.attributeScores).toHaveProperty('TOXICITY');
    expect(response.data.attributeScores.TOXICITY.summaryScore.value).toBeGreaterThan(0.5);
  });
});

describe('POST /verify', () => {
  it('should return the analysis of the comment', async () => {
    const comment = 'You are so nice!';

    const response = await axios.post('/api/verify', { comment });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('attributeScores');
    expect(response.data.attributeScores).toHaveProperty('TOXICITY');
    expect(response.data.attributeScores.TOXICITY.summaryScore.value).toBeLessThan(0.5);
  });
});
