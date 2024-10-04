import fs from 'fs';
import path from 'path';

const databasePath = path.join(process.cwd(), 'src', 'data', 'appeals.json');

export default function handler(req, res) {
    if (req.method === 'DELETE') {
        const { appealNumber } = req.body;

        fs.readFile(databasePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).json({ message: 'Error reading file' });
            }

            let appeals;
            try {
                appeals = JSON.parse(data).appeals;
            } catch (parseError) {
                return res.status(500).json({ message: 'Error parsing database.' });
            }

            // Find the index of the appeal to delete
            const appealIndex = appeals.findIndex(appeal => appeal.appealNumber === appealNumber);
            if (appealIndex === -1) {
                return res.status(404).json({ message: 'Appeal not found.' });
            }

            // Remove the appeal from the array
            appeals.splice(appealIndex, 1);

            // Write the updated data back to the file
            fs.writeFile(databasePath, JSON.stringify({ appeals }, null, 2), (writeError) => {
                if (writeError) {
                    return res.status(500).json({ message: 'Error writing to database.' });
                }
                return res.status(200).json({ message: 'Appeal deleted successfully.' });
            });
        });
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
