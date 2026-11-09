export interface BookingType {
  _id: string;
  date: string;
  start: string;
  end: string;
  bookingHours: number;
  bookingFee: number;
  serviceFee: number;
  estimatedTotal: number;
  email: string;
  name: string;
}
