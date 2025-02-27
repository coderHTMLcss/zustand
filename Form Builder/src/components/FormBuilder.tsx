import React, { ChangeEvent } from 'react';
import { useStore } from '../store/store';
import FormField from './FormField';

export interface NewField {
    label: string;
    type: "text" | "number" | "password" | "textarea" | "date" | "file";
    value: string;
};
const FormBuilder = () => {
    const { formFields, addField, removeField, updateField, resetFields } = useStore();
    const [newField, setNewField] = React.useState<NewField>({
        label: "",
        type: "text",
        value: "",
    });

    const handleFieldChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewField((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddField = () => {
        addField(newField);
        setNewField({
            label: "",
            type: "text",
            value: "",
        })
    };

    const handleFieldUpdate = (index: number, field: NewField) => {
        updateField(index, field);
    };

    const handleFieldRemove = (index: number) => {
        removeField(index);
    };

    return (
        <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4 text-center'>Form Builder</h1>
            <div className='flex flex-col mb-6'>
                <input
                    type="text"
                    name='label'
                    value={newField.label}
                    placeholder='Field Label'
                    onChange={handleFieldChange}
                    className='border border-gray-300 p-2 rounded-lg mb-2 focus:outline-none
                focus:ring focus:ring-blue-500'
                />

                <select
                    name="type"
                    value={newField.type}
                    onChange={handleFieldChange}
                    className='border border-gray-300 p-2 rounded-lg mb-2 focus:outline-none
                focus:ring focus:ring-blue-500'
                >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="password">Password</option>
                    <option value="textarea">Textarea</option>
                    <option value="date">Date</option>
                    <option value="file">File</option>
                </select>

                <div className='flex justify-between'>
                    <button
                        type="button"
                        onClick={handleAddField}
                        className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
                    >
                        Add Field
                    </button>
                    <button
                        type="button"
                        onClick={resetFields}
                        className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'
                    >
                        Reset Form
                    </button>
                </div>

            </div>

            <form>
                {formFields.map((field, index) => (
                    <FormField
                        key={index}
                        field={field as NewField}
                        index={index}
                        onUpdate={handleFieldUpdate}
                        onRemove={handleFieldRemove}
                    />
                ))}
            </form>

        </div>
    )
}

export default FormBuilder
