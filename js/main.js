function noResultsClick() {
    swal({
        title: "No Results",
        text: "Please search for another pole",
        type: "error",
        confirmButtonColor: "#aac341"
    });
}

function toIndex() {
    window.location.href="index.html";
}

function singleResultClick() {
    window.location.href="result-single.html";
}

function multipleResultClick() {
    window.location.href="result-multiple.html";
}