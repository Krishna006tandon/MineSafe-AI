import React, { useState, useMemo } from 'react'; // Import useMemo

const ReportTable: React.FC = () => {
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

  const [filterStatus, setFilterStatus] = useState('All'); // New state for status filter
  const [filterAssignee, setFilterAssignee] = useState('All'); // New state for assignee filter

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

  // Filtered incidents based on filterStatus and filterAssignee
  const filteredIncidents = useMemo(() => {
    return incidents.filter(incident => {
      const statusMatch = filterStatus === 'All' || incident.status === filterStatus;
      const assigneeMatch = filterAssignee === 'All' || incident.assignedTo === filterAssignee;
      return statusMatch && assigneeMatch;
    });
  }, [incidents, filterStatus, filterAssignee]);

  return (
    <div className="report-table-container">
      <h2>Incident Reports</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {/* Status Filter */}
        <label>
          Filter by Status:
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </label>

        {/* Assignee Filter */}
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
              <td>
                <div>
                  {incident.comments.map((comment, index) => (
                    <p key={index} style={{ margin: '0 0 5px 0', fontSize: '0.9em' }}>
                      <span style={{ fontWeight: 'bold', color: '#00aaff' }}>[{comment.timestamp}]</span> {comment.text}
                    </p>
                  ))}
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    <input
                      type="text"
                      value={incident.newComment}
                      onChange={(e) => handleNewCommentChange(incident.id, e.target.value)}
                      placeholder="Add new comment..."
                      style={{ flexGrow: 1, marginRight: '5px', boxSizing: 'border-box' }}
                    />
                    <button onClick={() => addComment(incident.id)}>Add</button>
                  </div>
                </div>
              </td>
              <td>
                <button>Resolve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
