import React, { useState } from 'react'

export default function CancelAppointment({ onClose, onCancel }) {
  const [phone, setPhone] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const response = await fetch('/api/cancel-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      })
      
      if (response.ok) {
        alert('Appointment cancelled successfully!')
        onCancel()
        onClose()
      } else {
        alert('Error cancelling appointment. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      // alert('An error occurred. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Cancel Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cancel-phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="cancel-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Cancel Appointment
            </button>
            <button onClick={onClose} className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

