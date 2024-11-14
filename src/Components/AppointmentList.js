import React, { useState } from "react";

const checkUrgency = (description) => {
    // List of urgent and medium keywords
    if (!description || typeof description !== "string") {
        return "low";
    }

    const urgentKeywords = ['ASAP', 'emergency', 'urgent', 'immediately', 'now'];
    const mediumKeywords = ['soon', 'preferably', 'later', 'within a few days', 'fast', 'done'];

    // Convert the description to lowercase for case-insensitive comparison
    const lowerCaseDescription = description.toLowerCase();

    // Check for urgent keywords
    const containsUrgent = urgentKeywords.some(keyword => lowerCaseDescription.includes(keyword.toLowerCase()));

    // Check for medium keywords
    const containsMedium = mediumKeywords.some(keyword => lowerCaseDescription.includes(keyword.toLowerCase()));

    // Return the result based on keyword matching
    if (containsUrgent) {
        return 'urgent';
    }
    if (containsMedium) {
        return 'medium';
    }
    return 'low';  // If no keywords are found, assume low urgency
};

const AppointmentList = ({
    appointments,
    deleteAppointment,
    editAppointment,
    clearAppointments,
}) => {
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [editedDate, setEditedDate] = useState("");
    const [editedDescription, setEditedDescription] = useState("");

    const handleEdit = (index) => {
        setEditedIndex(index);
        setEditedName(appointments[index].name);
        setEditedDate(appointments[index].date);
        setEditedDescription(appointments[index].description);
    };

    const handleSaveEdit = (index) => {
        editAppointment(index, editedName, editedDate);
        setEditedIndex(null);
        setEditedName("");
        setEditedDescription("");
    };

    const handleCancelEdit = () => {
        setEditedIndex(null);
        setEditedName("");
        setEditedDescription("");
    };

    const urgencyStyles = {
        urgent: { backgroundColor: "#ff6b6b" },
        medium: { backgroundColor: "#ffbb33" },
        low: { backgroundColor: "#4caf50" },
    };

    return (
        <div className="container">
            <h1>Appointment List</h1>
            <table id="list">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => {
                        const urgencyLevel = checkUrgency(appointment.description);

                        return (
                            <tr key={index} style={urgencyStyles[urgencyLevel]}>
                                <td>{index + 1}</td>
                                <td>
                                    {editedIndex === index ? (
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) =>
                                                setEditedName(e.target.value)
                                            }
                                        />
                                    ) : (
                                        appointment.name
                                    )}
                                </td>
                                <td>
                                    {editedIndex === index ? (
                                        <input
                                            type="date"
                                            value={editedDate}
                                            onChange={(e) =>
                                                setEditedDate(e.target.value)
                                            }
                                        />
                                    ) : (
                                        appointment.date
                                    )}
                                </td>
                                <td>
                                    {editedIndex === index ? (
                                        <input
                                            type="text"
                                            value={editedDescription}
                                            onChange={(e) =>
                                                setEditedDescription(e.target.value)
                                            }
                                        />
                                    ) : (
                                        appointment.description
                                    )}
                                </td>
                                <td>
                                    {editedIndex === index ? (
                                        <>
                                            <button onClick={() => handleSaveEdit(index)}>
                                                Save
                                            </button>
                                            <button onClick={handleCancelEdit}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(index)}>
                                                Edit
                                            </button>
                                            <button onClick={() => deleteAppointment(index)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={clearAppointments}>Clear All Appointments</button>
        </div>
    );
};

export default AppointmentList;
