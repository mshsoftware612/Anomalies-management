import db from "../config/db.js";

//edit  records
export const editRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const [Records] = await db.query('SELECT * FROM FormData WHERE ID = ?', [id]);
        if (Records.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
         
        res.render('editForm', { Records: Records[0], uploadedDocuments: {
            doc1: Records[0].DOCUMENT_1,
            doc2: Records[0].DOCUMENT_2,
            doc3: Records[0].DOCUMENT_3,
            doc4: Records[0].DOCUMENT_4
        } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Update Record
export const updateRecord = async (req, res) => {
    const { id } = req.params;
    // console.log(id);

    const { StatusName, IntegrityName, ProductionName, CustodianName, OperatorName, AreaName, PLName, PlatformName, FieldName,
        PipelineName, StructureName, IsWellName, AnomalyTypeName, AssessmentName, LocationName, ComPName, ReportedName,
        InspectedName, DescriptionName, ComponentsName, CommentsName, PreparedName, CheckedName, ApprovedName, EnteredName,
        EquipmentName, CriticalityName, HyperlinkName } = req.body;

    try {
        await db.query('UPDATE FormData SET ANOMALY_STATUS = ?, INTEGRITY_THREAT = ?, PRODUCTION_THREAT = ?, CUSTODIAN = ?, OPERATOR = ?, AREA = ?, PL_NO = ?, PLATFORM = ?, FIELD = ?, IS_PIPELINE = ?, IS_STRUCTURE = ?, IS_WELL = ?, ANOMALY_TYPE = ?, ASSESSMENT = ?, LOCATION = ?, COMP_DES = ?, REPORTED_DATE = ?, INSPECTED_DATE = ?, DESCRIPTION = ?, COMPONENTS = ?, COMMENTS = ?, PREPARED_BY = ?, CHECKED_BY = ?, APPROVE_BY = ?, ENTERED_BY = ?, EQUIPMENT_SUPPLIER = ?, CRITICALITY = ?, HYPERLINK = ? WHERE ID = ?',
            [StatusName, IntegrityName, ProductionName, CustodianName, OperatorName, AreaName, PLName, PlatformName, FieldName,
                PipelineName, StructureName, IsWellName, AnomalyTypeName, AssessmentName, LocationName, ComPName, ReportedName,
                InspectedName, DescriptionName, ComponentsName, CommentsName, PreparedName, CheckedName, ApprovedName, EnteredName,
                EquipmentName, CriticalityName, HyperlinkName, id]);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export const deleteRecord = async (req, res) => {
    const { id } = req.params;

    try {
        // Begin a transaction to ensure atomicity
        await db.query('START TRANSACTION');

        // Check if the record exists
        const [recordCheck] = await db.query('SELECT * FROM FormData WHERE ID = ?', [id]);
        if (recordCheck.length === 0) {
            console.log(`No record found with ID: ${id}`);
            await db.query('ROLLBACK');
            return res.status(404).json({ message: "Record not found" });
        }

        // Delete the record with the given ID
        await db.query('DELETE FROM FormData WHERE ID = ?', [id]);

        // Reindex IDs to maintain sequential order
        await db.query('SET @id = 0');
        await db.query('UPDATE FormData SET ID = (@id := @id + 1) ORDER BY ID');

        // Reset the auto-increment value to match the new highest ID
        const [rows] = await db.query('SELECT MAX(ID) AS maxID FROM FormData');
        const maxID = rows[0].maxID || 0; // Handle the case when the table is empty
        await db.query('ALTER TABLE FormData AUTO_INCREMENT = ?', [maxID + 1]);

        // Commit the transaction
        await db.query('COMMIT');

        console.log(`Record with ID: ${id} successfully deleted and IDs reindexed.`);
        res.redirect('/allrecords');
    } catch (error) {
        // Rollback in case of error
        await db.query('ROLLBACK');
        console.error("Error during deletion and reindexing:", error);
        res.status(500).json({ error: error.message });
    }
};


