import moment from "moment";

export const getRandomColor = () => {
  // Generate random values for red, green, and blue components
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  // Convert the RGB values to hexadecimal format
  var hexR = r.toString(16).padStart(2, "0");
  var hexG = g.toString(16).padStart(2, "0");
  var hexB = b.toString(16).padStart(2, "0");

  // Concatenate the hexadecimal values to form the color code
  var hexColor = "#" + hexR + hexG + hexB;

  return hexColor;
};

export const formattedEvents = (event) => {
  // Parse date and time into a JavaScript Date object
  const eventDate = moment(event.date + " " + event.time, [
    "DD-MM-YYYY HH:mm",
    "DD/MM/YYYY HH:mm",
  ]).toDate();

  return {
    start: eventDate,
    end: moment(eventDate).add(20, "minutes").toDate(), // Assuming events are of 0 duration, adjust as necessary
    title: event.patient.name,
    patientPhone: `Tel: ${event.patient.phone}`, // You can add additional properties as needed
  };
};
