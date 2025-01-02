document.addEventListener('DOMContentLoaded', () => {
    const catalogElement = document.getElementById('catalog');
    const searchInput = document.getElementById('search');

    // Load CSV data
    fetch('Hong.csv')
        .then(response => response.text())
        .then(data => {
            const items = parseCSV(data);
            renderItems(items);

            // Search functionality
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                const filteredItems = items.filter(item => 
                    item.name.toLowerCase().includes(query) || 
                    item.category.toLowerCase().includes(query)
                );
                renderItems(filteredItems);
            });
        });

    function parseCSV(data) {
        const rows = data.split('\n').slice(1); // Skip header
        return rows.map(row => {
            const [Name,Set_code,Set_name,Collector_number,Foil,Rarity,Quantity,ManaBox_ID,Scryfall_ID,Purchase_price,Misprint,Altered,Condition,Language,Purchase_price_currency] = row.split(',');
            return { Name,Set_code,Set_name,Collector_number,Foil,Rarity,Quantity,ManaBox_ID,Scryfall_ID,Purchase_price,Misprint,Altered,Condition,Language,Purchase_price_currency};
        });
    }

    function renderItems(items) {
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
});