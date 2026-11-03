export interface StudioType {
  _id: string;
  title: string;
  category: string;
  maxCapacity: string;
  hourlyRate: string;
  securityDeposit: string;
  location: string;
  image: string;
  amenities: [string];
  overview: string;
  ownerName: string;
  ownerEmail: string;
}
