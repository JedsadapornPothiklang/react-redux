import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudentAsync } from '../features/students/studentsThunks'
const EMPTY_FORM = { name: "", studentId: "", major: "", gpa: "" };
function AddStudentForm() {
const dispatch = useDispatch();
const [form, setForm] = useState(EMPTY_FORM);
// Single handler for ALL inputs via computed property name
function handleChange(e) {
// setForm({ ...form, [e.target.name]: e.target.value });
setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}
const onSubmit = async e => {
e.preventDefault();
await dispatch(addStudentAsync({
...form,
gpa: parseFloat(form.gpa)
}));
setForm(EMPTY_FORM);
};
return (
<form className="add-form" onSubmit={onSubmit}>
<h3>Add New Student</h3>
<div className="form-row">
<input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
<input name="studentId" placeholder="Student ID *" value={form.studentId} onChange={handleChange} required />
<input name="major" placeholder="Major" value={form.major} onChange={handleChange} />
<input name="gpa" placeholder="GPA (0.0–4.0)" value={form.gpa} onChange={handleChange} type="number"
step="0.01"
min="0"
max="4"
/>
<button type="submit" className="btn-primary">
+ Add Student
</button>
</div>
</form>
);
}
export default AddStudentForm;