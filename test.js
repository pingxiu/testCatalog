document.addEventListener('DOMContentLoaded', () => {
    const catalogElement = document.getElementById('catalog');
    const searchInput = document.getElementById('search');

    // Load CSV data
    Papa.parse('catalog.csv', {
        download: true,
        header: true,
        complete: function(results) {
            displayItems(results.data);
        }
    });


    function displayItems(items) {
        catalogElement.innerHTML = '';
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'col-md-4 item';
            itemElement.innerHTML = `
                
                <h2>${item.Name}</h2>
                <p>${item.Quantity}</p>
            `;
            catalogElement.appendChild(itemElement);
        });
    }
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const filteredItems = items.filter(item => 
            item.Name.toLowerCase().includes(query)
        );
        displayItems(filteredItems);
    });
});