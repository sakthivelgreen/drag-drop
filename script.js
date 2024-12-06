import { _var } from "./variables.js";

let files = [];

main(); // main Function call

function main() { // Main Function Declaration
    Events()
}

function Events() {
    _var.drop_zone().addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        _var.file_input().click();
    });
    _var.drop_zone().addEventListener('dragover', (e) => {
        e.preventDefault();
    })
    _var.drop_zone().addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach(item => {
                if (item.kind == 'file') {
                    let file = item.getAsFile();
                    files.push(file);
                }
            });
            enable_file_options();
            e.dataTransfer.items.clear();
        }
    })
    _var.file_input().addEventListener('change', (e) => {
        files = e.target.files;
        enable_file_options();
    })
    _var.delete_file().addEventListener('click', (e) => {
        _var.file_input.value = '';
        _var.file_name().textContent = '';
        _var.file_details().textContent = '';
        _var.file_show().style.display = 'none';
        files = [];
    })
    _var.download_file().addEventListener('click', (e) => {
        let obj = URL.createObjectURL(files[0]);
        let a = document.createElement('a');
        a.href = obj;
        a.download = files[0].name;
        a.click();
        URL.revokeObjectURL(obj);
    })
}

function enable_file_options() {
    if ((files.length > 0) && (files[0].size <= (10 * 1024 * 1024))) {
        _var.file_name().textContent = files[0].name.split('.')[0];
        let file_size = files[0].size >= (1024 * 1024) ? `${(files[0].size / (1024 * 1024)).toFixed(2)
            } MB` : `${(files[0].size / 1024).toFixed(2)} KB`;
        _var.file_details().textContent = `.${files[0].name.split('.').slice(-1)[0]} | ${file_size}`;
        _var.file_show().style.display = 'flex';
    } else {
        alert('Maximum file size should be 10 MB')
    }
}