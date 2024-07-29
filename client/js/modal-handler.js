function openAddModal() {
    var modal = document.getElementById('addNoteModal')
    var closeSpan = document.getElementById('closeAdd')
    var cancelButton = document.getElementById('cancelAddNoteBtn')

    clearAddModal()
    modal.style.display = 'block'
    closeSpan.onclick = () => {
        modal.style.display = 'none'
    }

    cancelButton.onclick = () => {
        modal.style.display = 'none'
    }
}

function clearAddModal() {
    document.getElementById('addTitle').value = ''
    document.getElementById('addContent').value = ''
    document.getElementById('addError').innerHTML = ''
}

function saveNewNote() {
    const titleStr = document.getElementById('addTitle').value
    const contentStr = document.getElementById('addContent').value
    const noteData = { title: titleStr, content: contentStr }
    addNote(noteData)
        .then((response) => {
            if (response.ok) {
                var modal = document.getElementById('addNoteModal')
                modal.style.display = 'none'
                response.json().then((json) => {
                    var newNoteId = json['_id']
                    updateNotesTable(newNoteId)
                })
            } else {
                response.text().then((error) => {
                    document.getElementById('addError').innerHTML = error
                })
            }
        })
        .catch((error) => {
            console.log(error)
            document.getElementById('addError').innerHTML = error
        })
}

function openEditModal(noteTitle) {
    var modal = document.getElementById('editNoteModal')
    var closeSpan = document.getElementById('closeEdit')
    var cancelButton = document.getElementById('cancelEditNoteBtn')

    clearAddModal()

    modal.style.display = 'block'

    closeSpan.onclick = () => {
        modal.style.display = 'none'
    }

    cancelButton.onclick = () => {
        modal.style.display = 'none'
    }

    loadNoteData(noteTitle)
}

function loadNoteData(noteTitle) {
    var modal = document.getElementById('editNoteModal')
    var noteIdAttribute = document.createAttribute('noteid')
    noteIdAttribute.value = noteTitle
    modal.setAttributeNode(noteIdAttribute)
    getNote(noteTitle).then((data) => {
        document.getElementById('editTitle').value = data['title']
        document.getElementById('editContent').value = data['content']
    })
}

function saveEditNote() {
    const titleStr = document.getElementById('editTitle').value
    const contentStr = document.getElementById('editContent').value
    const noteData = { title: titleStr, content: contentStr }
    updateNote(noteData)
        .then((response) => {
            if (response.ok) {
                var modal = document.getElementById('editNoteModal')
                modal.style.display = 'none'
                updateNotesTable(undefined)
            } else {
                response.text().then((error) => {
                    document.getElementById('editError').innerHTML = error
                })
            }
        })
        .catch((error) => {
            document.getElementById('editError').innerHTML = error
        })
}
