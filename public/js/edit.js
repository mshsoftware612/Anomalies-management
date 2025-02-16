    
    // const id = document.getElementById('id').value;

    // try {
    //     const response = await fetch(`/edit/${id}`);
    //     // Check if the response was successful
    //     if (!response.ok) {
    //         throw new Error('Failed to fetch data');
    //     }

    //     const data = await response.json();

    //     // Check for errors in the returned data
    //     if (data.error) {
    //         alert(data.error);
    //         return;
    //     }


    //     // Apply background colors dynamically
    //     updateBackgroundColor('status', data.StatusName, {
    //         Open: 'statusOpen',
    //         Closed: 'statusClosed',
    //     });

    //     updateBackgroundColor('integrityThreat', data.IntegrityName, {
    //         Low: 'LowSelected',
    //         Medium: 'MediumSelected',
    //         High: 'HighSelected',
    //     });

    //     updateBackgroundColor('productionThreat', data.ProductionName, {
    //         Low: 'LowSelected',
    //         Medium: 'MediumSelected',
    //         High: 'HighSelected',
    //     });

    //     updateBackgroundColor('criticality', data.CriticalityName, {
    //         Low: 'LowSelected',
    //         Medium: 'MediumSelected',
    //         High: 'HighSelected',
    //     });
   

    // } catch (error) {
    //     alert('Error: ' + error.message);
    // }



// Utility function to update background color based on selected value
function updateBackgroundColor(elementId, selectedValue, classMapping) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Remove all classes related to background color
    Object.values(classMapping).forEach((className) => element.classList.remove(className));

    // Add the relevant class based on the selected value
    if (classMapping[selectedValue]) {
        element.classList.add(classMapping[selectedValue]);
    }
}

// Attach event listeners to dynamically handle background color changes
document.getElementById('status').addEventListener('change', function () {
    updateBackgroundColor('status', this.value, {
        Open: 'statusOpen',
        Closed: 'statusClosed',
    });
});

document.getElementById('integrityThreat').addEventListener('change', function () {
    updateBackgroundColor('integrityThreat', this.value, {
        Low: 'LowSelected',
        Medium: 'MediumSelected',
        High: 'HighSelected',
    });
});

document.getElementById('productionThreat').addEventListener('change', function () {
    updateBackgroundColor('productionThreat', this.value, {
        Low: 'LowSelected',
        Medium: 'MediumSelected',
        High: 'HighSelected',
    });
});

document.getElementById('criticality').addEventListener('change', function () {
    updateBackgroundColor('criticality', this.value, {
        Low: 'LowSelected',
        Medium: 'MediumSelected',
        High: 'HighSelected',
    });
});

