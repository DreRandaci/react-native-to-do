// Creates a new note obj
const createNoteObj = {
    getNoteObj: (id, noteTxt) => {
        var date = new Date();
        let note = {
        'id': id,
        'date': (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(), 
        'note': noteTxt
        }
    return note;
    }
}

export default createNoteObj;