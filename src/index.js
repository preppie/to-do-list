import "./styles.css";

let listactiv = [
  { id: 17, activitate: "Spăl mașina", activ: true, dezactiv: false },
  { id: 19, activitate: "Fac cumpărături", activ: false, dezactiv: false },
  { id: 20, activitate: "Merg la sală", activ: false, dezactiv: false },
  {
    id: 77,
    activitate: "Citesc cursul 3 la IAP",
    activ: false,
    dezactiv: false,
  },
  {
    id: 90,
    activitate: "Comand ceva de mâncare",
    activ: false,
    dezactiv: false,
  },
  {
    id: 80,
    activitate: "Mă întâlnesc cu prietenii",
    activ: false,
    dezactiv: false,
  },
];

const ellista = (obiect) => {
  const activ = obiect.activ ? " active" : "";

  const butoane = obiect.activ
    ? `<div>
  <button type="button" class="btn btn-danger">
    <i id="${"d" + obiect.id}" class="fa fa-times"></i>
  </button> 
  <button type="button" class="btn btn-info">
    <i id="${"g" + obiect.id}" class="fa fa-check"></i>
  </button>
</div>`
    : "";

  const ariadis = obiect.activ
    ? ` aria-current="true"`
    : obiect.dezactiv
    ? ` aria-disabled="true"`
    : "";

  const dezactiv = obiect.dezactiv ? " disabled" : "";
  const butdezactiv = obiect.dezactiv
    ? `<div>
  <i class="fa fa-check"></i>
    </div>`
    : "";

  const sircar = `
  <li class="list-group-item${activ}${dezactiv}"${ariadis}>
    <div class="d-flex justify-content-between align-items-center">
      <div id="${"e" + obiect.id}">${obiect.activitate}</div>
      ${butoane}
      ${butdezactiv}
    </div>
  </li>
  `;
  return sircar;
};

const afisez = () => {
  // Prima parte, cod HTML invariabil
  const inceput = `
    <div class="container">
      <h5 class="pt-3 pb-3 mb-0 text-center" style="color: #FFF; background-color: #777;">
        <i class="fa fa-list"></i> To-do list </h5>
      <ul class='list-group'>
    `;

  //  Adaug apoi elementele <li>, generate de funcția ellista() si finalul (</ul></div>)
  const continut =
    listactiv.map(ellista).reduce((html, item) => html + item, inceput) +
    "</ul></div>";

  document.getElementById("app").innerHTML = continut;
};

afisez();

const selectare = (evn) => {
  // Verific daca elementul are id si, daca are, cu ce litera incepe
  if (evn.target.id) {
    const primulCar = evn.target.id.charAt(0);
    const idsel = parseInt(evn.target.id.substr(1), 10); //  Separ id-ul
    //  In functie de prima litera, editez in lista de obiecte
    switch (primulCar) {
      case "e":
        //  Elementul selectat devine activ (activ: true)
        listactiv = listactiv.map((item) => {
          item.activ = item.id === idsel ? true : false; //  Folosesc operatorul ternar
          return item;
        });
        break;

      case "d":
        //  Elementul selectat se sterge din lista
        listactiv = listactiv.filter((item) => {
          if (item.id !== idsel) {
            return true;
          }
          return false;
        });
        //  Cautam primul element care este inactiv pentru a-l putea face activ
        const elemInactiv = listactiv.find((item) => {
          return item.dezactiv !== true;
        });
        if (elemInactiv) elemInactiv.activ = true;
        break;

      case "g":
        // Elementul curent se marcheaza ca realizat
        listactiv = listactiv.map((item) => {
          item.activ = false;
          item.dezactiv = item.id === idsel ? true : item.dezactiv;
          return item;
        });
        //  Cautam primul element care este inactiv pentru a-l putea face activ
        const elementInactiv = listactiv.find((item) => {
          return item.dezactiv !== true;
        });
        if (elementInactiv) elementInactiv.activ = true;
        break;
      default:
    }
    //  Reafisez lista
    afisez();
  }
};

document.querySelector("#app").onclick = selectare;
