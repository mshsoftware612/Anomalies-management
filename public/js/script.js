// Find a record by ID and populate the form
async function findRecord() {
    const id = document.getElementById('searchInput').value;
    if (!id) return alert('Please enter a valid ID');

    try {
        const response = await fetch(`/${id}`);
        // Check if the response was successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        // Check for errors in the returned data
        if (data.error) {
            alert(data.error);
            return;
        }

        // Populate the form fields with data
        document.getElementById('status').value = data.StatusName || '';
        document.getElementById('integrityThreat').value = data.IntegrityName || '';
        document.getElementById('productionThreat').value = data.ProductionName || '';
        document.getElementById('custodian').value = data.CustodianName || '';
        document.getElementById('operator').value = data.OperatorName || '';
        document.getElementById('area').value = data.AreaName || '';
        document.getElementById('plNo').value = data.PLName || '';
        document.getElementById('platform').value = data.PlatformName || '';
        document.getElementById('field').value = data.FieldName || '';
        document.getElementById('isPipeline').value = data.PipelineName || '';
        document.getElementById('isStructure').value = data.StructureName || '';
        document.getElementById('isWell').value = data.IsWellName || '';
        document.getElementById('anomalyType').value = data.AnomalyTypeName || '';
        document.getElementById('assessment').value = data.AssessmentName || '';
        document.getElementById('location').value = data.LocationName || '';
        document.getElementById('compDes').value = data.ComPName || '';
        document.getElementById('dateFirstReported').value = formatDate(data.ReportedName) || '';
        document.getElementById('dateLastInspected').value = formatDate(data.InspectedName) || '';
        document.getElementById('description').value = data.DescriptionName || '';
        document.getElementById('components').value = data.ComponentsName || '';
        document.getElementById('comments').value = data.CommentsName || '';
        document.getElementById('preparedBy').value = data.PreparedName || '';
        document.getElementById('checkedBy').value = data.CheckedName || '';
        document.getElementById('approvedBy').value = data.ApprovedName || '';
        document.getElementById('enteredBy').value = data.EnteredName || '';
        document.getElementById('equipmentSupplier').value = data.EquipmentName || '';
        document.getElementById('criticality').value = data.CriticalityName || '';
        document.getElementById('hyperlink').value = data.HyperlinkName || '';

        // Apply background colors dynamically
        updateBackgroundColor('status', data.StatusName, {
            Open: 'statusOpen',
            Closed: 'statusClosed',
        });

        updateBackgroundColor('integrityThreat', data.IntegrityName, {
            Low: 'LowSelected',
            Medium: 'MediumSelected',
            High: 'HighSelected',
        });

        updateBackgroundColor('productionThreat', data.ProductionName, {
            Low: 'LowSelected',
            Medium: 'MediumSelected',
            High: 'HighSelected',
        });

        updateBackgroundColor('criticality', data.CriticalityName, {
            Low: 'LowSelected',
            Medium: 'MediumSelected',
            High: 'HighSelected',
        });

        

        // setting Date format
        function formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            if (isNaN(date)) return ''; // Return empty if the date is invalid
            return date.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' format
        }


        // Display the uploaded documents as a link if they exist
        const documentFields = ['Document1Name', 'Document2Name', 'Document3Name', 'Document4Name'];
        documentFields.forEach((field, index) => {
            const linkElement = document.getElementById(`docLink${index + 1}`);
            if (data[field]) {
                linkElement.href = data[field];
                linkElement.style.display = 'inline';
            } else {
                linkElement.style.display = 'none';
            }
        });

    } catch (error) {
        alert('Error: ' + error.message);
    }
}


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

// Clear the form and display the max ID in the search field
function clearForm() {
    // document.getElementById('form').reset();
    location.reload(); // reload the page
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









// // Criticality
// const criticality = document.getElementById('criticality');
// criticality.addEventListener('change', function () {
//     const selectedValue = this.value;
//     // Remove both classes first to ensure only the relevant one is applied
//     this.classList.remove('LowSelected', 'MediumSelected', 'HighSelected');

//     if (selectedValue === 'Low') {
//         this.classList.add('LowSelected');
//     } else if (selectedValue === 'Medium') {
//         this.classList.add('MediumSelected');
//     } else if (selectedValue === 'High') {
//         this.classList.add('HighSelected');
//     }
// })
