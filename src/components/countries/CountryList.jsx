import Message from "../Message";
import Spinner from "../Spinner";

import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map " />;

  const countries = cities
    .map((city) => ({ country: city.country, emoji: city.emoji }))
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
