import './App.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StudentTable from './components/StudentTable';
import GpaSummary from './components/GpaSummary';
import AddStudentForm from './components/AddStudentForm';
import { addStudent, deleteStudent, updateStudent } from './features/students/studentsSlice';

function App() {
  const students = useSelector((state) => state.students.list);
  const dispatch = useDispatch();
  
  // State สำหรับจัดการการแก้ไข
  const [editingStudent, setEditingStudent] = useState(null);

  const handleAddOrUpdate = (studentData) => {
    if (editingStudent) {
      dispatch(updateStudent(studentData));
      setEditingStudent(null);
    } else {
      dispatch(addStudent(studentData));
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate — Student Management</h1>
      </header>
      <main className="app-main">
        <GpaSummary students={students} />
        <AddStudentForm 
          onAddStudent={handleAddOrUpdate} 
          editingStudent={editingStudent}
          onCancelEdit={() => setEditingStudent(null)}
        />
        <StudentTable 
          students={students} 
          onDelete={(id) => dispatch(deleteStudent(id))}
          onEdit={(student) => setEditingStudent(student)}
        />
      </main>
    </div>
  );
}
export default App;