const scriptURL = 'https://script.google.com/macros/s/AKfycbxoZaTTgxx8U-7rZldGUofstrnlpMROmMDYk5wwV7DrSLuvhXDW6624NCd1CIGmFEGF/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
const submitButton = document.getElementById("submit-button");
const overlay = document.getElementById("overlay");

form.addEventListener('submit', async e => {
    e.preventDefault();

    submitButton.textContent = "Submitting...";
    submitButton.disabled = true;
    overlay.style.display = 'block'; // Show overlay

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        });

        if (response.ok) {
            msg.textContent = "Message sent successfully";
            msg.style.color = 'green';
            setTimeout(() => msg.textContent = "", 5000);
            form.reset();
        } else {
            throw new Error("Failed to send message. Please try again.");
        }
    } catch (error) {
        msg.textContent = "An error occurred: " + error.message;
        msg.style.color = 'red';
        console.error('Error!', error.message);
    } finally {
        submitButton.textContent = "Submit"; // Reset button text
        submitButton.disabled = false; // Re-enable button
        overlay.style.display = 'none'; // Hide overlay
    }
});