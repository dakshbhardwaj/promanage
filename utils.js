import { ProficiencyRating } from "./constants";

export function getRatingFromProficiency(proficiency) {
  console.log(proficiency);
  for (const key in ProficiencyRating) {
    console.log(key);
    if (ProficiencyRating.hasOwnProperty(key)) {
      console.log(ProficiencyRating[key].value);
      if (ProficiencyRating[key].value === proficiency) {
        return parseInt(key); // Convert the key to a number if needed
      }
    }
  }
  return 1;
}
