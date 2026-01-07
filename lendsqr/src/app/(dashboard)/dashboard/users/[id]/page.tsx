"use client";

import style from "./layout.module.scss";
import { useUser } from "@/lib/UserContext";

type Props = {
  params: {
    id: string;
  };
};

export default function GeneralDetailsPage({ params }: Props) {
  const user = useUser();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className={style.overall_container}>

    <div className={style.personalInfo}>
      <h3>Personal Information</h3>

      <div className={style.pInfo}>
        <div>
          <p>Full Name</p>
          <p>{ user.fullName}</p>
        </div>
        <div>
          <p>Phone Number</p>
          <p>{ user.phone}</p>
        </div>
        <div>
          <p>Email Address</p>
          <p>{ user.email}</p>
        </div>
        <div>
          <p>BVN</p>
          <p>{ user.bvn}</p>
        </div>
        <div>
          <p>Gender</p>
          <p>{ user.gender}</p>
        </div>
        {/* </div>
          <div className={style.pInfo}> */}
        <div>
          <p>Marital Status</p>
          <p>{ user?.details?.personalInfo?.maritalStatus}</p>
        </div>
        <div>
          <p>Children</p>
          <p>{ user?.details?.personalInfo?.children}</p>
        </div>
        <div>
          <p>Type of residence</p>
          <p>{ user?.details?.personalInfo?.residence}</p>
        </div>
       

      </div>

      </div>
      <div className={style.educationInfo}>
        <h3>Education and Employment</h3>
            <div className={style.eduInfo}>
              <div>
              <p>Level of Education</p>
              <p>{ user?.details?.educationAndEmployment?.levelOfEducation}</p>
          </div>
           <div>
          <p>Employment status</p>
          <p>{ user?.details?.educationAndEmployment?.employmentStatus}</p>
          </div>
           <div>
          <p>sector of employment</p>
          <p>{ user?.details?.educationAndEmployment?.sectorOfEmployment}</p>
          </div>
           <div>
          <p>Duration of employment</p>
          <p>{ user?.details?.educationAndEmployment?.durationOfEmployment}</p>
        </div>
        {/* </div>
      <div className={style.eduInfo}> */}
              <div>
              <p>office email</p>
              <p>{ user?.email}</p>
          </div>
           <div>
          <p>Monthly income</p>
          <p>{ user?.details?.educationAndEmployment?.monthlyIncome}</p>
          </div>
           <div>
          <p>loan repayment</p>
          <p>{ user?.details?.educationAndEmployment?.loanRepayment}</p>
          </div>
         
        </div>
      </div>

      <div className={style.socialInfoCont}>
        <h3>Socials</h3>
        <div className={style.socialInfo}>
           <div>
          <p>twitter</p>
          <p>{ user?.details?.socials?.twitter}</p>
          </div>
           <div>
          <p>facebook</p>
          <p>{ user?.fullName}</p>
          </div>
           <div>
          <p>instagram</p>
          <p>{ user?.details?.socials?.instagram}</p>
          </div>
        </div>
      </div>
      <div className={style.guarantorInfoCont}>
        <h3>Guarantor</h3>
        <div className={style.guarantorInfo}>
           <div>
          <p>full name</p>
          <p>{ user?.details?.guarantor?.fullName}</p>
          </div>
           <div>
          <p>phone number</p>
          <p>{ user?.details?.guarantor?.phone}</p>
          </div>
           <div>
          <p>email address</p>
          <p>{ user?.details?.guarantor?.email}</p>
          </div>
           <div>
          <p>Relationship</p>
          <p>{ user?.details?.guarantor?.relationship}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
