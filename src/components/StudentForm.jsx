import React, { useState, useEffect } from 'react';
import { addStudent, updateStudent } from '../services/studentService';

export default function StudentForm({ editingStudent, backToList }) {
  const [name, setName] = useState(editingStudent ? editingStudent.name : '');
  const [section, setSection] = useState(editingStudent ? editingStudent.section : '');
  const [marks, setMarks] = useState(editingStudent ? editingStudent.marks : '');
  const [grade, setGrade] = useState(editingStudent ? editingStudent.grade : '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(editingStudent ? editingStudent.name : '');
    setSection(editingStudent ? editingStudent.section : '');
    setMarks(editingStudent ? editingStudent.marks : '');
    setGrade(editingStudent ? editingStudent.grade : '');
  }, [editingStudent]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !section || marks === '' || !grade) { alert('Please fill all fields'); return; }
    const payload = { name: name.trim(), section: section.trim(), marks: Number(marks), grade: grade.trim() };

    try {
      setSaving(true);
      if (editingStudent) {
        await updateStudent(editingStudent.id, payload);
        alert('Student updated. Click Load Students to refresh.');
      } else {
        await addStudent(payload);
        alert('Student added. Click Load Students to refresh.');
      }
      backToList();
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
          <p className="muted">Enter student details below</p>
        </div>
      </div>

      <div className="panel-body">
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            <div className="label">Name</div>
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" />
          </label>

          <label>
            <div className="label">Section</div>
            <input value={section} onChange={(e)=>setSection(e.target.value)} placeholder="Class / Section" />
          </label>

          <label>
            <div className="label">Marks</div>
            <input type="number" value={marks} onChange={(e)=>setMarks(e.target.value)} placeholder="0 - 100" />
          </label>

          <label>
            <div className="label">Grade</div>
            <input value={grade} onChange={(e)=>setGrade(e.target.value)} placeholder="A / B / C" />
          </label>

          <div className="form-actions">
            <button className="btn primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" className="btn ghost" onClick={backToList}>Cancel</button>
          </div>
        </form>
      </div>
    </section>
  );
}
