"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateAppeal = () => {
    const [player, setPlayer] = useState('');
    const [reason, setReason] = useState('');
    const [banDate, setBanDate] = useState('');
    const [appealReason, setAppealReason] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/appeal/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ player, reason, banDate, appealReason }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage('Appeal created successfully!');
            setPlayer('');
            setReason('');
            setBanDate('');
            setAppealReason('');
        } else {
            setMessage(data.message || 'Something went wrong!');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Create Appeal</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="player" className="form-label">Player Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="player"
                        value={player}
                        onChange={(e) => setPlayer(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="reason" className="form-label">Reason for Appeal</label>
                    <select
                        className="form-select"
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    >
                        <option value="">Select a reason</option>
                        <option value="Hacking">Hacking</option>
                        <option value="Inappropriate Username">Inappropriate Username</option>
                        <option value="Cheating">Cheating</option>
                        <option value="Offensive Language">Offensive Language</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="banDate" className="form-label">Ban Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="banDate"
                        value={banDate}
                        onChange={(e) => setBanDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="appealReason" className="form-label">Explanation for Unban</label>
                    <textarea
                        className="form-control"
                        id="appealReason"
                        rows="3"
                        value={appealReason}
                        onChange={(e) => setAppealReason(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Appeal</button>
            </form>
        </div>
    );
};

export default CreateAppeal;
