const baseUrl = 'http://localhost:3000/notictia'

async function addNote(noteData) {
    const response = await fetch(`${baseUrl}/note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
    })
    return response
}

async function getNotes(noteTitle) {
    let url = `${baseUrl}/notes`
    if (noteTitle) {
        url += `/?title=${noteTitle}`
    }
    const response = await fetch(url)
    return response.json()
}

async function getNote(noteTitle) {
    let url = `${baseUrl}/note/${noteTitle}`
    const response = await fetch(url)
    return response.json()
}

async function updateNote(noteData) {
    const response = await fetch(`${baseUrl}/note/${noteData.title}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
    })
    return response
}

async function deleteNote(noteTitle) {
    const response = await fetch(`${baseUrl}/note/${noteTitle}`, {
        method: 'DELETE',
    })
    return response
}