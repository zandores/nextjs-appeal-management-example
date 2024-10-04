import fs from 'fs';
import path from 'path';

const databasePath = path.join(process.cwd(), 'src', 'data', 'appeals.json');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { player, reason, banDate, appealReason } = req.body;

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

            const maxAppealNumber = appeals.reduce((max, appeal) => {
                return Math.max(max, parseInt(appeal.appealNumber, 10));
            }, 0);

            const newAppealNumber = maxAppealNumber + 1;

            // Get current date and format it
            const now = new Date();
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            const appealDate = new Intl.DateTimeFormat('en-US', options).format(now);

            const newAppeal = {
                player: player,
                reason: reason,
                banDate: banDate,
                appealNumber: newAppealNumber.toString(),
                appealReason: appealReason,
                appealDate: appealDate,
                status: 'Pending',
                reviewedDate: null,
                reviewedBy: null,
            };

            appeals.push(newAppeal);

            fs.writeFile(databasePath, JSON.stringify({ appeals }, null, 2), (writeError) => {
                if (writeError) {
                    return res.status(500).json({ message: 'Error writing to database.' });
                }
                return res.status(201).json({ message: 'Appeal created successfully.', appeal: newAppeal });
            });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
