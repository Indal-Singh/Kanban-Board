const selectDom = (element) => document.querySelector(element);

let siteName = selectDom("#siteName");
let createNewBtn = selectDom('#createNew');
let modalOverlay = selectDom('#modalOverlay');

const saveSiteName = (e) => {
    e.target.contentEditable = 'false';
    let textValue = e.target.textContent;
    document.title = textValue;
    localStorage.setItem('siteName', textValue);
}

function openModal() {
    modalOverlay.classList.add('active');
    
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

// setting site name if present in local storage
window.addEventListener('DOMContentLoaded', () => {
    const storedName = localStorage.getItem('siteName');
    if (storedName) {
        siteName.textContent = storedName;
        document.title = storedName;
    }
});

// Event listeners
siteName.addEventListener('focusout', saveSiteName);
createNewBtn.addEventListener('click', openModal);

closeModal();