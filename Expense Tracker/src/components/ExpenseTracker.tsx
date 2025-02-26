import React from 'react';
import { useStore } from '../store/store';

type FormData = {
    description: string;
    amount: number | '';
}
const ExpenseTracker = () => {
    const { expenses, addExpense, deleteExpense } = useStore();
    const [formData, setFormData] = React.useState<FormData>({
        description: "",
        amount: '',
    });

    const handleAddExpense = () => {
        if (
            formData.description === "" ||
            formData.amount === ''
        ) return;

        addExpense({
            id: Date.now(),
            description: formData.description,
            amount: formData.amount,
        });

        setFormData({
            description: "",
            amount: '',
        });
    };

    const totalAmount = () => {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2);
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r 
        from-green-300 to-blue-300'>
            <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-lg'>
                <h1 className='text-2xl text-teal-500 font-bold text-center mb-4'>
                    Expense Tracker
                </h1>
                <div className='space-y-4 mb-6'>
                    <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder='Expense Description'
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                        focus:outline-none focus:border-teal-500 transition duration-200'
                    />
                    <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({
                            ...formData, amount: e.target.value === '' ?
                                "" : Number(e.target.value)
                        })}
                        placeholder='Expense Amount'
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg 
                        focus:outline-none focus:border-teal-500 transition duration-200'
                    />
                    <button
                        onClick={handleAddExpense}
                        className="bg-teal-500 text-white w-full px-4 py-2 rounded-lg hover:bg-teal-600
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        Add Expense
                    </button>
                </div>
                <ul className="space-y-4 mb-6">
                    {expenses.map((expense) => (
                        <li
                            key={expense.id}
                            className="flex justify-between items-center bg-teal-100 p-4 rounded-lg shadow-sm"
                        >
                            <span className="text-gray-700">
                                {expense.description}: ${expense.amount.toFixed(2)}
                            </span>
                            <button
                                onClick={() => deleteExpense(expense.id)}
                                className="bg-red-300 text-white px-3 py-1 rounded-lg
                                 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-teal-800">
                        Total Expense: $
                        {totalAmount()}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default ExpenseTracker;
