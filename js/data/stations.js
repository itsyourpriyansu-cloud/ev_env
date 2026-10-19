// ⚠ MOCK DATA — sample Hyderabad stations for the locator preview only.
// Not real Envizon sites: names are descriptive, coordinates are representative locations in each
// area, prices are illustrative ₹/kWh. Blueprint §2 Pillar B / §5.7: replace with a licensed,
// verified station feed before any public launch. The UI labels this as "Sample data".
export const STATIONS = [
  {
    id: 'HYD-1042', name: 'HITEC City Charge Hub', area: 'Madhapur', address: 'Cyber Towers Rd, HITEC City, Madhapur, Hyderabad 500081',
    lat: 17.4504, lng: 78.3808, hours: '24 hours', open: true, rating: 4.7, reviews: 128, updatedMin: 2,
    chargers: [{ name: 'Fast Charger A', type: 'DC', powerKw: 120, pricePerKwh: 19.5, connectors: [{ standard: 'CCS-2', status: 'available' }, { standard: 'CCS-2', status: 'occupied' }] }],
  },
  {
    id: 'HYD-1057', name: 'Gachibowli Fast Charge Point', area: 'Gachibowli', address: 'Old Mumbai Hwy, Gachibowli, Hyderabad 500032',
    lat: 17.4401, lng: 78.3489, hours: '24 hours', open: true, rating: 4.5, reviews: 86, updatedMin: 4,
    chargers: [{ name: 'DC Charger', type: 'DC', powerKw: 60, pricePerKwh: 18.0, connectors: [{ standard: 'CCS-2', status: 'available' }] }],
  },
  {
    id: 'HYD-1063', name: 'Financial District Fleet Depot', area: 'Nanakramguda', address: 'Financial District, Nanakramguda, Hyderabad 500032',
    lat: 17.4146, lng: 78.3437, hours: '24 hours', open: true, rating: 4.8, reviews: 54, updatedMin: 1,
    chargers: [{ name: 'High-Power Cabinet', type: 'DC', powerKw: 240, pricePerKwh: 21.0, connectors: [{ standard: 'CCS-2', status: 'available' }, { standard: 'CCS-2', status: 'available' }, { standard: 'CCS-2', status: 'occupied' }, { standard: 'CCS-2', status: 'available' }] }],
  },
  {
    id: 'HYD-1071', name: 'Kondapur EV Station', area: 'Kondapur', address: 'Botanical Garden Rd, Kondapur, Hyderabad 500084',
    lat: 17.4633, lng: 78.3636, hours: '6:00 AM – 11:00 PM', open: true, rating: 4.3, reviews: 41, updatedMin: 6,
    chargers: [
      { name: 'DC Charger', type: 'DC', powerKw: 60, pricePerKwh: 18.0, connectors: [{ standard: 'CCS-2', status: 'occupied' }] },
      { name: 'AC Charger', type: 'AC', powerKw: 22, pricePerKwh: 14.0, connectors: [{ standard: 'Type 2', status: 'available' }] },
    ],
  },
  {
    id: 'HYD-1088', name: 'Jubilee Hills Road 36 Charging Bay', area: 'Jubilee Hills', address: 'Road No. 36, Jubilee Hills, Hyderabad 500033',
    lat: 17.4300, lng: 78.4075, hours: '24 hours', open: true, rating: 4.6, reviews: 97, updatedMin: 3,
    chargers: [{ name: 'Fast Charger', type: 'DC', powerKw: 120, pricePerKwh: 20.0, connectors: [{ standard: 'CCS-2', status: 'available' }, { standard: 'CCS-2', status: 'available' }] }],
  },
  {
    id: 'HYD-1094', name: 'Banjara Hills Charging Point', area: 'Banjara Hills', address: 'Road No. 12, Banjara Hills, Hyderabad 500034',
    lat: 17.4120, lng: 78.4360, hours: '7:00 AM – 11:00 PM', open: true, rating: 4.4, reviews: 63, updatedMin: 8,
    chargers: [
      { name: 'DC Charger', type: 'DC', powerKw: 60, pricePerKwh: 18.5, connectors: [{ standard: 'CCS-2', status: 'available' }] },
      { name: 'AC Charger', type: 'AC', powerKw: 7.4, pricePerKwh: 12.0, connectors: [{ standard: 'Type 2', status: 'occupied' }] },
    ],
  },
  {
    id: 'HYD-1102', name: 'Ameerpet Metro Parking EV Point', area: 'Ameerpet', address: 'Ameerpet Metro Station Parking, Ameerpet, Hyderabad 500016',
    lat: 17.4375, lng: 78.4482, hours: '6:00 AM – 11:30 PM', open: true, rating: 4.2, reviews: 38, updatedMin: 5,
    chargers: [{ name: 'DC Charger', type: 'DC', powerKw: 60, pricePerKwh: 18.0, connectors: [{ standard: 'CCS-2', status: 'occupied' }, { standard: 'CCS-2', status: 'available' }] }],
  },
  {
    id: 'HYD-1117', name: 'Begumpet Charging Station', area: 'Begumpet', address: 'Prakash Nagar, Begumpet, Hyderabad 500016',
    lat: 17.4440, lng: 78.4630, hours: '24 hours', open: true, rating: 4.5, reviews: 72, updatedMin: 2,
    chargers: [{ name: 'Fast Charger', type: 'DC', powerKw: 120, pricePerKwh: 19.5, connectors: [{ standard: 'CCS-2', status: 'available' }, { standard: 'CCS-2', status: 'available' }] }],
  },
  {
    id: 'HYD-1125', name: 'Necklace Road Charging Point', area: 'Hussain Sagar', address: 'Necklace Rd, Khairatabad, Hyderabad 500004',
    lat: 17.4240, lng: 78.4700, hours: '6:00 AM – 10:00 PM', open: true, rating: 4.1, reviews: 29, updatedMin: 11,
    chargers: [{ name: 'AC Chargers', type: 'AC', powerKw: 22, pricePerKwh: 14.0, connectors: [{ standard: 'Type 2', status: 'available' }, { standard: 'Type 2', status: 'available' }] }],
  },
  {
    id: 'HYD-1133', name: 'Secunderabad Station Road Charger', area: 'Secunderabad', address: 'Station Rd, Secunderabad, Hyderabad 500003',
    lat: 17.4399, lng: 78.4983, hours: '24 hours', open: true, rating: 4.3, reviews: 45, updatedMin: 7,
    chargers: [{ name: 'Fast Charger', type: 'DC', powerKw: 120, pricePerKwh: 19.0, connectors: [{ standard: 'CCS-2', status: 'available' }, { standard: 'CCS-2', status: 'occupied' }] }],
  },
  {
    id: 'HYD-1146', name: 'Kukatpally Highway EV Point', area: 'Kukatpally', address: 'NH 65, KPHB Colony, Kukatpally, Hyderabad 500072',
    lat: 17.4849, lng: 78.3936, hours: '24 hours', open: false, rating: 3.9, reviews: 22, updatedMin: 14, note: 'Under maintenance',
    chargers: [{ name: 'DC Charger', type: 'DC', powerKw: 60, pricePerKwh: 18.0, connectors: [{ standard: 'CCS-2', status: 'offline' }] }],
  },
  {
    id: 'HYD-1158', name: 'Manikonda Charging Hub', area: 'Manikonda', address: 'Puppalaguda Rd, Manikonda, Hyderabad 500089',
    lat: 17.4040, lng: 78.3860, hours: '24 hours', open: true, rating: 4.6, reviews: 58, updatedMin: 3,
    chargers: [{ name: 'Fast Charger', type: 'DC', powerKw: 120, pricePerKwh: 19.5, connectors: [{ standard: 'CCS-2', status: 'available' }, { standard: 'CCS-2', status: 'available' }] }],
  },
];
