import axios from 'axios';
import Controller from '../config/controllers/controller';

jest.mock('axios');

const mockResponse = { status: 200 }; // Customize the response as needed

describe('Controller', () => {
  it('fetches successfully data from an API', async () => {
    const mockData = ['Item 1', 'Item 2'];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const data = await Controller.getData();
    expect(data).toEqual(mockData);
  });

  it('deletes data successfully', async () => {
    const mockId = '123';
    (axios.delete as jest.Mock).mockResolvedValue(mockResponse);

    const response = await Controller.deleteData({ id: mockId }); // Pass id as an object with id property
    expect(response).toEqual(mockResponse);
  });

  it('creates data successfully', async () => {
    const mockData = ['New Item'];
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await Controller.createData({ data: mockData });
    expect(response).toEqual(mockResponse);
  });

  it('updates data successfully', async () => {
    const mockId = '123';
    const mockData = ['Updated Item'];
    (axios.put as jest.Mock).mockResolvedValue({ data: mockData });

    const response = await Controller.updateData({ id: mockId, data: mockData });
    expect(response).toEqual(mockData);
  });

  // Test error cases similarly using mockRejectedValue to simulate errors
});