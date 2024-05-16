function fetchNotes(noteTitle) {
    const table = document.getElementById("notes-table");

    const rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--) table.deleteRow(i);

    getNotes(noteTitle)
        .then((notes) => {
            notes.forEach((note) => {
                var row = table.insertRow(1);
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);
                cell0.textContent = note.title;
                cell1.textContent = note.content;
                cell2.textContent = note.updatedDate;
                cell3.innerHTML = `
                    <a href="#"><img src="images/edit.png" style="width: 30px;" /></a>
                    <a onclick="confirmDeleteNote('${note.title}')" href="#"><img src="images/delete.png" style="width: 30px;" /></a>
                `;
            });
        })
        .catch((err) => console.log(err));
}

function searchNotes() {
    const searchTitle = document.getElementById("searchInput").value;
    fetchNotes(searchTitle);
}

function confirmDeleteNote(title) {
    var action = confirm("Are you sure you want to delete this note?");
    if (action == false) return;
    deleteNote(title)
        .then(() => fetchNotes())
        .catch((err) => console.log(err));
}
