import useNotesStore from '../store/store';
import { FiSearch } from 'react-icons/fi';

const Sidebar = () => {
    const { notes, search, selectNote, setSearch } = useNotesStore();

    const filteredNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className='w-1/3 bg-gray-100 p-4 shadow-lg'>
            <div className='flex items-center mb-4'>
                <FiSearch className='text-xl mr-2 cursor-pointer' />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full p-2 rounded-lg bg-gray-200 focus:outline-none'
                    placeholder='Search notes...'
                />
            </div>

            <div>
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note, index) => (
                        <div key={index}
                            className='p-2 mb-2 rounded-lg cursor-pointer bg-white shadow-lg hover:bg-gray-200'
                            onClick={() => selectNote(index)}>
                            <div
                                className='w-8 h-8 rounded-full mr-2'
                                style={{ backgroundColor: note.color, border: '1px solid #000' }}
                            />
                            <div
                                className="truncate"
                                dangerouslySetInnerHTML={{ __html: note.text }}
                            />
                        </div>

                    ))
                ) : (
                    <p>No Notes found</p>
                )}
            </div>
        </div >
    )
}

export default Sidebar;
