function clearModal() {
    const title = document.getElementById("addTitle");
    const content = document.getElementById("addContent");
    const error = document.getElementById("addError");
    
    title.value = content.value = error.value = "";
}

function openAddModal() {
    const addModal = document.getElementById("addNoteModal");
    const closeButton = document.getElementById("closeAdd");
    const cancelButton = document.getElementById("cancelAddNoteBtn");
    clearModal();
    addModal.style.display = "block";
    closeButton.onclick = () => (addModal.style.display = "none");
    cancelButton.onclick = () => (addModal.style.display = "none");
}

function saveNewNote() {
    const title = document.getElementById("addTitle").value;
    const content = document.getElementById("addContent").value;
    const noteData = {
        title: title,
        content: content,
    };
    addNote(noteData)
        .then((result) => {
            if (result.ok) {
                document.getElementById("addNoteModal").style.display = "none";
                fetchNotes();
            } else {
                result.text().then((err) => {
                    document.getElementById("addError").innerHTML = err;
                });
            }
        })
        .catch((err) => {
            console.log(err);
            document.getElementById("addError").innerHTML = err;
        });
}
