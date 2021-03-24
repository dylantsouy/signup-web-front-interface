// To do >>>>> add a file in apis folder root apiSetup.js
// to detect REACT_APP_ENV if local, (use js method, window.location.hostname)
// then get the url from local, else get the url from the real url

export const urlDeterminator = () => {
    let endpoint = `REACT_APP_API_URL`;

    return process.env[endpoint];
}

export const url = urlDeterminator();