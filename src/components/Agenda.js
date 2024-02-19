import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { formattedEvents } from "./utilis";

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
    setNewEvent({ start, end });
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
              style={{ height: 500 }}

              // You can customize other props as needed
            />
            {showEventForm && (
              <EventForm
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

const EventForm = ({ onSubmit, onCancel, defaultValues }) => {
  const [formData, setFormData] = useState(defaultValues || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nom du patient:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Téléphone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
          />
        </div>

        {/* Additional form fields for event details */}
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
