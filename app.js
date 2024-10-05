let deferredPrompt;
	const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
    // Mencegah browser dari menampilkan prompt secara otomatis
    e.preventDefault();
    // Simpan event untuk digunakan nanti
    deferredPrompt = e;

    // Tampilkan tombol atau UI yang meminta pengguna untuk menginstal
    const installButton = document.getElementById('installButton'); // Misalnya, tombol dengan id 'installButton'
    installButton.style.display = 'block'; // Tampilkan tombol

    installButton.addEventListener('click', () => {
        // Sembunyikan tombol setelah pengguna mengklik
        installButton.style.display = 'none';
        // Tampilkan prompt untuk menginstal PWA
        deferredPrompt.prompt();
        // Tunggu respons dari pengguna
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Pengguna menerima instalasi PWA');
            } else {
                console.log('Pengguna menolak instalasi PWA');
            }
            deferredPrompt = null; // Reset deferredPrompt
        });
    });
});

<script>
    // Pendaftaran Service Worker
    if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker terdaftar dengan sukses:', registration);
            })
            .catch(error => {
                console.error('Gagal mendaftarkan Service Worker:', error);
            });
    })
}
</script>

