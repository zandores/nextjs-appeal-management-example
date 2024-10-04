"use client";

import { useState, useEffect } from "react";

export default function ReviewedAppealsPage() {
    const [modalContent, setModalContent] = useState({
        player: '',
        reason: '',
        banDate: '',
        appealDate: '',
        appealReason: '',
        appealNumber: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [appealsData, setAppealsData] = useState([]);

    useEffect(() => {
        // Fetch the reviewed appeals data from the API
        const fetchAppealsData = async () => {
            try {
                const response = await fetch('/api/list/reviewed');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAppealsData(data); // Assuming the API returns an array of appeals
            } catch (error) {
                console.error('Error fetching appeals data:', error);
            }
        };

        fetchAppealsData();
    }, []);

    // Filter appeals based on the search query
    const filteredAppeals = appealsData.filter((appeal) => {
        const appealNumberWithHash = `#${appeal.appealNumber}`;
        return (
            appeal.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
            appeal.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
            appealNumberWithHash.includes(searchQuery)
        );
    });

    // Sort the filtered appeals by appealNumber
    const sortedAppeals = filteredAppeals.sort((a, b) => {
        return Number(a.appealNumber) - Number(b.appealNumber);
    });

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
        }, 300);
    };

    const showModal = (player, reason, banDate, appealDate, appealReason, appealNumber) => {
        setModalContent({ player, reason, banDate, appealDate, appealReason, appealNumber });
        setIsModalOpen(true);
    };

    return (
        <div className="main-content" style={{ padding: "20px" }}>
            <div className="mb-4">
                <h1 className="text-primary">Reviewed Appeals</h1>
            </div>

            <div className="task-controls d-flex justify-content-between mb-4">
                <input
                    type="text"
                    id="searchInput"
                    className="form-control"
                    placeholder="Search"
                    style={{ width: "300px" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="task-list bg-white p-4 rounded shadow-sm">
                {sortedAppeals.length > 0 ? (
                    sortedAppeals.map((appeal, index) => (
                        <div key={index} className="task-item d-flex justify-content-between align-items-center border-bottom py-3">
                            <div className="task-icon d-flex align-items-center justify-content-center bg-primary text-white rounded-circle" style={{ width: "50px", height: "50px" }}>
                                P{index + 1}
                            </div>
                            <div className="task-details flex-fill px-3">
                                <h3 className="text-primary m-0 mb-1">Appeal Request #{appeal.appealNumber}</h3>
                                <p className="mb-1"><strong>From:</strong> {appeal.player}</p>
                                <p className="mb-1"><strong>Reason:</strong> {appeal.reason}</p>
                                <p className="mb-1"><strong>Ban Date:</strong> {appeal.banDate}</p>
                                <p className="mb-1"><strong>Appeal Sent:</strong> {appeal.appealDate}</p>
                            </div>
                            <div className="task-process text-end text-muted">
                                <p className="mb-1"><strong>Status:</strong> {appeal.status}</p>
                                <p className="mb-1"><strong>Reviewed Date:</strong> {appeal.reviewedDate}</p>
                                <p className="mb-1"><strong>Reviewed By:</strong> {appeal.reviewedBy}</p>
                            </div>
                            <div className="task-actions">
                                <button className="btn btn-success ms-3"
                                    onClick={() => showModal(
                                        appeal.player,
                                        appeal.reason,
                                        appeal.banDate,
                                        appeal.appealDate,
                                        appeal.appealReason,
                                        appeal.appealNumber
                                    )}>
                                    View
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No appeals match your search criteria.</p>
                )}
            </div>

            {isModalOpen && (
                <div className={`modal-backdrop fade ${isClosing ? 'closing' : 'show'}`} style={{ zIndex: 1040 }}></div>
            )}

            {isModalOpen && (
                <div className={`modal fade ${isClosing ? 'closing' : 'show'}`} style={{ display: 'block', zIndex: 1050 }} id="appealModal" tabIndex="-1" aria-labelledby="appealModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="appealModalLabel">Appeal Review</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Appeal Number:</strong> #{modalContent.appealNumber}</p>
                                <p><strong>Player:</strong> {modalContent.player}</p>
                                <p><strong>Reason for Ban:</strong> {modalContent.reason}</p>
                                <p><strong>Ban Date:</strong> {modalContent.banDate}</p>
                                <p><strong>Appeal Sent:</strong> {modalContent.appealDate}</p>
                                <p><strong>Reason for Appeal:</strong></p>
                                <p>{modalContent.appealReason}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
