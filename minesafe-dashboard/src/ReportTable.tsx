import React, { useState, useMemo } from 'react';

interface ReportTableProps {
  toggleReportTable: () => void;
}

const ReportTable: React.FC<ReportTableProps> = ({ toggleReportTable }) => {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      date: '2025-09-16',
      location: 'Zone A, Sector 3',
      probability: 'High',
      suggestedAction: 'Evacuate personnel, deploy drone for inspection.',
      status: 'Open',
      assignedTo: 'John Doe',
      comments: [{ text: 'Initial assessment complete. Waiting for drone imagery.', timestamp: '2025-09-16 10:00' }],
      newComment: '',
    },
    {
      id: 2,
      date: '2025-09-15',
      location: 'Zone B, Level 2',
      probability: 'Medium',
      suggestedAction: 'Monitor sensors, restrict heavy machinery.',
      status: 'In Progress',
      assignedTo: 'Jane Smith',
      comments: [{ text: 'Sensors show stable readings. Monitoring continues.', timestamp: '2025-09-15 14:30' }],
      newComment: '',
    },
    {
      id: 3,
      date: '2025-09-14',
      location: 'Zone C, Level 1',
      probability: 'Low',
      suggestedAction: 'Routine inspection.',
      status: 'Resolved',
      assignedTo: 'John Doe',
      comments: [{ text: 'Inspection completed. No issues found.', timestamp: '2025-09-14 11:00' }],
      newComment: '',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAssignee, setFilterAssignee] = useState('All');

  const handleAssignmentChange = (id: number, newAssignee: string) => {
    setIncidents(prevIncidents =>
      prevIncidents.map(incident =>
        incident.id === id ? { ...incident, assignedTo: newAssignee } : incident
      )
    );
  };

  const handleNewCommentChange = (id: number, comment: string) => {
    setIncidents(prevIncidents =>
      prevIncidents.map(incident =>
        incident.id === id ? { ...incident, newComment: comment } : incident
      )
    );
  };

  const addComment = (id: number) => {
    setIncidents(prevIncidents =>
      prevIncidents.map(incident =>
        incident.id === id && incident.newComment.trim() !== ''
          ? {
              ...incident,
              comments: [...incident.comments, { text: incident.newComment, timestamp: new Date().toLocaleString() }],
              newComment: '',
            }
          : incident
      )
    );
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setIncidents(prevIncidents =>
      prevIncidents.map(incident =>
        incident.id === id ? { ...incident, status: newStatus } : incident
      )
    );
  };

  const handleResolve = (id: number) => {
    setIncidents(prevIncidents =>
      prevIncidents.map(incident =>
        incident.id === id ? { ...incident, status: 'Resolved' } : incident
      )
    );
  };

  const filteredIncidents = useMemo(() => {
    return incidents.filter(incident => {
      const statusMatch = filterStatus === 'All' || incident.status === filterStatus;
      const assigneeMatch = filterAssignee === 'All' || incident.assignedTo === filterAssignee;
      return statusMatch && assigneeMatch;
    });
  }, [incidents, filterStatus, filterAssignee]);

  return (
    <div className="report-table-container">
      <button className="close-table-btn" onClick={toggleReportTable}>X</button>
      <h2>Incident Reports</h2>

      <div className="filters-container">
        <label>
          Filter by Status:
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </label>

        <label>
          Filter by Assignee:
          <select value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)}>
            <option value="All">All</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Unassigned">Unassigned</option>
          </select>
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Probability</th>
            <th>Suggested Action</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncidents.map(incident => (
            <tr key={incident.id}>
              <td>{incident.date}</td>
              <td>{incident.location}</td>
              <td>{incident.probability}</td>
              <td>{incident.suggestedAction}</td>
              <td>
                <select
                  value={incident.status}
                  onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
              <td>
                <select
                  value={incident.assignedTo}
                  onChange={(e) => handleAssignmentChange(incident.id, e.target.value)}
                >
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Unassigned">Unassigned</option>
                </select>
              </td>
              <td className="comments-cell">
                <div className="comments-container">
                  {incident.comments.map((comment, index) => (
                    <p key={index} className="comment-text">
                      <span className="comment-timestamp">[{comment.timestamp}]</span> {comment.text}
                    </p>
                  ))}
                </div>
                <div className="add-comment-container">
                  <input
                    type="text"
                    value={incident.newComment}
                    onChange={(e) => handleNewCommentChange(incident.id, e.target.value)}
                    placeholder="Add new comment..."
                  />
                  <button onClick={() => addComment(incident.id)}>Add</button>
                </div>
              </td>
              <td>
                <button onClick={() => handleResolve(incident.id)}>Resolve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;