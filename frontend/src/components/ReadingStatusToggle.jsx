import React from 'react';

const ReadingStatusToggle = ({ currentStatus, onStatusChange }) => {
  const statuses = ['TO READ', 'READING', 'COMPLETED'];
  
  return (
    <div className="d-flex flex-wrap gap-2 mt-3">
      {statuses.map((status) => (
        <button
          key={status}
          className={`brutal-btn sharp-corners ${
            currentStatus === status ? 'brutal-btn-accent' : 'brutal-btn-secondary'
          }`}
          onClick={() => onStatusChange(status)}
          style={{ fontSize: '0.7rem' }}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default ReadingStatusToggle;
