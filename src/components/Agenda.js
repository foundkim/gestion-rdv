import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { formattedEvents } from "./utilis";
import "moment/locale/fr";
import { EventForm } from "./CreateEvent";

moment.locale("fr");

const localizer = momentLocalizer(moment);

// //Lien API
const baseUrl = "http://localhost:3001/rdv";

export const Agenda = (props) => {
  const { doctor, service } = props;
  const [rdv, setRdv] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    // Show event creation form when a time slot is selected
    setShowEventForm(true);
    const date = start.toISOString().slice(0, 10);
    const time = moment(start).format("HH:mm");
    setNewEvent({ date, time });
  };

  const handleEventFormSubmit = (eventData, id = "") => {
    // Add the new event to the events list
    setLoading(true);
    const { date, name, time, phone } = eventData;
    console.log("id inside fech===========>", id);
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

    fetch(`${baseUrl}/${id && id}`, {
      method: id ? "PATCH" : "POST",
      body: JSON.stringify(formatedEvent),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRdv([...rdv.filter((elm) => elm.id !== id), data]);
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Une erreur s'est produite lors de l'enregistrement du endez-vous"
        );
      });
    setLoading(false);
    setShowEventForm(false);
  };

  const onSelectEvent = (event) => {
    const { start, title, patientPhone, id } = event;
    setShowEventForm(true);
    const date = start.toISOString().slice(0, 10);
    const time = moment(start).format("HH:mm");
    setNewEvent({
      date,
      time,
      name: title,
      phone: patientPhone.split(" ")[1],
      id,
    });
  };

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

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRdv(data.filter((elm) => elm.doctor.id === doctor.id));
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Une erreur s'est produite lorsde la récuperation des rendez-vous"
        );
      });
    setLoading(false);
  }, [doctor]);

  return (
    <>
      <h3>{`${service} / ${doctor.name} `}</h3>
      <div className="container">
        <div>
          <h1>Agenda</h1>
          <div>
            {!isLoading && (
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
            )}
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
