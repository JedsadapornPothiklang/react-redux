import { useState } from 'react';
function EditModal({ student, onSave, onCancel }) {
// Local copy of student data — what the user edits before saving
const [form, setForm] = useState({ ...student });
const onChange = e =>
setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
return (
<div className="modal-overlay">
<div className="modal">
<h3>Edit Informations</h3>
<input name="name" value={form.name} onChange={onChange} placeholder="Full Name" />
<input name="major" value={form.major} onChange={onChange} placeholder="Major" />
<input name="gpa" value={form.gpa} onChange={onChange} type="number" step="0.01" placeholder="GPA (0.00-4.00)" />
<div className="modal-actions">
<button className="btn-save" onClick={() => onSave(form)}>Save</button>
<button className="btn-cancel" onClick={onCancel}>Cancel</button>
</div>
</div>
</div>
);
}
export default EditModal;