import { useStore } from '../store/store'
const PasswordGenerator = () => {
    const {
        length,
        setLength,
        includeNumbers,
        toggleNumbers,
        includeSymbols,
        toggleSymbols,
        includeUppercase,
        toggleUppercase,
        includeLowercase,
        toggleLowercase,
        generatedPassword,
        generatePassword
    } = useStore();

    return (
        <div className='w-[40rem] mx-auto p-8 bg-white rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-4'>Password Generator</h1>
            <div className='flex flex-col gap-4'>
                <div>
                    <label htmlFor="length" className='block text-sm font-medium text-gray-700'>Password Length</label>
                    <input
                        type="number"
                        id="length"
                        className='mt-1 block w-full px-3 py-2 border
                             border-gray-300 rounded-md shadow-sm focus:outline-none
                              focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                    />
                </div>
                <div className='flex items-center'>
                    <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={toggleNumbers}
                    />
                    <label className='ml-2 text-sm'>Include Numbers</label>
                </div>
                <div className='flex items-center'>
                    <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={toggleSymbols}
                    />
                    <label className='ml-2 text-sm'>Include Symbols</label>
                </div>
                <div className='flex items-center'>
                    <input
                        type="checkbox"
                        checked={includeUppercase}
                        onChange={toggleUppercase}
                    />
                    <label className='ml-2 text-sm'>Include Capitalize Letters</label>
                </div>
                <div className='flex items-center'>
                    <input
                        type="checkbox"
                        checked={includeLowercase}
                        onChange={toggleLowercase}
                    />
                    <label className='ml-2 text-sm'>Include Lowercase Letters</label>
                </div>

                <button onClick={generatePassword} className='bg-indigo-500 text-white px-4 py-2 rounded-md'>
                    Generate Password
                </button>
                {generatedPassword && (
                    <div className='mt-4 p-2 bg-gray-100 rounded-lg'>
                        <p className='text-lg break-all'>{generatedPassword}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PasswordGenerator
