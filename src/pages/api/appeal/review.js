import fs from 'fs';
import path from 'path';

const databasePath = path.join(process.cwd(), 'src', 'data', 'appeals.json');

export default function handler(req, res) {
    if (req.method === 'PATCH') {
        const { appealNumber, status } = req.body;

        fs.readFile(databasePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err); // Log the error for debugging
                return res.status(500).json({ message: 'Error reading file' });
            }

            let appeals;
            try {
                appeals = JSON.parse(data).appeals;
            } catch (parseError) {
                return res.status(500).json({ message: 'Error parsing database.' });
            }

            // Find the appeal by appealNumber
            const appealIndex = appeals.findIndex(appeal => appeal.appealNumber === appealNumber);
            if (appealIndex === -1) {
                return res.status(404).json({ message: 'Appeal not found.' });
            }

            // Check if the appeal is pending
            if (appeals[appealIndex].status !== 'Pending') {
                return res.status(400).json({ message: 'Only pending appeals can be accepted or denied.' });
            }

            // Update the status, reviewedDate, and reviewedBy fields
            appeals[appealIndex].status = status;

            // Format the date to "October 3, 2024 at 09:00 AM"
            const now = new Date();
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            appeals[appealIndex].reviewedDate = new Intl.DateTimeFormat('en-US', options).format(now);

            appeals[appealIndex].reviewedBy = 'Admin'; // Change this as needed

            // Write the updated data back to the file
            fs.writeFile(databasePath, JSON.stringify({ appeals }, null, 2), (writeError) => {
                if (writeError) {
                    return res.status(500).json({ message: 'Error writing to database.' });
                }
                return res.status(200).json({ message: 'Appeal updated successfully.' });
            });
        });
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
