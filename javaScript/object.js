


const params = new URLSearchParams(window.location.search);
const objectId = params.get("objectId");
const objectURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectId;

fetch(objectURL)
    .then(response => {
        return response.json();
    })
    .then(object => {    
        const objectContainer = document.getElementById("object");

        const title = document.createElement("h1");
        title.textContent = object.title;
        objectContainer.appendChild(title);

        const image = document.createElement("img");
        if(object.primaryImageSmall){
            image.src = object.primaryImageSmall;
        } else {
            image.src = "images/Placeholder.png";
        }
        image.className = "img-fluid rounded mb-4";
        objectContainer.appendChild(image);


        const department = document.createElement("p");
        department.textContent = "Department: " + object.department;
        objectContainer.appendChild(department);

        const date = document.createElement("p");
        date.textContent = "Date: " + object.objectDate;
        objectContainer.appendChild(date);

        const period = document.createElement("p");
        period.textContent = "Period: " + object.period;
        objectContainer.appendChild(period);

        const medium = document.createElement("p");
        medium.textContent = "Medium: " + object.medium;
        objectContainer.appendChild(medium);
    });