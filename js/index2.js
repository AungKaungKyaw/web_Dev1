const list = document.getElementById("list");
const items = list.children;
const numItems = items.length;
const limit = 10; // Number of items to display per page
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let currentPage = 1;

// Calculate the pageCount by dividing the total number of items by the paginationLimit and rounding up to the highest whole number
const pageCount = Math.ceil(numItems / limit);

// Function to disable buttons
const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};

// Function to enable buttons
const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

// Function to handle page buttons status
const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
        disableButton(prev);
    } else {
        enableButton(prev);
    }

    if (currentPage === pageCount) {
        disableButton(next);
    } else {
        enableButton(next);
    }
};

// Function to set the current page
const setCurrentPage = (pageNum) => {
    currentPage = pageNum;
    let startIndex = (pageNum - 1) * limit;
    let endIndex = startIndex + limit;

    // Hide all items
    for (let i = 0; i < numItems; i++) {
        items[i].classList.add("hidden");
    }

    // Display the items of the current page
    for (let i = startIndex; i < endIndex && i < numItems; i++) {
        items[i].classList.remove("hidden");
    }
};

// Set the initial page
setCurrentPage(currentPage);

// Add event listeners for next and previous buttons
prev.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        setCurrentPage(currentPage);
        handlePageButtonsStatus();
    }
});

next.addEventListener("click", () => {
    if (currentPage < pageCount) {
        currentPage++;
        setCurrentPage(currentPage);
        handlePageButtonsStatus();
    }
});

// Function to update pagination numbers
const updatePaginationNumbers = () => {
    // Clear previous pagination numbers
    const paginationNumbersContainer = document.getElementById("pagination-numbers");
    paginationNumbersContainer.innerHTML = "";

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement("button");
        button.classList.add("pagination-number");
        button.setAttribute("page-index", i);
        button.textContent = i;

        if (i === currentPage) {
            button.classList.add("active");
        }

        // Add event listener for the pagination number
        button.addEventListener("click", () => {
            setCurrentPage(i);
            handlePageButtonsStatus();
        });

        paginationNumbersContainer.appendChild(button);
    }
};

// Call the updatePaginationNumbers function whenever the window loads
window.addEventListener("load", () => {
    updatePaginationNumbers();
    console.log("hello");
});

// Add event listener for the window resize
window.addEventListener("resize", () => {
    updatePaginationNumbers();
});