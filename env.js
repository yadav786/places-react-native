const variables = {
    development: {
        googleApiKey: 'AIzaSyC4G3NSdhay8qaq-pGHifBiNyFEjh33qvY'
    },
    production: {
        googleApiKey: 'AIzaSyC4G3NSdhay8qaq-pGHifBiNyFEjh33qvY'
    }
};
 
const getEnvVariables = () => {
    if (__DEV__) {
        return variables.development; // return this if in development mode
    }
    return variables.production; // otherwise, return this
};
 
export default getEnvVariables; // export a reference to the function