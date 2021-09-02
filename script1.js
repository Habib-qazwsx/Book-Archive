const searchData = () => {
  document.getElementById("spinner").style.display = "block";
  document.getElementById("results").textContent = " ";
  document.getElementById("totalFound").textContent = " ";

  const searchText = document.getElementById("input-text").value;
  fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayResult(data));
  document.getElementById("input-text").value = " ";
};

const displayResult = (data) => {
  document.getElementById("spinner").style.display = "none";
  let i = 0;

  // cheak no found result
  if (data.docs.length === 0) {
    const p = document.createElement("p");
    p.innerText = "No result found";
    document.getElementById("totalFound").appendChild(p);
  } else {
    data.docs.forEach((result) => {
      const url = `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`;

      if (result.cover_i) {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card h-100">
                        <img src="${url}" class="card-img-top" alt="not found">
                        <div class="card-body">
                            <h5 class="card-title">${result.title}</h5>
                            <p>${
                              result.author_name ? result.author_name : " "
                            }</p>
                            <p>${
                              result.first_publish_year
                                ? result.first_publish_year
                                : " "
                            }</p>
                        </div>
                    </div>
            `;
        document.getElementById("results").appendChild(div);
        i++;
      }
    });
  }
  // total found books
  const p = document.createElement("p");
  p.innerHTML = `
  <p>${i} of ${data.numFound}</p>
  `;
  document.getElementById("totalFound").appendChild(p);
};
