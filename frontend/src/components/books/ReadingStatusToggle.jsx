import React from 'react';
import BrutalButton from '../ui/BrutalButton';

const ReadingStatusToggle = ({ currentStatus, onStatusChange }) => {
  const statuses = ['TO READ', 'READING', 'COMPLETED'];
  
  return (
    <div className="d-flex flex-wrap gap-2 mt-3">
      {statuses.map((status) => (
        <BrutalButton
          key={status}
          variant={currentStatus === status ? 'accent' : 'secondary'}
          onClick={() => onStatusChange(status)}
          className="px-3 py-2 fs-6"
        >
          {status}
        </BrutalButton>
      ))}
    </div>
  );
};

export default ReadingStatusToggle;
