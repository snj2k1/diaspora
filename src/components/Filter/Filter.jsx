import { useEffect, useState } from 'react';
import countriesJsonFile from '../../countries.json';
import { DrawCountries } from '../../components/DrawCountries/DrawCountries';
import styles from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { changeSearch } from '../../redux/search/actions';

const Filter = (props) => {
  const [gender, setGender] = useState(props.data.gender || null);
  const [country, setCountry] = useState(props.data.country);
  const [nationality, setNationality] = useState(props.data.nationality);
  const [minAge, setMinAge] = useState(props.data.minAge || null);
  const [maxAge, setMaxAge] = useState(props.data.maxAge || null);

  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setCountries(countriesJsonFile);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      nationality,
      country,
      gender: gender ? gender : null,
      minAge: minAge ? minAge : null,
      maxAge: maxAge ? maxAge : null,
    };
    dispatch(changeSearch(params));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form_item}>
        <label htmlFor="filter_nationality">Diaspora:</label>
        <select
          id="filter_nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        >
          <option disabled="disabled">Select a nationality...</option>
          <option value="all">All</option>
          {countries.map((element, index) => {
            return (
              <DrawCountries
                key={index}
                name={element['nationality']}
                current={nationality}
              />
            );
          })}
        </select>
      </div>
      <div className={styles.form_item}>
        <label htmlFor="filter_country">Country:</label>
        <select
          id="filter_country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option disabled="disabled">Select a country...</option>
          <option value="all">All</option>
          {countries.map((element, index) => {
            return (
              <DrawCountries
                key={index}
                name={element['en_short_name']}
                current={country}
              />
            );
          })}
        </select>
      </div>
      <div className={styles.form_item}>
        <label htmlFor="filter_gender">Gender:</label>
        <select
          id="filter_gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option disabled="disabled" selected>
            Select a gender...
          </option>
          {gender === 'Male' ? (
            <option value="Male" selected>
              Male
            </option>
          ) : (
            <option value="Male">Male</option>
          )}
          {gender === 'Female' ? (
            <option value="Female" selected>
              Female
            </option>
          ) : (
            <option value="Female">Female</option>
          )}
        </select>
      </div>
      <div className={styles.form_item}>
        <label htmlFor="filter_age">Age:</label>
        <div id="filter_age" className={styles.age}>
          <label htmlFor="filter_minAge">from</label>
          <input
            type="number"
            id="filter_minAge"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
          />
          <label htmlFor="filter_maxAge">to</label>
          <input
            type="number"
            id="filter_maxAge"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
          />
        </div>
      </div>

      <input type="submit" value="SEARCH" />
    </form>
  );
};

export { Filter };
