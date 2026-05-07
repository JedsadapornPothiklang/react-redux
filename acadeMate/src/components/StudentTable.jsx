import { useSelector, useDispatch } from 'react-redux';
import { selectAllStudents } from '../features/students/selectors';
import { useState } from 'react';
import EditModal from '../components/EditModal';
import {
deleteStudentAsync,
updateStudentAsync,
} from '../features/students/studentsThunks'; // ← changed import
function StudentTable() {
const students = useSelector(selectAllStudents);
const dispatch = useDispatch();
const [editing, setEditing] = useState(null);
const handleDelete = (id) => {
dispatch(deleteStudentAsync(id)); // ← was: dispatch(deleteStudent(id))
};
const handleEditSave = (updated) => {
dispatch(updateStudentAsync(updated)); // ← was: dispatch(updateStudent(updated))
setEditing(null);
};
return (
<>
<table className="student-table">
<thead><tr><th>#</th><th>Name</th><th>Student ID</th><th>Major</th><th>GPA</th><th>Actions</th></tr></thead>
<tbody>{students.map((student, index) => (
 <tr key={student.id} className={Number(student.gpa) >= 3.8 ? "high-gpa" : ""}>
<td>{index + 1}</td>
<td>{student.name}</td>
<td>{student.studentid || "N/A"}</td> { /* ใส่ || "N/A" เพื่อเช็คว่าถ้าไม่มีข้อมูลให้ขึ้น N/A */ }
<td>{student.major}</td>
<td className="gpa-cell">{Number(student.gpa).toFixed(2)}</td>
<td>
<button className="btn-edit" onClick={() => setEditing(student)}>Edit</button>
<button className="btn-delete" onClick={() => handleDelete(student.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
{editing && (<EditModal student={editing} onSave={handleEditSave} onCancel={() => setEditing(null)} />
)}
</>
);
}
export default StudentTable;