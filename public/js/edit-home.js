let editButton = document.querySelectorAll(".editButton");
let theClass = document.querySelector("#A19352");
let cancelButton = document.querySelector(".btnCancel");
let saveButton = document.querySelector(".btnSave");
let idOfCurrentHome;
let deleteHomeButton = document.querySelectorAll(".deleteButton");

editButton.forEach((button) =>
  button.addEventListener("click", async () => {
    idOfCurrentHome = button.dataset.id;
    theClass.classList.add("overlay1");
    let homeId = button.dataset.id;
    const response = await fetch(`/host/homes-edit/${homeId}`);
    const home = await response.json();
    document.querySelector('[name="homeName"]').value = home.name;
    document.querySelector('[name="Price"]').value = home.price;
    document.querySelector('[name="Location"]').value = home.location;
    document.querySelector('[name="Rating"]').value = home.rating;
    document.querySelector('[name="phoneNumber"]').value = home.phone_number;
    document.querySelector('[name="Details"]').value = home.details;
    document.querySelector('[name="imageLink"]').value = home.image_link;
  }),
);

deleteHomeButton.forEach((deleteButton) => {
  deleteButton.addEventListener("click", async () => {
    let buttonId = deleteButton.dataset.id;
    const requestHandler = await fetch(`/host/homes-delete/${buttonId}`, {
      method: "POST",
    });
    const data = await requestHandler.json();
    alert(data.message);
    setTimeout(() => {
      window.location.reload();
    }, 100);
    // window.location.reload();
  });
});

cancelButton.addEventListener("click", () => {
  // console.log(idOfCurrentHome);
  theClass.classList.remove("overlay1");
});

saveButton.addEventListener("click", async () => {
  const response = await fetch(`/host/homes-edit/${idOfCurrentHome}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: document.querySelector('[name="homeName"]').value,
      Price: document.querySelector('[name="Price"]').value,
      Location: document.querySelector('[name="Location"]').value,
      Rating: document.querySelector('[name="Rating"]').value,
      PhoneNumber: document.querySelector('[name="phoneNumber"]').value,
      Details: document.querySelector('[name="Details"]').value,
      imageLink: document.querySelector('[name="imageLink"]').value,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    alert(result.message);
    return;
  }
  // console.log(result.message);
  alert(result.message);
  setTimeout(() => {
    window.location.reload();
  }, 100);
});
