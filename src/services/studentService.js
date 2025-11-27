const BASE_URL = "http://localhost:5000/students";

export async function getAllStudents() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch students");
  return await res.json();
}

export async function getStudentById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch student");
  return await res.json();
}

export async function addStudent(student) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  });
  if (!res.ok) throw new Error("Failed to add student");
  return await res.json();
}

export async function updateStudent(id, student) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  });
  if (!res.ok) throw new Error("Failed to update student");
  return await res.json();
}

export async function deleteStudent(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete student");
  return true;
}
