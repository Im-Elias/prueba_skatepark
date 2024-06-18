const checkboxes = document.querySelectorAll('input[type="checkbox"]');

const fetchSetSkater = async (id, estado) => {
  const url = `/setState/${id}/${estado}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const id = checkbox.value;
    const estado = this.checked;

    fetchSetSkater(id, estado);

    alert("El estado de la casilla ha sido cambiado");
    window.location.href = "/";
  });
});
