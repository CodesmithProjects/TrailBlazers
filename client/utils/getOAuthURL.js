const getOAuthURL = () => {
    const rootURL ='https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: import.meta.env.VITE_GOOGLEREDIRECTURL,
        client_id: import.meta.env.VITE_GOOGLECLIENTID,
        response_type: 'token',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(' ')
    };
    const qs = new URLSearchParams(options);
    return `${rootURL}?${qs.toString()}`;
}

export default getOAuthURL;