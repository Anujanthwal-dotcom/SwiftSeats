import React from 'react';

function EditProfileModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <p className="text-gray-600">Profile form goes here</p>
                <button onClick={onClose} className="btn-secondary mt-4">Close</button>
            </div>
        </div>
    );
}
export default EditProfileModal