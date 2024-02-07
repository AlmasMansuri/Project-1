let typebtn = document.querySelector("#typeBtn");
let bodybtn = document.querySelector("#bodyBtn");
let equipbtn = document.querySelector("#equipBtn");
let targetbtn = document.querySelector("#targetBtn");

let typeSelc = document.querySelector("#typeSel");
let bodySelc = document.querySelector("#bodySel");
let equipSelc = document.querySelector("#equipSel");
let targetSelc = document.querySelector("#targetSel");

let typeDiv = document.querySelector("#typeDiv");
let bodyPartDiv = document.querySelector("#bodyPartDiv");
let equipDiv = document.querySelector("#equipDiv");
let targetDiv = document.querySelector("#targetDiv");
let evListDiv = document.querySelector("#exerciseList");

//------ addevent on type button---------//
typebtn.addEventListener("click", async (e) => {
  e.preventDefault();
  //------get the value of option & save it-----//
  let selection = typeSelc.value;
  console.log(selection);

  let optList = "";
  //--------if choosen option is bodypart then get the bodypartlist------//
  if (selection == "bodyPart") {
    let bodyPartList = await getBodypartList();
    console.log(bodyPartList);
    //--------------showing bodypart div and hiding rest---------//
    bodyPartDiv.style.display = "block";
    equipDiv.style.display = "none";
    targetDiv.style.display = "none";

    //--------------run the for loop to get the bodypartlist in to the options---------//
    for (let i = 0; i < bodyPartList.length; i++) {
      optList += `<option>${bodyPartList[i]}</option>`;
    }

    bodySelc.innerHTML = "";
    bodySelc.innerHTML = optList;

    //-------------if choosen option is target type--------------//
  } else if (selection == "target") {
    //----------------showing target & hididng rest-----------------//
    bodyPartDiv.style.display = "none";
    equipDiv.style.display = "none";
    targetDiv.style.display = "block";
    //--------------------get the targetlist from API function at the bottom-------------//
    let targetList = await getTargetList();
    for (let i = 0; i < targetList.length; i++) {
      optList += `<option>${targetList[i]}</option>`;
    }
    targetSelc.innerHTML = "";
    targetSelc.innerHTML = optList;

    //----------------showing equipment and hiding pthers-------------//
  } else {
    bodyPartDiv.style.display = "none";
    equipDiv.style.display = "block";
    targetDiv.style.display = "none";

    let equipList = await getEquipmentList();

    for (let i = 0; i < equipList.length; i++) {
      optList += `<option>${equipList[i]}</option>`;
    }
    equipSelc.innerHTML = "";
    equipSelc.innerHTML = optList;
  }
});

//---------addevent on BodyBtn-------------------//
bodybtn.addEventListener("click", async function (e) {
  e.preventDefault();
  //-----------------select value from body part and save it in local variable-------------------//
  let selValue = bodySelc.value;
  //-----------exercise listvalue by bodypart -----------------//
  console.log("body btn clicked " + selValue);
  let exList = await getExerciseByBodypart(selValue);
  console.log(exList);
  //--------------call showExer func with exerc list-------------------//
  showExercise(exList);
});

//----------------------show exercice with equipment-----------------//
equipbtn.addEventListener("click", async function (e) {
  e.preventDefault();
  let selValue = equipSelc.value;
  console.log("equip btn clicked " + selValue);
  let exList = await getExerciseByEquipment(selValue);
  showExercise(exList);
});
//------------------call show exercise with target---------------------------//
targetbtn.addEventListener("click", async function (e) {
  e.preventDefault();
  let selValue = targetSelc.value;
  console.log("target btn clicked " + selValue);
  let exList = await getExerciseByTarget(selValue);
  showExercise(exList);
});
//-----------------------------------show cards with image and instruction--------//

let showExercise = function (exLst) {
  evListDiv.innerHTML = "";
  for (let i = 0; i < exLst.length; i++) {
    let insList = "";
    for (let j = 0; j < exLst[i].instructions.length; j++) {
      insList += `<li>${exLst[i].instructions[j]}</li>`;
    }

    evListDiv.innerHTML += ` <div class="col">
    <div class="card h-100">
          <img src="${exLst[i].gifUrl}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${exLst[i].name}</h5>
            <p class="card-text">
            <ul> 
             ${insList} </ul>
            </p>
          </div>
        </div>`;
  }
};

//----------------------------------------------------------------------------------------------------------------
let getBodypartList = async function () {
  const url = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8c91ff626fmsh02f0820900b3e88p189815jsn319b89410e9a",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

let getEquipmentList = async function () {
  const url = "https://exercisedb.p.rapidapi.com/exercises/equipmentList";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8c91ff626fmsh02f0820900b3e88p189815jsn319b89410e9a",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

let getTargetList = async function () {
  const url = "https://exercisedb.p.rapidapi.com/exercises/targetList";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8c91ff626fmsh02f0820900b3e88p189815jsn319b89410e9a",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

let getExerciseByBodypart = async function (part) {
  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${part}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8c91ff626fmsh02f0820900b3e88p189815jsn319b89410e9a",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
let getExerciseByEquipment = async function (equip) {
  const url = `https://exercisedb.p.rapidapi.com/exercises/equipment/${equip}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8c91ff626fmsh02f0820900b3e88p189815jsn319b89410e9a",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
let getExerciseByTarget = async function (target) {
  const url = `https://exercisedb.p.rapidapi.com/exercises/target/${target}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8c91ff626fmsh02f0820900b3e88p189815jsn319b89410e9a",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
