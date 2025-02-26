import React from 'react'
import { useStore } from '../store/store'

const Meals = () => {
    const { meals, searchQuery, setMeals, setSearchQuery } = useStore();

    React.useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
                const data = await response.json();
                setMeals(data.meals);
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }

        fetchMeals();
    }, [setMeals]);

    const filteredMeals = meals.filter(meal => meal.strMeal.toLowerCase()
        .includes(searchQuery.toLowerCase()));

    return (
        <div className='min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100'>
            <h1 className='text-4xl font-bold mb-8 text-teal-600'>Seafood Recipes</h1>
            <input
                type="text"
                placeholder="Search for a meal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-[20rem] p-2 mb-4 rounded-lg border border-gray-300'
            />
            <div>
                {filteredMeals.length > 0 ? (
                    filteredMeals.map((meal) => (
                        <div
                            className='bg-white shadow-lg rounded-lg p-4 mb-4 flex flex-col items-center justify-center'
                            key={meal.idMeal}
                        >
                            <h2>{meal.strMeal}</h2>
                            <img
                                className='w-full h-64 object-cover rounded-t-lg mb-4'
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                            />
                        </div>
                    ))
                ) : (
                    <p>No meals found</p>
                )}
            </div>
        </div>
    )
}

export default Meals
