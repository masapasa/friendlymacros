// src/pages/restaurant.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MealCard } from '../components/MealCard';
import { api } from '../utils/api';
import { mealRouter } from '~/server/api/routers/meals';
import { inferRouterOutputs } from '@trpc/server';

type RouterOutput = inferRouterOutputs<typeof mealRouter>;

export default function Restaurant() {
  const router = useRouter();
  const [meals, setMeals] = useState<RouterOutput['getMeals']>([]);

  useEffect(() => {
    const fetchMeals = async () => {
        const response = await api.query('meal.getMealsByRestaurant', {
            restaurantName: router.query.name,
          });
          
      setMeals(response);
    };
    fetchMeals();
  }, [router.query.name]);

  return (
    <div>
      <h1>Meals from {router.query.name}</h1>
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
}


