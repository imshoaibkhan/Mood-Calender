const currentYear = 2023;
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octomber",
  "November",
  "December",
];

const colors = ["#2d6b5f", "#72e3a6", "#dff4c7", "#edbf98", "#ea3d36"];
const defaultColor = "#888";
let activeColor = "";

const calender = document.getElementById("calendar");
const moods = document.querySelectorAll(".mood");
const random = document.querySelector("#randomize");
const clear = document.querySelector("#clear");

moods.forEach((mood) => {
  mood.addEventListener("click", () => {
    if (mood.classList.contains("selected")) {
      mood.classList.remove("selected");
      activeColor = defaultColor;
    } else {
      moods.forEach((mood) => {
        mood.classList.remove("selected");
      });
      mood.classList.add("selected");
      activeColor = getComputedStyle(mood).getPropertyValue("color");
    }
  });
});

let getAllDays = (year) => {
  let firstDay = new Date(`January 1 ${year}`);
  let lastDay = new Date(`December 31 ${year}`);

  let days = [firstDay];

  let lastDayInArr = firstDay;

  while (lastDayInArr.getTime() !== lastDay.getTime()) {
    days.push(addDays(lastDayInArr, 1));
    lastDayInArr = days[days.length - 1];
  }
  console.log(days);
  return days;
};

const dates = getAllDays(currentYear);



let monthsHTML = "";

months.forEach((month, i) => {
  monthsHTML += `
    <div class="months month_${i}">
    
    <h3>${month}</h3>
    <div class="week_days_container">
    
        
            ${weekDays
              .map((day) => `<div class="week_days">${day}</div>`)
              .join("")}

    </div>
    <div class="days_container"></div>
    </div>`;
});

calendar.innerHTML = monthsHTML;

dates.forEach(date => {
  const month = date.getMonth();
  const monthEl = document.querySelector(`.month_${month} .days_container`);

  if (date.getDate() === 1 && date.getDay() !== 0) {
    for (let i = 0; i < date.getDay(); i++) {
      const emptySpot = createEmptySpot();

      monthEl.appendChild(emptySpot);
    }
  }

  const dateEl = createDateEl(date);
  monthEl.appendChild(dateEl);
});



// Add click event to all the .circles
let circles = document.querySelectorAll('.circle')

circles.forEach((circle) => {
  circle.addEventListener('click', () => {
    if (circle.style.backgroundColor === activeColor){
      circle.style.backgroundColor= defaultColor
    }else{
      circle.style.backgroundColor= activeColor
    }
    
  })
})

// Randomize functionality

random.addEventListener('click', () => {
  circles.forEach((circle) => {
    circle.style.backgroundColor= getRandomColor()
  })
})

// clear functionality 

clear.addEventListener('click', () => {
  circles.forEach((circle) => {
    circle.style.backgroundColor=defaultColor;
  })
})


// Helper fuctions :

function getRandomColor(){
  return colors[Math.floor(Math.random() * colors.length)]
}

function createEmptySpot() {
  const emptyEl = document.createElement("div");
  emptyEl.classList.add("days");
  return emptyEl;
}

function createDateEl(date) {
  const day = date.getDate();
  const dateEl = document.createElement("div");
  dateEl.classList.add("days");
  dateEl.innerHTML = `<span class="circle">${day}</span>`;

  return dateEl;
}

function addDays(dates, days) {
    var result = new Date(dates);
    result.setDate(result.getDate() + days);
    return result;
  }