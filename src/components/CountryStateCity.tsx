import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

interface CountryStateCityProps {
  values: Record<string, any>;
  setFieldValue: (field: string, value: any) => void;
  countryField?: string;
  stateField?: string;
  cityField?: string;
}

const CountryStateCity: React.FC<CountryStateCityProps> = ({
  values,
  setFieldValue,
  countryField = "country",
  stateField = "state",
  cityField = "city",
}) => {
  const [countries, setCountries] = useState(
    Country.getAllCountries()
  );

  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    if (!values[countryField]) {
      setStates([]);
      setCities([]);
      return;
    }

    const selectedCountry = countries.find(
      (country) => country.name === values[countryField]
    );

    if (selectedCountry) {
      const stateList = State.getStatesOfCountry(
        selectedCountry.isoCode
      );

      setStates(stateList);
    }
  }, [values[countryField], countries]);

  useEffect(() => {
    if (!values[countryField] || !values[stateField]) {
      setCities([]);
      return;
    }

    const selectedCountry = countries.find(
      (country) => country.name === values[countryField]
    );

    const selectedState = states.find(
      (state) => state.name === values[stateField]
    );

    if (selectedCountry && selectedState) {
      const cityList = City.getCitiesOfState(
        selectedCountry.isoCode,
        selectedState.isoCode
      );

      setCities(cityList);
    }
  }, [
    values[countryField],
    values[stateField],
    countries,
    states,
  ]);

  return (
    <div className="row mt-2">
      {/* Country */}
      <div className="col-md-6 mb-3">
        {/* <label className="form-label">Country</label> */}

        <select
          className="form-select"
          value={values[countryField] || ""}
          onChange={(e) => {
            setFieldValue(countryField, e.target.value);
            setFieldValue(stateField, "");
            setFieldValue(cityField, "");
          }}
        >
          <option value="">Select Country</option>

          {countries.map((country) => (
            <option
              key={country.isoCode}
              value={country.name}
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      <div className="col-md-6 mb-3">
        {/* <label className="form-label">State</label> */}

        <select
          className="form-select"
          value={values[stateField] || ""}
          disabled={!values[countryField]}
          onChange={(e) => {
            setFieldValue(stateField, e.target.value);
            setFieldValue(cityField, "");
          }}
        >
          <option value="">Select State</option>

          {states.map((state) => (
            <option
              key={state.isoCode}
              value={state.name}
            >
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="col-md-6 mb-3">
        {/* <label className="form-label">City</label> */}

        <select
          className="form-select"
          value={values[cityField] || ""}
          disabled={!values[stateField]}
          onChange={(e) =>
            setFieldValue(cityField, e.target.value)
          }
        >
          <option value="">Select City</option>

          {cities.map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CountryStateCity;