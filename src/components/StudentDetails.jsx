import React from 'react';

export default function StudentDetails({ student, backToList }) {
  if (!student) {
    return (
      <section className="panel">
        <div className="panel-header"><h2>No student selected</h2></div>
        <div className="panel-body">
          <button className="btn ghost" onClick={backToList}>Back</button>
        </div>
      </section>
    );
  }

  return (
    <section className="panel detail-panel">
      <div className="panel-header">
        <div>
          <h2>Student Details</h2>
          <p className="muted">Read-only view</p>
        </div>
      </div>

      <div className="panel-body detail-grid">
        <div className="detail-card"><strong>ID</strong><div className="detail-val">{student.id}</div></div>
        <div className="detail-card"><strong>Name</strong><div className="detail-val">{student.name}</div></div>
        <div className="detail-card"><strong>Section</strong><div className="detail-val">{student.section}</div></div>
        <div className="detail-card"><strong>Marks</strong><div className="detail-val">{student.marks}</div></div>
        <div className="detail-card"><strong>Grade</strong><div className="detail-val">{student.grade}</div></div>
      </div>

      <div className="panel-footer">
        <button className="btn ghost" onClick={backToList}>Back</button>
      </div>
    </section>
  );
}
