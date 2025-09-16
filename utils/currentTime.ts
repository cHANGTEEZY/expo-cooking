const CurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");

  let greeting = "";
  if (hours >= 5 && hours < 12) {
    greeting = "Good morning";
  } else if (hours >= 12 && hours < 17) {
    greeting = "Good afternoon";
  } else if (hours >= 17 && hours < 22) {
    greeting = "Good evening";
  } else {
    greeting = "Good evening";
  }

  // Convert to 12-hour format
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 → 12

  const formattedTime = `${hours}:${minutes} ${suffix}`;

  return { greeting, time: formattedTime };
};

export default CurrentTime;
