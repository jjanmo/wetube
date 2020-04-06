export const addMessageModal = (type, action) => {
    const messageModal = document.querySelector('.messageModal');
    const body = document.body;
    messageModal.classList.remove('hidden');
    messageModal.textContent = `${type} ${action}`;
    window.scroll({
        behavior: 'smooth',
        top: body.offsetHeight
    })
    setTimeout(() => {
        messageModal.classList.add('hidden');
    }, 2500)
}

