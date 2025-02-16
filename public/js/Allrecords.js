function SearchFunction() {
    var input = document.querySelector("#searchInput");
    var filter = input.value.toUpperCase(); 
    var table = document.querySelector(".records-table");
    var rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) { 
        var cells = rows[i].getElementsByTagName("td");
        let rowContainsQuery = false;

        for (let j = 0; j < cells.length - 1; j++) { 
            let cellValue = cells[j].textContent || cells[j].innerText;
            if (cellValue.toUpperCase().indexOf(filter) > -1) {
                rowContainsQuery = true;
                break;
            }
        }

        rows[i].style.display = rowContainsQuery ? "" : "none";
    }
}
