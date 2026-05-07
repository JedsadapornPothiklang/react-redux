import { createAsyncThunk } from '@reduxjs/toolkit';
// แก้ไข BASE ให้เหลือแค่ Domain หลักของ MockAPI
const BASE = 'https://69fc3bdffce564e25917954d.mockapi.io';

export const fetchStudents = createAsyncThunk(
    'students/fetchAll',
    async (_, { rejectWithValue }) => {
        const res = await fetch(`${BASE}/students`);
        if (!res.ok) return rejectWithValue('Failed to fetch');
        return res.json();
    }
);

export const addStudentAsync = createAsyncThunk(
    'students/addOne',
    async (studentData, { rejectWithValue }) => {
     const res = await fetch(`${BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
    });
    if (!res.ok) return rejectWithValue('Failed to add');
    return res.json(); 
    }
);

export const updateStudentAsync = createAsyncThunk(
    'students/updateOne',
    async ({ id, ...changes }, { rejectWithValue }) => {
     const res = await fetch(`${BASE}/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
    });
    if (!res.ok) return rejectWithValue('Failed to update');
    return res.json();
    }
);

export const deleteStudentAsync = createAsyncThunk(
    'students/deleteOne',
    async (id, { rejectWithValue }) => {
     const res = await fetch(`${BASE}/students/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) return rejectWithValue('Failed to delete');
    return id; 
    }
);