import db from "../config/db.js";
import moment from "moment";

export const getAllRecords = async (req, res) =>{
    try {
        const limit = parseInt(req.query.limit) || 20; // Number of records per page, defaulting to 20
        const page = parseInt(req.query.page) || 1; // Current page to display, defaulting to 1
        const offset = (page - 1) * limit; // Calculate the offset for pagination

        // SQL query with pagination
        const query = `
            SELECT * FROM FormData
            LIMIT ? OFFSET ?;
        `;
        const [Records] = await db.query(query, [limit, offset]);

        // Format date fields
        Records.forEach(record => {
            if (record.REPORTED_DATE) {
                record.REPORTED_DATE = moment(record.REPORTED_DATE).format('YYYY-MM-DD');
            }
            if (record.INSPECTED_DATE) {
                record.INSPECTED_DATE = moment(record.INSPECTED_DATE).format('YYYY-MM-DD');
            }
        });

        // Query for total record count
        const totalQuery = `SELECT COUNT(*) as count FROM FormData;`;
        const [totalResult] = await db.query(totalQuery);
        const totalRecords = totalResult[0]?.count || 0; // Total number of rows in the table
        const totalPages = Math.ceil(totalRecords / limit); // Calculate total pages based on records and limit

        res.render('AllRecords', {
            Records, // Array of records to display
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Error retrieving records:', error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};









//with search functionality
// import db from "../config/db.js";
// import moment from "moment";

// export const getAllRecords = async (req, res) =>{
//     try {
//         const limit = parseInt(req.query.limit) || 20;
//         const page = parseInt(req.query.page) || 1; //current page to display. Defaults to 1
//         const search = req.query.search || '';
//         const offset = (page - 1) * limit;

//         // SQL query with search and pagination
//         const searchQuery = search ? `WHERE name LIKE ? OR description LIKE ?` : '';
//         const query = `
//             SELECT * FROM FormData 
//             ${searchQuery}
//             LIMIT ? OFFSET ?;
//         `;
//         const searchParams = search ? [`%${search}%`, `%${search}%`, limit, offset] : [limit, offset];

//         const [Records] = await db.query(query, searchParams);

//         // Format date fields
//         Records.forEach(record => {
//             if (record.REPORTED_DATE) {
//                 record.REPORTED_DATE = moment(record.REPORTED_DATE).format('YYYY-MM-DD');
//             }
//             if (record.INSPECTED_DATE) {
//                 record.INSPECTED_DATE = moment(record.INSPECTED_DATE).format('YYYY-MM-DD');
//             }
//         });

//         // Query for total record count
//         const totalQuery = search
//             ? `SELECT COUNT(*) as count FROM FormData WHERE name LIKE ? OR description LIKE ?`
//             : `SELECT COUNT(*) as count FROM FormData`;
//         const [totalResult] = await db.query(totalQuery, search ? [`%${search}%`, `%${search}%`] : []);
//         const totalRecords = totalResult[0]?.count || 0; // Total number of rows matching the query.
//         const totalPages = Math.ceil(totalRecords / limit);//Derived by dividing the total number of records by the limit
//         res.render('allrecords', {
//             Records, //Array of records to display
//             totalPages,
//             currentPage: page,
//             search,
//         });
//     } catch (error) {
//         console.error('Error retrieving records:', error); // Log the error for debugging
//         res.status(500).json({ error: error.message });
//     }
// };

