export default function getGreetings() {
  let greeting;

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 4 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 16) {
    greeting = "Good afternoon";
  } else if (currentHour >= 16 && currentHour < 23) {
    greeting = "Good evening";
  } else {
    greeting = `Good night, Time to wrap up and rest`;
  }

  return greeting;
}
