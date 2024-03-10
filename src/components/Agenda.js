import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { formattedEvents } from "./utilis";
import "moment/locale/fr";
import { EventForm } from "./CreateEvent";

moment.locale("fr");

const localizer = momentLocalizer(moment);

// //Lien API
// const URL = "http://localhost:3001/avis";

export const Agenda = (props) => {
  const { doctor, service } = props;
  const [rdv, setRdv] = useState([
    {
      date: "21-02-2024",
      time: "10:20",
      patient: {
        name: "Patient 1",
        phone: "0102030405",
      },
      medicin: {},
    },
    {
      date: "29/02/2024",
      time: "8:20",
      patient: {
        name: "Patient 2",
        phone: "0102030405",
      },
    },
  ]);

  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    // Show event creation form when a time slot is selected
    setShowEventForm(true);
    const date = start.toISOString().slice(0, 10);
    const time = moment(start).format("HH:mm");
    setNewEvent({ date, time });
  };

  const handleEventFormSubmit = (eventData) => {
    // Add the new event to the events list
    const { date, name, time, phone } = eventData;
    const formatedEvent = {
      date,
      time,
      patient: {
        name,
        phone,
      },
      doctor,
      service,
    };
    setRdv([...rdv, formatedEvent]);
    setShowEventForm(false);
  };

  const onSelectEvent = (event) => {
    const { start, title, patientPhone } = event;
    setShowEventForm(true);
    const date = start.toISOString().slice(0, 10);
    const time = moment(start).format("HH:mm");
    setNewEvent({ date, time, name: title, phone: patientPhone.split(" ")[1] });
  };
  //   const [appreciation, setAppreciation] = useState("");

  const refreshPage = () => {
    window.location.reload(false);
  };

  //   const rate = (note, reason) => {
  //     fetch(URL, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         motif,
  //         service,
  //         appreciation,
  //         note,
  //         reason,
  //       }),
  //     })
  //       .then((response) => {
  //         handleShow();
  //       })
  //       .catch((err) => console.log(err));
  //   };

  return (
    <>
      <h3>{`${service} / ${doctor.name} `}</h3>
      <div className="container">
        <div>
          <h1>Agenda</h1>
          <div>
            <Calendar
              localizer={localizer}
              events={rdv.map((event) => formattedEvents(event))}
              startAccessor="start"
              endAccessor="end"
              tooltipAccessor="patientPhone"
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={onSelectEvent}
              // onView={() => setShowEventForm(true)}
              style={{ height: 500 }}

              // You can customize other props as needed
            />
            {showEventForm && (
              <EventForm
                show={showEventForm}
                setShow={setShowEventForm}
                onSubmit={handleEventFormSubmit}
                onCancel={() => setShowEventForm(false)}
                defaultValues={newEvent}
              />
            )}
          </div>
        </div>
        <center className="mt-5">
          <button onClick={refreshPage} className="btn btn-primary">
            Retour à la page d'acceuil
          </button>
        </center>
      </div>
    </>
  );
};
