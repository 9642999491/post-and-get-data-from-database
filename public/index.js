async function fetchData() {
    try {
        const response = await fetch('http://localhost:5000/data');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


async function populateTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    const data = await fetchData();
    if (data.length === 0) {
        const newRow = tableBody.insertRow();
        const cell = newRow.insertCell();
        cell.textContent = 'No data available';
    } else {
        data.forEach((item, index) => {
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `<td>${index + 1}</td><td>${item.name}</td><td>${item.email}</td><td>${item.age}</td><td>${item.dateofbirth}</td>`;
        });
    }
}

document.addEventListener('DOMContentLoaded', populateTable);