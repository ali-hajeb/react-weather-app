export const isOverflown = (element) => {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

export const overLay = (e) => {
    e.target.setAttribute('aria-hidden', true);
}

export const toggleSearchMenu = () => {
    const   overLayer   =   document.getElementById('overlayer'),
            searchInput  =   document.getElementById('s');
    overLayer.setAttribute('aria-hidden', false);
    searchInput.focus();
}

export const toggleLink = (e, min=null) => {
    e.preventDefault();
    const target = e.target.dataset.toggle, det = document.querySelector(target);
    if (det.getAttribute('aria-expanded') === 'false') {
        det.classList.toggle('show');
        let height = det.clientHeight;
        det.style.height = min ? `${min}px`:'0px';
        setTimeout(() => {det.style.height = height - 30 + 'px';}, 10);
        e.target.innerText = 'Show less';
        det.setAttribute('aria-expanded', true);
    } else {
        det.style.height = min ? `${min}px`:'0px';
        setTimeout(() => {det.classList.toggle('show');det.style.removeProperty('height')}, 500)
        e.target.innerText = 'Show more'
        det.setAttribute('aria-expanded', false);
    }
}

export const clickAnim = (e) => {
    e.target.classList.toggle('pressed');
}