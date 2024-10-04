import fs from 'fs';
import path from 'path';

const databasePath = path.join(process.cwd(), 'src', 'data', 'appeals.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    fs.readFile(databasePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err); // Log the error for debugging
        return res.status(500).json({ message: 'Error reading file' });
      }

      try {
        const jsonData = JSON.parse(data);
        const pendingBans = jsonData.appeals.filter(ban => ban.status !== 'Pending');

        res.status(200).json(pendingBans);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError); // Log the parsing error
        res.status(500).json({ message: 'Error parsing JSON' });
      }
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
