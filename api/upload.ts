import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

function uploadHandler (req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.status(500).json({error: 'Error parsing file' });
        }

        const file = files.file;

        // handle file
        console.log('here')
        
        return res.status(200).json({ message: 'File uploaded successfully', file });
    });
}

export default uploadHandler;
