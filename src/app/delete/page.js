"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DeleteAppeal = () => {
    const [appealNumber, setAppealNumber] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleDelete = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/appeal/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ appealNumber }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage('Appeal deleted successfully!');
            setAppealNumber('');
        } else {
            setMessage(data.message || 'Something went wrong!');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Delete Appeal</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleDelete}>
                <div className="mb-3">
                    <label htmlFor="appealNumber" className="form-label">Appeal Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="appealNumber"
                        value={appealNumber}
                        onChange={(e) => setAppealNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-danger">Delete Appeal</button>
            </form>
        </div>
    );
};

export default DeleteAppeal;
