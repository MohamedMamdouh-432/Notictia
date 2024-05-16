const baseUrl = "http://localhost:3000/notictia";

async function addNote(noteData) {
    const response = await fetch(`${baseUrl}/note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
    });
    return response.json();
}

async function getNotes(noteTitle) {
    let url = `${baseUrl}/notes`;
    if (noteTitle) url += `/?title=${noteTitle}`;
    const response = await fetch(url);
    return response.json();
}

async function getNote(noteTitle) {
    const response = await fetch(`${baseUrl}/note/${noteTitle}`);
    return response.json();
}

async function updateNote(noteTitle, noteData) {
    const response = await fetch(`${baseUrl}/note/${noteTitle}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
    });
    return response.json();
}

async function deleteNote(noteTitle) {
    const response = await fetch(`${baseUrl}/note/${noteTitle}`, {
        method: "DELETE",
    });
    return response.json();
}
