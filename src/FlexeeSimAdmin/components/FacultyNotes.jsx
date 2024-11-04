import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MyContext from '../../Components/ContextApi/MyContext';

const NotesComponent = () => {
    const { api } = useContext(MyContext);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [filterPrivate, setFilterPrivate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showAddNote, setShowAddNote] = useState(false);
    const [firms, setFirms] = useState([]);
    const [selectedFirm, setSelectedFirm] = useState('');
    const [firmFilter, setFirmFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedNotes, setSelectedNotes] = useState([]); // For multi-select delete

    const course = JSON.parse(localStorage.getItem("SelectedCourse")) || {};

    useEffect(() => {
        fetchFirms();
        fetchNotes();
    }, []);

    const fetchFirms = async () => {
        try {
            const response = await axios.get(`${api}/get-firms/${course.passcode}/`);
            setFirms(response.data);
            if (response.data.length > 0) {
                setSelectedFirm('All');
                setFirmFilter('');
            }
        } catch (error) {
            console.error("Error fetching firms:", error);
        }
    };

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${api}/facultynotes/`);
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
        setLoading(false);
    };

    const addNote = async () => {
        if (newNote.trim() === '' || !selectedFirm) return;
        try {
            const payload = {
                note: newNote,
                simulation_id: course.simulation_id,
                quarter: course.quarter,
                firm_key: selectedFirm,
                is_private: isPrivate,
                date_time: new Date().toISOString(),
            };
            await axios.post(`${api}/facultynotes/create/`, payload);
            setNewNote('');
            setIsPrivate(false);
            setShowAddNote(false);
            fetchNotes();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const deleteNote = async (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await axios.delete(`${api}/facultynotes/${id}/`);
                fetchNotes();
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    // Multi-select delete handler
    const deleteSelectedNotes = async () => {
        if (window.confirm('Are you sure you want to delete the selected notes?')) {
            try {
                await Promise.all(selectedNotes.map(id => axios.delete(`${api}/facultynotes/${id}/`)));
                setSelectedNotes([]); // Clear selected notes
                fetchNotes(); // Refresh notes
            } catch (error) {
                console.error('Error deleting selected notes:', error);
            }
        }
    };

    // Toggle selection of a note
    const toggleSelectNote = (id) => {
        setSelectedNotes(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(noteId => noteId !== id) // Unselect if already selected
                : [...prevSelected, id] // Select if not already selected
        );
    };

    const filteredNotes = notes
        .filter(note => {
            return (
                (filterPrivate ? note.is_private : true) &&
                (searchTerm === '' || note.note.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (firmFilter === '' || note.firm_key === firmFilter)
            );
        })
        .sort((a, b) => new Date(b.date_time) - new Date(a.date_time));

    const formatDateTimeUS = isoDateString => {
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleDateString('en-US');
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        return `${formattedDate} | ${formattedTime}`;
    };

    return (
        <div className="container  m-auto w-[94%] p-4 border-2 border-gray-400 border-opacity-50 rounded-lg">
            <div className="flex justify-between items-center mb-4 ">
                <h1 className="text-2xl font-bold">Notes</h1>
                <button
                    onClick={() => setShowAddNote(!showAddNote)}
                    className="border-2 border-red-500 text-red-500 px-4 py-2 w-48 rounded-full hover:bg-gray-100"
                >
                    {showAddNote ? 'Cancel' : 'Add Note'}
                </button>
            </div>

            {showAddNote && (
                <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Add Note</h2>
                    <textarea
                        value={newNote}
                        onChange={e => setNewNote(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        placeholder="Enter your note here"
                    />
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="firm">Select Team</label>
                        <select
                            id="firm"
                            value={selectedFirm}
                            onChange={e => setSelectedFirm(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="All">All</option>
                            {firms.map(firm => (
                                <option key={firm.firm_key} value={firm.firm_key}>{firm.firm_key}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <label className="mr-2">Private:</label>
                            <input
                                type="radio"
                                checked={isPrivate}
                                onChange={() => setIsPrivate(true)}
                                className="mr-2"
                            />
                            <label className="mr-2">Public:</label>
                            <input
                                type="radio"
                                checked={!isPrivate}
                                onChange={() => setIsPrivate(false)}
                                className="mr-2"
                            />
                        </div>
                        <button
                            onClick={addNote}
                            className="rounded-full border-2 border-red-600 text-red-500 w-48  px-4 py-2 rounded hover:bg-gray-100"
                        >
                            Add Note
                        </button>
                    </div>
                </div>
            )}

            {/* Multi-select delete button */}
            {selectedNotes.length > 0 && (
                <div className="mb-4">
                    <button
                        onClick={deleteSelectedNotes}
                        className="bg-red-500 text-white px-4 py-2 rounded-full"
                    >
                        Delete Selected ({selectedNotes.length})
                    </button>
                </div>
            )}

            <div className="flex justify-between items-center mb-4 ">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="border border-gray-500 px-4 py-[6px] rounded-full "
                    />
                    <select
                        value={firmFilter}
                        onChange={e => setFirmFilter(e.target.value)}
                        className="border border-gray-500  px-4 py-2 rounded-full"
                    >
                        <option value="">All Firms</option>
                        {firms.map(firm => (
                            <option key={firm.firm_key} value={firm.firm_key}>{firm.firm_key}</option>
                        ))}
                    </select> 
                    <label className="mr-2">  Private Only</label>
                    <input
                        type="checkbox"
                        checked={filterPrivate}
                        onChange={() => setFilterPrivate(!filterPrivate)}
                        className="form-checkbox h-5 w-5 text-red-500"
                    />
                </div>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note, index) => (
                            <div key={note.id} className="bg-white p-4 border-b-2 border-gray-300">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={selectedNotes.includes(note.id)}
                                            onChange={() => toggleSelectNote(note.id)}
                                            className="mr-2"
                                        />
                                        <span className="text-gray-500">{`0${index + 1}`} - </span>
                                        <span className="text-gray-500 ml-0">{formatDateTimeUS(note.date_time)}</span>
                                        <span className="text-gray-500 ml-2">{`Team: ${note.firm_key}`}</span>
                                    </div>
                                    <button
                                        onClick={() => deleteNote(note.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <i className='fa fa-trash'></i>
                                    </button>
                                </div>
                                <p className="font-semibold">{note.note}</p>
                                <p className="text-gray-500">{note.is_private ? 'Private' : 'Public'}</p>
                            </div>
                        ))
                    ) : (
                        <div>No notes available.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotesComponent;