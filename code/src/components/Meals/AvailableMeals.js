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

  // My code
  // useEffect(() => {
  //   fetch("https://react-http-b5f83-default-rtdb.firebaseio.com/meals.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const newMeals = [];

  // // we need to do this specifically because of the Firebase structure
  // // which stores as an object array,
  // // map can only be used for arrays so we need to extract it with this
  // // for in loop.
  //       for (const key in data) {
  //         newMeals.push({
  //           id: key,
  //           name: data[key].name,
  //           description: data[key].description,
  //           price: data[key].price,
  //         });
  //       }
  //       setMeals(newMeals);
  //     });
  // }, []);

  // useEffect can't directly use an async function
  // make sure this runs only once with an empty dependency
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-b5f83-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals();
  }, []);

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
