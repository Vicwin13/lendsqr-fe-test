export interface User {
  id: string;
  organization: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  details: UserDetails;
}

export interface UserDetails {
  personalInfo: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    gender: string;
    maritalStatus: string;
    children: number;
    residence: string;
  };
  educationAndEmployment: {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    monthlyIncome: string;
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullName: string;
    phone: string;
    email: string;
    relationship: string;
  };
}
