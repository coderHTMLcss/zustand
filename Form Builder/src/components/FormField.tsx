import { ChangeEvent } from 'react';
import { NewField } from './FormBuilder';

type FormFieldProps = {
    field: NewField;
    index: number;
    onUpdate: (index: number, updatedField: NewField) => void;
    onRemove: (index: number) => void;
};

const FormField = ({ field, index, onUpdate, onRemove }: FormFieldProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onUpdate(index, { ...field, value: e.target.value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);

        const files = e.target.files ? Array.from(e.target.files).map(file => file.name).join(', ') : '';
        onUpdate(index, { ...field, value: files });
    };

    return (
        <div className='mb-4 p-4 border border-gray-300 rounded-lg shadow-lg'>
            <label>{field.label}</label>
            {field.type === 'textarea' ? (
                <textarea
                    value={field.value}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring focus:ring-blue-500'
                />
            ) : field.type === 'file' ? (
                <input type="file" onChange={handleFileChange} />
            ) : (
                <input
                    type={field.type}
                    value={field.value}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring focus:ring-blue-500'
                />
            )}
            <button
                type="button"
                onClick={() => onRemove(index)}
                className='mt-2 p-2 bg-red-500 text-white rounded-lg shadow-md'
            >
                Remove
            </button>
        </div>
    );
};

export default FormField;
