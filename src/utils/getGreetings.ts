export function getGreetings() {
  let greeting;

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 0 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17 && currentHour < 23) {
    greeting = "Good evening";
  } else {
    greeting = `Good night, Time to wrap up and rest`;
  }

  return greeting;
}
