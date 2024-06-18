const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const checkbox = this;
    //get id of the row
    const row = checkbox.closest("tr");
    const id = row.dataset.id;
    //get the state of the checkbox
    const estado = checkbox.checked;

    console.log(checkbox, row, id, estado);

    fetch(`/api/skater/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ estado }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
