import { useEffect, useState } from 'react';
import './Modal.css';
import { DrawCountries } from '../../components/DrawCountries/DrawCountries';
import countriesJsonFile from '../../countries.json';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeSearch } from '../../redux/search/actions';

const Modal = ({ active, setActive }) => {
  const [country, setCountry] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setCountry(countriesJsonFile);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nationality = document.getElementById('find_diaspora').value;
    const country = document.getElementById('find_country').value;
    const params = {
      nationality,
      country,
    };
    dispatch(changeSearch(params));
    navigate('/search');
  };

  return (
    <div
      className={active ? `modal active` : 'modal'}
      onClick={() => setActive(false)}
    >
      <form
        className={active ? `modal__search_form active` : 'modal__search_form'}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="modal__close_btn"
          onClick={() => setActive(false)}
        >
          &times;
        </button>
        <h3>
          Select the diaspora you are interested in and the country in which the
          search will be performed
        </h3>
        <label htmlFor="find_diaspora">Diaspora:</label>
        <select id="find_diaspora">
          <option disabled="disabled">Select a diapora</option>
          <option value="all">All</option>
          {country.map((element, index) => {
            return <DrawCountries key={index} name={element['nationality']} />;
          })}
        </select>
        <label htmlFor="find_country">Country:</label>
        <select id="find_country">
          <option disabled="disabled">Select a country</option>
          <option value="all">All</option>
          {country.map((element, index) => {
            return (
              <DrawCountries key={index} name={element['en_short_name']} />
            );
          })}
        </select>
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export { Modal };
