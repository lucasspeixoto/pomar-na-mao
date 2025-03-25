const MockLeaflet = {
  map: jest.fn(() => ({
    setView: jest.fn(),
    addLayer: jest.fn(),
  })),
  tileLayer: jest.fn(() => ({
    addTo: jest.fn(),
  })),
};

module.exports = MockLeaflet;
