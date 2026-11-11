document.addEventListener('DOMContentLoaded', function () {
  const tombolMode = document.getElementById('btnSapa');
  const body = document.body;
  const formSkill = document.getElementById('formSkill');
  const inputSkill = document.getElementById('inputSkill');
  const daftarSkill = document.getElementById('daftarSkill');

  // ==========================================
  // 1. FITUR MODE GELAP DENGAN LOCALSTORAGE
  // ==========================================
  // Cek apakah sebelumnya pengguna memilih mode gelap
  const temaTersimpan = localStorage.getItem('tema');

  if (temaTersimpan === 'gelap') {
    body.classList.add('dark-theme');
    tombolMode.textContent = '☀️ Mode Terang';
  } else {
    tombolMode.textContent = '🌙 Mode Gelap';
  }

  tombolMode.addEventListener('click', function () {
    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
      tombolMode.textContent = '☀️ Mode Terang';
      // Simpan status bahwa pengguna suka mode gelap
      localStorage.setItem('tema', 'gelap');
    } else {
      tombolMode.textContent = '🌙 Mode Gelap';
      // Simpan status mode terang
      localStorage.setItem('tema', 'terang');
    }
  });

  // ==========================================
  // 2. FITUR SKILL DENGAN LOCALSTORAGE
  // ==========================================
  // Ambil daftar skill dari localStorage (jika belum ada, gunakan array default)
  let kumpulanSkill = JSON.parse(localStorage.getItem('skills')) || ['HTML5', 'CSS3'];

  // Fungsi untuk menggambar badge skill ke layar
  function renderSkills() {
    daftarSkill.innerHTML = ''; // Kosongkan tampilan lama
    kumpulanSkill.forEach(function (skill) {
      const badge = document.createElement('span');
      badge.className = 'skill-badge';
      badge.textContent = skill;
      daftarSkill.appendChild(badge);
    });
  }

  // Tampilkan skill saat halaman pertama kali dibuka
  renderSkills();

  // Saat form disubmit untuk menambah skill baru
  formSkill.addEventListener('submit', function (event) {
    event.preventDefault();

    const teksSkillBaru = inputSkill.value.trim();

    if (teksSkillBaru !== '') {
      // 1. Masukkan skill baru ke dalam daftar array
      kumpulanSkill.push(teksSkillBaru);

      // 2. Simpan array terbaru ke localStorage
      localStorage.setItem('skills', JSON.stringify(kumpulanSkill));

      // 3. Gambar ulang ke layar
      renderSkills();

      // 4. Kosongkan input
      inputSkill.value = '';
    }
  });
});