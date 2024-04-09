import Message from "../Message";
import Spinner from "../spinner/Spinner";

import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../../context/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map " />;

  const countries = cities
    .map((city) => ({ country: city.country, emoji: city.emoji }))
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
