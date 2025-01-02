const itemsPerPage = 120;
let currentPage = 1;
let items = [];

// Function to fetch and parse CSV
async function fetchCSV() {
    const response = await fetch('Hong.csv');
    const data = await response.text();
    
    // Use PapaParse to parse the CSV data
    Papa.parse(data, {
        header: true,
        complete: (results) => {
            items = results.data.filter(item => item.Name); // Filter out empty rows
            displayItems();
        }
    });
}

// Function to display items
function displayItems() {
    const catalog = document.getElementById('catalog');
    catalog.innerHTML = '';
    const filteredItems = items.filter(item => {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        // return item.name.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm);
        return item.Name.toLowerCase().includes(searchTerm);
    });
    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    paginatedItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${item.Name}</h2>
            <p>${item.Set_name}</p>
            <p>${item.Quantity}</p>
        `;
        catalog.appendChild(card);
    });
    setupPagination(filteredItems.length);
}

// Function to setup pagination
function setupPagination(totalItems) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.onclick = () => {
            currentPage = i;
            displayItems();
        };
        pagination.appendChild(pageButton);
    }
}
document.getElementById('search').addEventListener('input', () => {
    currentPage = 1; // Reset to first page on search
    displayItems();
});

// Fetch CSV data on page load
fetchCSV();