// sidebar lvl 2 n 3
// Function to toggle content visibility
function toggleContent(toggleElement, contentElement, otherContentElements) {
  toggleElement.addEventListener("mouseover", function () {
    if (contentElement.classList.contains("invisible")) {
      contentElement.classList.remove("invisible");
      otherContentElements.forEach(function (element) {
        if (!element.classList.contains("invisible")) {
          element.classList.add("invisible");
        }
      });
    } else {
      contentElement.classList.add("invisible");
    }
  });
}

// Array of toggle and content element IDs
const toggleContentID = [
  "tab-content",
  "tab-content2",
  "tab-content3",
  "tab-content4",
  "tab-content5",
  "tab-content6",
  "tab-content7",
  "tab-content8",
];

const contentTabId = [
  "content-tab",
  "content-tab2",
  "content-tab3",
  "content-tab4",
  "content-tab5",
  "content-tab6",
  "content-tab7",
  "content-tab8",
];

// Map each ID to corresponding element
const toggleContentMap = toggleContentID.map((value) =>
  document.getElementById(value)
);
const contentTabMap = contentTabId.map((value) =>
  document.getElementById(value)
);

// Toggle each pair of toggle and content elements
// Iterate through each pair of toggle and content elements
for (let i = 0; i < toggleContentMap.length; i++) {
  const toggleElement = toggleContentMap[i];
  const contentElement = contentTabMap[i];
  const otherContentElements = contentTabMap.filter(
    (element) => element !== contentElement
  );

  // Call toggleContent function for each pair
  toggleContent(toggleElement, contentElement, otherContentElements);
}

// Menutup contentTab ketika mouse meninggalkan toggleContent1
contentTabMap.forEach((index) => {
  index.addEventListener("mouseleave", (e) => {
    index.classList.add("invisible");
    navLinks2.forEach((link) => {
      if (link.classList.contains("active-content2")) {
        link.classList.remove("active-content2");
      }
    });
  });
});

const navLinks = document.querySelectorAll(".nav-item");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Check if the link already has the class active-content1
    if (link.classList.contains("active-content1")) {
      link.classList.remove("active-content1"); // Remove the class if it's already present
    } else {
      // If not, remove the class from all links and add it to the clicked link
      document.querySelectorAll(".active-content1")?.forEach((element) => {
        element.classList.remove("active-content1");
      });
      link.classList.add("active-content1");
    }
  });
});

const navLinks2 = document.querySelectorAll(".nav-item2");
navLinks2.forEach((link) => {
  link.addEventListener("mouseover", () => {
    document.querySelectorAll(".active-content2")?.forEach((element) => {
      element.classList.remove("active-content2");
    });

    link.classList.add("active-content2");
  });
});

// toggle sidebar lvl1
const contentSidebar = document.getElementById("tabpanel1");
const contentSidebar2 = document.getElementById("tabpanel2");
const toggleTab = document.getElementById("tab1");
const toggleTab2 = document.getElementById("tab2");
// parent toggle 1
const addToggle = document.getElementById("parentOne");
toggleTab.addEventListener("click", function (e) {
  if (contentSidebar.classList.contains("invisible")) {
    contentSidebar.classList.remove("invisible");
    contentTabMap.forEach((index, idx) => {
      if (idx === 0) {
        index.classList.remove("invisible");
      }
    });
    addToggle.classList.add("active-content2");
  } else {
    navLinks.forEach((link) => {
      link.classList.remove("active-content1");
    });
    contentTabMap.forEach((index) => {
      index.classList.add("invisible");
    });
    contentSidebar.classList.add("invisible");
  }

  e.preventDefault();
});

// close while any toggle has clicked
const toggles = document.querySelectorAll(".navSidebar");

toggles.forEach((index, idx) => {
  index.addEventListener("click", (e) => {
    e.preventDefault();
    if (idx !== 1) {
      // Menutup contentTab ketika toggleSidebar ditutup
      if (!contentSidebar.classList.contains("invisible")) {
        contentSidebar.classList.add("invisible");
        contentTabMap.forEach((index) => {
          index.classList.add("invisible");
        });
        toggleContentMap.forEach((index, idx) => {
          if (idx === 0) {
            index.classList.remove("invisible");
          }
        });
        navLinks2.forEach((link) => {
          link.classList.remove("active-content2");
        });
      }
    }
  });
});

function listGrid() {
  const gridButton = document.getElementById("gridButton");
  const rowButton = document.getElementById("rowButton");
  const gridLayout = document.getElementById("gridLayout");
  const rowLayout = document.getElementById("rowLayout");

  if (gridLayout.classList.contains("d-none")) {
    gridLayout.classList.remove("d-none");
    rowButton.classList.add("d-none");
    gridButton.classList.remove("d-none");
    rowLayout.classList.add("d-none");
  } else {
    gridLayout.classList.add("d-none");
    rowButton.classList.remove("d-none");
    gridButton.classList.add("d-none");
    rowLayout.classList.remove("d-none");
  }
}

function descending() {
  const alphaZ = document.getElementById("alphaZ");
  const alphaA = document.getElementById("alphaA");

  if (alphaA.classList.contains("d-none")) {
    alphaA.classList.remove("d-none");
    alphaZ.classList.add("d-none");
  } else {
    alphaA.classList.add("d-none");
    alphaZ.classList.remove("d-none");
  }
}

// pagination
const totalContent = 120;
const perPage = 20;
let currentPage = 1;

function generateContent(page) {
  let contentList = "";
  for (
    let i = (page - 1) * perPage + 1;
    i <= Math.min(page * perPage, totalContent);
    i++
  ) {
    contentList += `
      <div class="col">
        <a class="card-file align-items-center ps-3 d-flex gap-4" href="#">
          <img src="assets/img-content/rev-Branch.png" alt="" />
          <span>Revenue by Service ${i}</span>
        </a>
      </div>
    `;
  }
  $("#contentList").html(contentList);
  generateEntriesText(); // Tambahkan ini untuk memperbarui teks entri
}

function updatePaginationButtons() {
  $(".page-item").removeClass("active");
  $(`#page${currentPage}`).addClass("active");
  $("#prevBtn").prop("disabled", currentPage === 1);
  $("#nextBtn").prop(
    "disabled",
    currentPage === Math.ceil(totalContent / perPage)
  );
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    generateContent(currentPage);
    updatePaginationButtons();
  }
}

function nextPage() {
  if (currentPage < Math.ceil(totalContent / perPage)) {
    currentPage++;
    generateContent(currentPage);
    updatePaginationButtons();
  }
}

function generateEntriesText() {
  let startIndex = (currentPage - 1) * perPage + 1;
  let endIndex = Math.min(currentPage * perPage, totalContent);
  let totalEntries = totalContent;
  let entriesText = `Showing ${startIndex} to ${endIndex} of ${totalEntries} entries`;
  $(".entries-text").text(entriesText);
}

function generatePaginationLinks() {
  let pagination = "";
  for (let i = 1; i <= Math.ceil(totalContent / perPage); i++) {
    pagination += `
      <li id="page${i}" class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
      </li>
    `;
  }
  $("#pagination").html(pagination);
}

function goToPage(page) {
  currentPage = page;
  generateContent(currentPage);
  updatePaginationButtons();
}

$(document).ready(function () {
  generateContent(currentPage);
  generatePaginationLinks();
  updatePaginationButtons();
  generateEntriesText(); // Tambahkan ini untuk memperbarui teks entri saat halaman pertama dimuat
});
