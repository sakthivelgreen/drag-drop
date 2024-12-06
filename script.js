import { _var } from "./variables.js";

main(); // main Function call

function main() { // Main Function Declaration
    Events()
}

function Events() {
    _var.drop_div().addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        _var.file_input().click();
    });
    _var.file_input().addEventListener('change', (e) => {
        const files = e.target.files;
        if (files[0].size <= (10 * 1024 * 1024)) {
            _var.file_name().textContent = files[0].name.split('.')[0];
            let file_size = files[0].size >= (1024 * 1024) ? `${(files[0].size / (1024 * 1024)).toFixed(2)
                } MB` : `${(files[0].size / 1024).toFixed(2)} KB`;
            _var.file_details().textContent = `.${files[0].name.split('.')[1]} | ${file_size}`;
            _var.file_show().style.display = 'flex';
        } else {
            alert('Maximum file size should be 10 MB')
        }
    })
}