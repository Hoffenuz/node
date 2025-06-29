// Country data (flag, name, code, phone format)
const countries = [
  { flag: '🇺🇿', name: 'Uzbekistan', code: '+998', format: '90 123-45-67' },
  { flag: '🇷🇺', name: 'Russia', code: '+7', format: '912 345-67-89' },
  { flag: '🇰🇿', name: 'Kazakstan', code: '+7', format: '701 123-45-67' },
  { flag: '🇹🇷', name: 'Turkiye', code: '+90', format: '501 234 56 78' },
  { flag: '🇺🇸', name: 'Usa', code: '+1', format: '(201) 555-0123' },
  { flag: '🇬🇧', name: 'Angliya', code: '+44', format: '7123 456789' },
  { flag: '🇩🇪', name: 'Germaniya', code: '+49', format: '1512 3456789' },
  { flag: '🇫🇷', name: 'Fransiya', code: '+33', format: '6 12 34 56 78' },
  { flag: '🇨🇳', name: 'Xitoy', code: '+86', format: '131 2345 6789' },
  { flag: '🇦🇪', name: 'BAA', code: '+971', format: '50 123 4567' },
];

const rooms = [
  { value: 'pol-lux-1', label: 'Standart (1 kishi)', price: 300000 },
  { value: 'pol-lux-2', label: 'Standart (2 kishi)', price: 600000 },
  { value: 'standart-1', label: 'Standart (3 kishi)', price: 300000 },
  { value: 'standart-2', label: 'POL LUX (1 kishi)', price: 500000 },
  { value: 'standart-2', label: 'POL LUX (2 kishi)', price: 1000000 },

];

document.addEventListener('DOMContentLoaded', function() {
  // Country dropdown
  const countryDropdown = document.getElementById('countryDropdown');
  const selectedCountry = document.getElementById('selectedCountry');
  const countryList = document.getElementById('countryList');
  const phoneInput = document.getElementById('phone');

  // Populate country list
  countries.forEach((c, idx) => {
    const item = document.createElement('div');
    item.className = 'country-item';
    item.innerHTML = `<span class="flag">${c.flag}</span> <span class="code">${c.code}</span> <span class="name">${c.name}</span>`;
    item.onclick = () => {
      document.querySelectorAll('.country-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedCountry.querySelector('.flag').textContent = c.flag;
      selectedCountry.querySelector('.code').textContent = c.code;
      phoneInput.placeholder = c.format;
      countryList.classList.remove('open');
      countryDropdown.blur();
    };
    if(idx === 0) item.classList.add('selected');
    countryList.appendChild(item);
  });

  selectedCountry.onclick = function(e) {
    countryList.classList.toggle('open');
  };
  document.addEventListener('click', function(e) {
    if (!countryDropdown.contains(e.target)) {
      countryList.classList.remove('open');
    }
  });

  // Room modal
  const roomTypeInput = document.getElementById('roomType');
  const roomModal = document.getElementById('roomModal');
  const roomModalList = document.getElementById('roomModalList');
  const roomModalClose = document.getElementById('roomModalClose');
  let selectedRoomValue = '';

  function selectRoom(room) {
    selectedRoomValue = room.value;
    roomTypeInput.value = `${room.label} — ${room.price.toLocaleString()} so'm`;
    document.querySelectorAll('.room-modal-option').forEach(opt => opt.classList.remove('selected'));
    const el = document.getElementById('room-opt-' + room.value);
    if(el) el.classList.add('selected');
    roomModal.classList.remove('open');
    // Show/hide second guest fields
    if (room.label.match(/2 kishi|2 kishi|2 kishi|2 kishi|2 kishi|2 kishilik|2 kishi,|2 kishilik|2 kishi/gi)) {
      document.querySelectorAll('.guest2-fields').forEach(f => f.style.display = 'flex');
    } else {
      document.querySelectorAll('.guest2-fields').forEach(f => f.style.display = 'none');
    }
  }

  // Populate room modal
  rooms.forEach(room => {
    const opt = document.createElement('div');
    opt.className = 'room-modal-option';
    opt.id = 'room-opt-' + room.value;
    opt.innerHTML = `<span>${room.label}</span> <span class="price">${room.price.toLocaleString()} so'm</span> <span class="room-check">✔</span>`;
    opt.onclick = () => selectRoom(room);
    roomModalList.appendChild(opt);
  });

  roomTypeInput.onclick = function() {
    roomModal.classList.add('open');
  };
  document.querySelector('.room-select-arrow').onclick = function() {
    roomModal.classList.add('open');
  };
  roomModalClose.onclick = function() {
    roomModal.classList.remove('open');
  };
  roomModal.onclick = function(e) {
    if(e.target === roomModal) roomModal.classList.remove('open');
  };

  // Modal for success message
  function showSuccessModal() {
    let modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.left = 0;
    modal.style.top = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.45)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = 2000;
    modal.innerHTML = `<div style="background:#fff;padding:32px 24px;border-radius:16px;max-width:90vw;text-align:center;box-shadow:0 6px 32px rgba(87,74,152,0.13);font-size:1.1em;">
      <div style='font-size:2.2em;color:#42b0b2;margin-bottom:10px;'>✔</div>
      <div>Ma'lumot yuborildi!<br>Admin tez orada siz bilan bog'lanadi.</div>
      <button style='margin-top:18px;padding:8px 24px;background:#42b0b2;color:#fff;border:none;border-radius:8px;font-size:1em;cursor:pointer;' onclick='this.closest("div").parentNode.remove()'>Yopish</button>
    </div>`;
    document.body.appendChild(modal);
  }

  // Form submit integration
  const form = document.getElementById('bookingForm');
  form.addEventListener('submit', async function(e) {
    if(!selectedRoomValue) {
      alert('Iltimos, xona turini tanlang!');
      roomModal.classList.add('open');
      e.preventDefault();
      return;
    }
    e.preventDefault();
    // Optionally, you can add the country code to the phone value
    const countryCode = selectedCountry.querySelector('.code').textContent;
    const phoneVal = countryCode + ' ' + phoneInput.value.trim();
    // Validation
    const isTwoPerson = document.querySelector('.guest2-fields').style.display !== 'none';
    let errors = [];
    if (!form.name.value.trim()) errors.push('Ism');
    if (!form.surname.value.trim()) errors.push('Familiya');
    if (!phoneInput.value.trim()) errors.push('Telefon');
    if (isTwoPerson) {
      if (!form.name2.value.trim()) errors.push('2-kishi ismi');
      if (!form.surname2.value.trim()) errors.push('2-kishi familiyasi');
    }
    if (errors.length > 0) {
      alert('Quyidagi maydonlarni to‘ldiring: ' + errors.join(', '));
      return;
    }
    // Prepare data
    const data = {
      ism: form.name.value.trim() + (form.name2 && form.name2.value ? ' / ' + form.name2.value.trim() : ''),
      familya: form.surname.value.trim() + (form.surname2 && form.surname2.value ? ' / ' + form.surname2.value.trim() : ''),
      telefon: phoneVal,
      xona_turi_narxi: roomTypeInput.value,
      qoshimcha_malumot: form.extra.value.trim()
    };
    try {
      await fetch('https://fbpaezxcpykwdfowypqw.supabase.co/rest/v1/burron', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicGFlenhjcHlrd2Rmb3d5cHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTY0NTYsImV4cCI6MjA2MzY3MjQ1Nn0.aFeFK0jvaDoQbPyA2a3qFQu0KFEp4hGPU39n6z8Hhsk',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicGFlenhjcHlrd2Rmb3d5cHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTY0NTYsImV4cCI6MjA2MzY3MjQ1Nn0.aFeFK0jvaDoQbPyA2a3qFQu0KFEp4hGPU39n6z8Hhsk',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(data)
      });
      showSuccessModal();
      form.reset();
      roomTypeInput.value = '';
      selectedRoomValue = '';
      document.querySelectorAll('.room-modal-option').forEach(opt => opt.classList.remove('selected'));
      document.querySelectorAll('.guest2-fields').forEach(f => f.style.display = 'none');
    } catch (err) {
      alert("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    }
  });
}); 