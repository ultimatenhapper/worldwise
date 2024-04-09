import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:8000";
const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};

const CitiesContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknow action");
  }
};
function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }

    fetchCities();
  }, []);

  const fetchCity = async (id) => {
    if (Number(id) === currentCity.id) return;
    
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: error, payload: "There is an error loading city..." });
    }
  };

  const createCity = async (newCity) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: error, payload: "There is an error creating city..." });
    }
  };

  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: error, payload: "There is an error deleting city..." });
    }
  };
  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        fetchCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Using CitiesContext outside of CitiesProvider");

  return context;
};

export { CitiesProvider, useCities };
