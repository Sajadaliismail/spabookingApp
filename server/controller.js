const fs = require('fs').promises;
const path = require('path');
const appointmentsFile = path.join(__dirname, 'appointments.txt');

// Helper to load appointments from the file
const loadAppointmentsFromFile = async () => {
    try {
        const data = await fs.readFile(appointmentsFile, 'utf8');
        return data ? JSON.parse(data) : []; // Return empty array if the file is empty
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(appointmentsFile, JSON.stringify([], null, 2));
            return [];
        }
        console.error('Error loading appointments:', error);
        throw error;
    }
};

// Helper to save appointments to the file
const saveAppointmentsToFile = async (appointments) => {
    try {
        await fs.writeFile(appointmentsFile, JSON.stringify(appointments, null, 2));
    } catch (error) {
        console.error('Error saving appointments:', error);
        throw error;
    }
};

// Validation helpers
const isValidPhoneNumber = (phone) => /^[0-9]{10}$/.test(phone);
const isValidDate = (date) => !isNaN(new Date(date));
const isValidTime = (time) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

// Get an appointment by phone number
const getAppointment = async (req, res) => {
    try {
        const { phone } = req.params;
        const appointments = await loadAppointmentsFromFile();

        const appointment = appointments.find((appt) => appt.phone === phone);
        if (appointment) {
            res.json({ success: true, data: appointment });
        } else {
            res.status(404).json({ success: false, message: 'Appointment not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Modify an appointment by phone number
const modifyAppointment = async (req, res) => {
    try {
        const { phone, name, service, time, date, notes } = req.body;
        console.log(req.body);
        

        let appointments = await loadAppointmentsFromFile();

        const appointmentIndex = appointments.findIndex((appt) => appt.phone === phone);
        if (appointmentIndex !== -1) {
            appointments[appointmentIndex] = {
                phone,
                name: name || appointments[appointmentIndex].name,
                service: service || appointments[appointmentIndex].service,
                time: time || appointments[appointmentIndex].time,
                date: date || appointments[appointmentIndex].date,
                notes: notes || appointments[appointmentIndex].notes,
            };
            await saveAppointmentsToFile(appointments);
            res.json({ success: true, message: 'Appointment modified successfully!' });
        } else {
            res.status(404).json({ success: false, message: 'Appointment not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Cancel an appointment by phone number
const cancelAppointment = async (req, res) => {
    try {
        const { phone } = req.body;

        let appointments = await loadAppointmentsFromFile();

        const newAppointments = appointments.filter((appt) => appt.phone !== phone);

        if (newAppointments.length !== appointments.length) {
            await saveAppointmentsToFile(newAppointments);
            res.json({ success: true, message: 'Appointment canceled successfully!' });
        } else {
            res.status(404).json({ success: false, message: 'Appointment not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Submit a booking (create or update an appointment)
const submitBooking = async (req, res) => {
    console.log(req.body);
    
    try {
        const { name, phone, service, time, date, notes } = req.body;
        console.log(req.body);
        

        if (!name || !phone || !service || !time || !date || !isValidPhoneNumber(phone) || !isValidDate(date) || !isValidTime(time)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        let appointments = await loadAppointmentsFromFile();

        const existingAppointmentIndex = appointments.findIndex((appt) => appt.phone === phone);

        if (existingAppointmentIndex !== -1) {
            // Update existing appointment
            appointments[existingAppointmentIndex] = { name, phone, service, time, date, notes };
            await saveAppointmentsToFile(appointments);
            res.json({ success: true, message: 'Appointment updated successfully!' });
        } else {
            // Create a new appointment
            appointments.push({ name, phone, service, time, date, notes });
            await saveAppointmentsToFile(appointments);
            res.status(201).json({ success: true, message: 'Appointment booked successfully!' });
        }
    } catch (error) {

        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

module.exports = {
    getAppointment,
    modifyAppointment,
    cancelAppointment,
    submitBooking,
};
