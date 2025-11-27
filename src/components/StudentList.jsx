import React, { useState } from 'react';
import { getAllStudents, deleteStudent } from '../services/studentService';

export default function StudentList({ students, setStudents, onAdd, onEdit, onView }) {
  const [loading, setLoading] = useState(false);

  async function handleLoad() {
    try {
      setLoading(true);
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      alert('Error loading students: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this student?')) return;
    try {
      await deleteStudent(id);
      alert('Student deleted. Click Load Students to refresh.');
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Students</h2>
          <p className="muted">Manage and review student results</p>
        </div>
        <div className="panel-actions">
          <button className="btn ghost" onClick={handleLoad} disabled={loading}>{loading ? 'Loading...' : 'Load Students'}</button>
          <button className="btn primary" onClick={onAdd}>Add Student</button>
        </div>
      </div>

      <div className="panel-body">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Section</th><th>Marks</th><th>Grade</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students && students.length > 0 ? (
                students.map(s => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td className="name-col">{s.name}</td>
                    <td>{s.section}</td>
                    <td>{s.marks}</td>
                    <td><span className={`grade-badge grade-${(s.grade||'').toLowerCase()}`}>{s.grade}</span></td>
                    <td className="actions">
                      <button className="btn small" onClick={() => onView(s)}>View</button>
                      <button className="btn small" onClick={() => onEdit(s)}>Edit</button>
                      <button className="btn small danger" onClick={() => handleDelete(s.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="empty">No students loaded. Click <strong>Load Students</strong>.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
