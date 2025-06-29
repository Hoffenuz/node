document.addEventListener('DOMContentLoaded', function() {
  const radios = document.querySelectorAll('.room-radio input[type="radio"]');
  const radioLabels = document.querySelectorAll('.room-radio');
  radios.forEach(radio => {
    radio.addEventListener('change', function() {
      radioLabels.forEach(lab => lab.classList.remove('selected'));
      this.closest('.room-radio').classList.add('selected');
    });
  });

  
}); 