let submitButton = document.querySelector(".submit");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (
    document.querySelector('[name="Name"]').value.trim() !== "" &&
    document.querySelector('[name="Price"]').value.trim() !== "" &&
    document.querySelector('[name="Location"]').value.trim() !== "" &&
    document.querySelector('[name="Rating"]').value.trim() !== "" &&
    document.querySelector('[name="PhoneNumber"]').value.trim() !== "" &&
    document.querySelector('[name="Details"]').value.trim() !== "" &&
    document.querySelector('[name="imageLink"]').value.trim() !== ""
  ) {
    try {
      const response = await fetch(`/host/add-home`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: document.querySelector('[name="Name"]').value,
          Price: document.querySelector('[name="Price"]').value,
          Location: document.querySelector('[name="Location"]').value,
          Rating: document.querySelector('[name="Rating"]').value,
          PhoneNumber: document.querySelector('[name="PhoneNumber"]').value,
          Details: document.querySelector('[name="Details"]').value,
          imageLink: document.querySelector('[name="imageLink"]').value,
        }),
      });

      if (response.ok) {
        window.location.href = "/host/homes";
      } else {
        alert("Failed to add home!");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  } else {
    alert("Fill all the inputs first");
  }
});
