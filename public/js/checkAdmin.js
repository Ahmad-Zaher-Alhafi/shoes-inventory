async function isAdmin() {
  const password = prompt("Please enter the admin password:");

  if (!password) {
    alert("Password is required to proceed!");
    return false;
  }

  try {
    const response = await fetch("/isAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const result = await response.json();

    if (response.ok) {
      return result.isAdmin;
    } else {
      alert(result.message || "Failed, Please try again.");
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred.");
    return false;
  }
}

document
  .querySelector(".deleteButton")
  .addEventListener("click", async function () {
    if (await isAdmin()) {
      document.querySelector(".deleteForm").submit();
    } else {
      alert("No admin permissions for this action");
    }
  });

document
  .querySelector(".editButton")
  .addEventListener("click", async function () {
    if (await isAdmin()) {
      document.querySelector(".editForm").submit();
    } else {
      alert("No admin permissions for this action");
    }
  });
