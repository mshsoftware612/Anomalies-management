// document.getElementById('form').addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevent the form from submitting the traditional way

//     const formData = {
//         StatusName: document.getElementById('StatusName').value,
//         IntegrityName: document.getElementById('integrityThreat').value,
//         ProductionName: document.getElementById('productionThreat').value,
//         CustodianName: document.getElementById('custodian').value,
//         OperatorName: document.getElementById('operator').value,
//         AreaName: document.getElementById('area').value,
//         PLName: document.getElementById('plNo').value,
//         PlatformName: document.getElementById('platform').value,
//         FieldName: document.getElementById('field').value,
//         PipelineName: document.getElementById('isPipeline').value,
//         StructureName: document.getElementById('isStructure').value,
//         IsWellName: document.getElementById('isWell').value,
//         AnomalyTypeName: document.getElementById('anomalyType').value ,
//         AssessmentName: document.getElementById('assessment').value,
//         LocationName: document.getElementById('location').value,
//         ComPName: document.getElementById('compDes').value,
//         ReportedName: document.getElementById('dateFirstReported').value,
//         InspectedName: document.getElementById('dateLastInspected').value,
//         DescriptionName: document.getElementById('description').value,
//         ComponentsName: document.getElementById('components').value,
//         CommentsName: document.getElementById('comments').value,
//         PreparedName: document.getElementById('preparedBy').value ,
//         CheckedName: document.getElementById('checkedBy').value,
//         ApprovedName: document.getElementById('approvedBy').value ,
//         EnteredName: document.getElementById('enteredBy').value,
//         EquipmentName: document.getElementById('equipmentSupplier').value ,
//         CriticalityName: document.getElementById('criticality').value,
//         HyperlinkName: document.getElementById('hyperlink').value,  
//     };

//     fetch('/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)  // Send form data as a JSON string
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             // Trigger the toast success message
//             toast.success(data.message, { duration: 3000 });
//         } else {
//             // Handle error response
//             toast.error(data.message, { duration: 3000 });
//         }
//     })
//     .catch(error => {
//         // Handle any errors (network, etc.)
//         toast.error('Network error. Please try again.', { duration: 3000 });
//     });
// });
