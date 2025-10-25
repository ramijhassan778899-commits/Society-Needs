<script>
  const modal = document.getElementById('bookingModal');
  const floatBtn = document.querySelector('.float-btn');
  const closeBtn = document.getElementById('closeModal');
  const submitBtn = document.getElementById('submitBooking');
  const successMsg = document.getElementById('successMsg');
  const serviceTypeSelect = document.getElementById('serviceType');

  // Select all required inputs within the modal
  const requiredInputs = modal.querySelectorAll('input[required], select[required]');

  // --- 1. Open Modal Logic ---

  // Open modal from the floating button
  floatBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  // Open modal from all 'Book Now' buttons on service cards
  document.querySelectorAll('.card .cta').forEach(button => {
    button.addEventListener('click', (event) => {
      // 1. Get the service name from the card body (the strong tag)
      const serviceNameElement = event.target.closest('.card').querySelector('.body strong');
      const serviceName = serviceNameElement ? serviceNameElement.textContent.trim() : 'Other';

      // 2. Try to select the service in the dropdown
      let foundOption = Array.from(serviceTypeSelect.options).find(opt => opt.text.toLowerCase().includes(serviceName.toLowerCase()));

      // If the exact option isn't available, select 'Other'
      serviceTypeSelect.value = foundOption ? foundOption.value : 'Other';

      // 3. Open the modal
      modal.classList.add('active');
    });
  });


  // --- 2. Close Modal Logic ---

  const closeModal = () => {
    modal.classList.remove('active');
  successMsg.classList.remove('show'); // reset message
  };

  closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside of it (NEW FEATURE)
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
    closeModal();
    }
  });


  // --- 3. Submit Booking Logic with Validation and Reset ---

  submitBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default action (page refresh)

  let allValid = true;

    // Basic Validation (NEW FEATURE)
    requiredInputs.forEach(input => {
      if (input.value.trim() === '') {
    allValid = false;
  // Optional: Add a visual cue for invalid input (e.g., a red border)
  input.style.border = '2px solid red';
      } else {
    input.style.border = '1px solid #cfd8dc'; // Reset border
      }
    });

  if (!allValid) {
    alert("Please fill in all required fields to confirm your booking.");
  return; // Stop the submission process
    }

  // --- Submission Simulation ---
  // NOTE: In a real application, you would use fetch() here 
  // to send data to your server.

  // Show success message
  successMsg.classList.add('show');

    // Reset Form Fields (NEW FEATURE)
    requiredInputs.forEach(input => {
      if (input.tagName === 'SELECT') {
    input.selectedIndex = 0; // Reset dropdown to the first option
      } else {
    input.value = ''; // Clear text/tel inputs
      }
    });

    // Keep the message for 3 seconds, then hide modal
    setTimeout(() => {
    closeModal(); // Uses the unified close function
    }, 3000);
  });
</script>