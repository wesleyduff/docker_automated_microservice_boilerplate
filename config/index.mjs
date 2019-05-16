import local from './local';
import stage from './stage';
import start from './start';

export default (() => {
    console.log(process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
        case 'local':
            return local;
            break;
        case 'stage':
            return stage;
            break;
        case 'start':
            return start;
        default:
            throw new Error(`Environment provided does not match : env = ${process.env.NODE_ENV}`);
            break;
    }
})()