import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';


// Start the server
const port = 4200;
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

export default app;