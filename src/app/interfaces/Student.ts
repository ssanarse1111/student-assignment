export interface Student {
    id: number;
    fullName: string;
    gender: string;
    dateOfBirth: Date;
    phoneNumber: number;
    email: string;
    address: {
        locality: string;
        country: string;
        state: string;
        city: string;
        pincode: number;
    }
}