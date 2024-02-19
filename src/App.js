import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Doctors } from "./components/Doctors";
import { Agenda } from "./components/Agenda";
import ThankPage from "./components/ThankPage";
import { getRandomColor } from "./components/utilis";

function App() {
  const [active, setActive] = useState(false);

  const [currentDoctor, setDoctor] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentService, setService] = useState("");
  const services = [
    {
      name: "Service 1",
      doctors: [
        {
          id: 1,
          name: "Doctor 1",
        },
        {
          id: 2,
          name: "Doctor 2",
        },
        {
          id: 3,
          name: "Doctor 2",
        },
        {
          id: 4,
          name: "Doctor 2",
        },
        {
          id: 5,
          name: "Doctor 3",
        },
      ],
    },
    {
      name: "Chirugie 2",
      doctors: [
        {
          id: 1,
          name: "Chirugien 1",
        },
        {
          id: 1,
          name: "Chirugien 2",
        },
        {
          id: 1,
          name: "Chirugien 2",
        },
        {
          id: 1,
          name: "Chirugien 2",
        },
        {
          id: 1,
          name: "Chirugien 3",
        },
      ],
    },
    {
      name: "Buco",
      doctors: [
        {
          name: "Dentiste 1",
        },
        {
          name: "Dentiste 2",
        },
        {
          name: "Dentiste 2",
        },
        {
          name: "Dentiste 2",
        },
        {
          name: "Dentiste 3",
        },
      ],
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="App"
    >
      <h1> Gestion de RDV</h1>

      <div className="container">
        {!active ? (
          <div className="row">
            {services.map((service) => (
              <>
                {" "}
                <button
                  onClick={() => {
                    setService(service.name);
                  }}
                  className={`btn m-2`}
                  style={{
                    backgroundColor: getRandomColor(),
                  }}
                >
                  {service.name}
                </button>
                {currentService === service.name && (
                  <Doctors
                    setDoctor={setDoctor}
                    setActive={setActive}
                    doctors={service.doctors}
                  />
                )}
              </>
            ))}
          </div>
        ) : (
          <Agenda
            handleShow={handleShow}
            doctor={currentDoctor}
            service={currentService}
          />
        )}
      </div>
      <ThankPage handleClose={handleClose} show={show} />
    </div>
  );
}

export default App;
