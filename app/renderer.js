const {shell} = require('electron');


const
    linksSection = document.querySelector('.links'),
    errorMessage = document.querySelector('.error-message'),
    newLinkForm = document.querySelector('.new-link-form'),
    newLinkUrl = document.querySelector('.new-link-url'),
    newLinkSubmit = document.querySelector('.new-link-submit'),
    clearStorageButton = document.querySelector('.clear-storage');

// helper function to clear input text.
const clearForm = () => {
    newLinkUrl.value = "https://";
};

// an url parser.
const parser = new DOMParser();

const parseResponse = (text) => {
    return parser.parseFromString(text, 'text/html');
};

const findTitle = (nodes) => {
    return nodes.querySelector('title').innerText;
};

// invoke browsers' buildin localStorage
const storeLink = (title, url) => {
    localStorage.setItem(url, JSON.stringify({
        title: title,
        url: url
    }));
};

const getLinks = () => {
    return Object.keys(localStorage)
                .map(key => JSON.parse(localStorage.getItem(key)));
};

const convertToElement = (link) => {
    return `
<div class="link">
<h3>${link.title}</h3>
<p>
<a href="${link.url}">${link.url}</a>
</p></div>`;
};

const renderLinks = () => {
    const linkElements = getLinks().map(convertToElement).join('');
    linksSection.innerHTML = linkElements;
};

// Events listeners.

newLinkUrl.addEventListener('keyup', ()=>{
    // invoke Chromium's validity API to check the input.
    newLinkSubmit.disabled = !newLinkUrl.validity.valid;
});

newLinkForm.addEventListener('submit', (event) => {
    // tell Chromium not to POST an HTTP request.
    event.preventDefault();

    const url = newLinkUrl.value;

    fetch(url)
        .then(validateResponse)
        .then(response => response.text())
        .then(parseResponse)
        .then(findTitle)
        .then(title => storeLink(title, url))
        .then(clearForm)
        .then(renderLinks)
        .catch(err => errorHandler(err, url));
});

clearStorageButton.addEventListener('click', () => {
    localStorage.clear();
    linksSection.innerHTML = '';
});

linksSection.addEventListener('click', (event) => {
    if (event.target.href) {
        //  check if a link then open in browsers instead of UI
        event.preventDefault();
        shell.openExternal(event.target.href);
    }
})

renderLinks();

const errorHandler = (error, url) => {
    errorMessage.innerHTML = `
There was an issue adding "${url}": ${error.message}
`.trim();
    setTimeout(() => errorMessage.innerText = null, 5000);
}

const validateResponse = (res) => {
    if (res.ok) {return res;}
    throw new Error(`Status code of ${res.status} ${res.statusText}`);
};
