import React from "react";

const DoctorItem = (props) => {
  const { doctor, setDoctor, setActive } = props;
  return (
    <h4
      onClick={() => {
        setDoctor(doctor);
        setActive(true);
      }}
      className="m-2 p3"
      style={{ textDecoration: "underline", color: "blue" }}
    >
      {" "}
      <h3>{doctor.name}</h3>
      <hr />
    </h4>
  );
};

export const Doctors = (props) => {
  const { doctors, setDoctor, setActive } = props;

  return (
    <>
      <div className="row">
        {doctors.map((doctor) => (
          <DoctorItem
            doctor={doctor}
            setActive={setActive}
            setDoctor={setDoctor}
          />
        ))}
      </div>
    </>
  );
};
