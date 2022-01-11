import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  // we need state because we need to refresh the component once the data loads
  const [meals, setMeals] = useState([]);
  // you can set this to true on default since it will be loading on start anyways
  const [isLoading, setIsLoading] = useState(false);
  // no initial error value
  const [httpError, setHttpError] = useState(null);

  // My code

  // useEffect(() => {
  //   setIsLoading(true);

  //   fetch("https://react-http-b5f83-default-rtdb.firebaseio.com/meals")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const newMeals = [];

  //       for (const key in data) {
  //         newMeals.push({
  //           id: key,
  //           name: data[key].name,
  //           description: data[key].description,
  //           price: data[key].price,
  //         });
  //       }
  //       setMeals(newMeals);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       // must do error.message for string since error is an object
  //        setIsLoading(false);
  //       setHttpError(error.message);
  //     });
  // }, []);

  // useEffect can't directly use an async function
  // make sure this runs only once with an empty dependency
  useEffect(() => {
    setIsLoading(true);

    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-b5f83-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      // we need to do this specifically because of the Firebase structure
      // which stores as an object array,
      // map can only be used for arrays so we need to extract it with this
      // for in loop.
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    // the thrown error can be caught in the parameter of the catch()
    // since the try catch needs to be an async await it's just easier to add .catch
    // .then
    // try {
    //   fetchMeals();
    // } catch (error) {
    //   setIsLoading(false);
    //   setHttpError(error.message);
    // }

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  // my code
  // const mealsList = meals.map((meal) => (
  //   <MealItem
  //     key={meal.id}
  //     id={meal.id}
  //     name={meal.name}
  //     description={meal.description}
  //     price={meal.price}
  //   />
  // ));

  // return (
  //   <section className={classes.meals}>
  //     {httpError && <p>{httpError}</p>}
  //     <Card>{isLoading ? <p>Loading...</p> : <ul>{mealsList}</ul>}</Card>
  //   </section>
  // );

  // if it's loading this just returns this jsx instead of the other one
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
