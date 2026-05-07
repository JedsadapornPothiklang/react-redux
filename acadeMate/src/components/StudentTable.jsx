import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent, updateStudent } from "../features/students/studentsSlice";
import { selectAllStudents } from "../features/students/selectors";
import EditModal from "../components/EditModal";
function StudentTable() {
const dispatch = useDispatch();
const allStudents = useSelector(selectAllStudents);
// Local UI state — modal open/close and which student is being edited
const [editing, setEditing] = useState(null); // null = modal closed
function handleDelete(id) {
if (window.confirm("Delete this student?")) {
dispatch(deleteStudent(id));
}
}
function handleEditSave(updatedData) {
dispatch(updateStudent({ ...updatedData, gpa: parseFloat(updatedData.gpa) || 0 }));
setEditing(null); // Close modal after update
}
return (
<>
<table className="student-table">
<thead><tr><th>#</th><th>Name</th><th>Student ID</th><th>Major</th><th>GPA</th><th>Actions</th></tr></thead>
<tbody>{allStudents.map((student, index) => (
<tr key={student.id} className={student.gpa >= 3.8 ? "high-gpa" : ""}>
<td>{index + 1}</td><td>{student.name}</td><td>{student.studentId}</td><td>{student.major}</td>
<td className="gpa-cell">{student.gpa.toFixed(2)}</td>
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