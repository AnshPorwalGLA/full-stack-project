import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import './styles.css';

const SCREENS = { LIST: 'LIST', FORM: 'FORM', DETAILS: 'DETAILS' };

export default function App() {
  const [students, setStudents] = useState([]);
  const [screen, setScreen] = useState(SCREENS.LIST);
  const [editingStudent, setEditingStudent] = useState(null);
  const [detailsStudent, setDetailsStudent] = useState(null);

  // sidebar actions
  function goHome() {
    setScreen(SCREENS.LIST);
    setEditingStudent(null);
    setDetailsStudent(null);
  }

  return (
    <div className="dashboard-root">
      <Sidebar onNavigate={goHome} onAdd={() => { setEditingStudent(null); setScreen(SCREENS.FORM); }} />

      <div className="dashboard-main">
        <header className="topbar">
          <div className="topbar-left">
            <h1 className="title">Student Result Dashboard</h1>
            <span className="subtitle">Manage students • Add • Edit • View • Delete</span>
          </div>
          <div className="topbar-right">
            <div className="user-pill">Admin</div>
          </div>
        </header>

        <main className="content-area">
          {screen === SCREENS.LIST && (
            <StudentList
              students={students}
              setStudents={setStudents}
              onAdd={() => { setEditingStudent(null); setScreen(SCREENS.FORM); }}
              onEdit={(s) => { setEditingStudent(s); setScreen(SCREENS.FORM); }}
              onView={(s) => { setDetailsStudent(s); setScreen(SCREENS.DETAILS); }}
            />
          )}

          {screen === SCREENS.FORM && (
            <StudentForm editingStudent={editingStudent} backToList={() => setScreen(SCREENS.LIST)} />
          )}

          {screen === SCREENS.DETAILS && (
            <StudentDetails student={detailsStudent} backToList={() => setScreen(SCREENS.LIST)} />
          )}
        </main>

        <footer className="footer">
          {new Date().getFullYear()} Student Result Dashboard 
        </footer>
      </div>
    </div>
  );
}
