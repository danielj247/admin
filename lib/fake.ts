const FIRST_NAMES = ["Josh", "Emily", "Henry", "Mia", "Oliver", "Amelia", "Jack", "Isabella", "Harry", "Sophia"];

const LAST_NAMES = ["Reed", "Farmer", "Wright", "Jackson", "Walters", "Mason", "Harris", "Smith", "Taylor", "Brown"];

export function fakeAccount() {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
  };
}
