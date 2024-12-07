import React, { useState } from 'react'
import ModifyAppointment from './components/modifyAppointment'
import CancelAppointment from './components/cancelAppointment'

export default function App() {
  const [showModify, setShowModify] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  })

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('/api/submit-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(formData), // Use JSON.stringify to send formData
      })

      if (response.ok) {
        alert('Appointment booked successfully!')
      } else {
        const errorDetails = await response.json() // Get error details if any
        console.error('Error:', errorDetails)
        alert('Error booking appointment. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spa Appointment Booking System</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            value={formData.name}
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            onChange={handleChange}
            value={formData.phone}
            name="phone"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
          <select
            name="service"
            onChange={handleChange}
            value={formData.service}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a service</option>
            <option value="massage">Massage</option>
            <option value="facial">Facial</option>
            <option value="manicure">Manicure</option>
            <option value="pedicure">Pedicure</option>
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            onChange={handleChange}
            value={formData.date}
            id="date"
            name="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            onChange={handleChange}
            value={formData.time}
            id="time"
            name="time"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            id="notes"
            onChange={handleChange}
            value={formData.notes}
            name="notes"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Book Appointment
        </button>
      </form>

      <div className="space-x-4 mb-4">
        <button
          onClick={() => setShowModify(true)}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Modify Appointment
        </button>
        <button
          onClick={() => setShowCancel(true)}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cancel Appointment
        </button>
      </div>

      {showModify && (
        <ModifyAppointment
          onClose={() => setShowModify(false)}
        />
      )}

      {showCancel && (
        <CancelAppointment
          onClose={() => setShowCancel(false)}
        />
      )}
    </div>
  )
}
