
const params = new URLSearchParams(window.location.search);
const page = Number(params.get("page")) || 1;
const search = params.get("search");
const department = params.get("department");
let searchURL;

if(search){
    searchURL = "https://collectionapi.metmuseum.org/public/collection/v1.1/search?q=" + search;
}else if(department){
    searchURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=" + department;
}else{
    searchURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
}

fetch(searchURL)
    .then(response => {
        return response.json();
    })
        .then(data => {
        const start = (page - 1) * 10;
        const end = start + 10;
        const objectIDs = data.objectIDs.slice(start, end);
        const totalPages = Math.ceil(data.objectIDs.length / 10);
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(totalPages, page + 2);
        const pagination = document.getElementById("pagination");
        const first = document.createElement("a");

        first.href = "collection.html?page=1";
        first.textContent = "First";
        first.className = "btn btn-outline-dark me-2";
        if(page == 1){
            first.classList.add("disabled");
        }
        pagination.appendChild(first);

        const previous = document.createElement("a");
        previous.href = "collection.html?page=" + (page - 1);
        previous.textContent = "<- Previous";
        previous.className = "btn btn-outline-dark me-2";

        if(page == 1){
            previous.classList.add("disabled");
        }
        pagination.appendChild(previous);

        for(let i = startPage; i <= endPage; i++){
            const button = document.createElement("a");

            button.href = "collection.html?page=" + i;
            button.textContent = i;
            button.className = "btn btn-outline-dark me-2";

            pagination.appendChild(button);
        }

        const next = document.createElement("a");
        next.href = "collection.html?page=" + (page + 1);
        next.textContent = "Next ->";
        next.className = "btn btn-outline-dark";

        if(page == totalPages){
            next.classList.add("disabled");
        }
        pagination.appendChild(next);

        const last = document.createElement("a");
        last.href = "collection.html?page=" + totalPages;
        last.textContent = "Last";
        last.className = "btn btn-outline-dark";

        if(page == totalPages){
            last.classList.add("disabled");
        }
        pagination.appendChild(last);

        const artworksContainer = document.getElementById("artworks");

        for(let i = 0; i < objectIDs.length; i++){
        
            const objectURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectIDs[i];

            fetch(objectURL).then(response => {
                return response.json();
            })
            .then(object => {
                const title = document.createElement("h2");
                title.textContent = object.title;

                const image = document.createElement("img");

                const artwork = document.createElement("div");
                artwork.className = "col-md-6";

                if(object.primaryImageSmall){
                    image.src = object.primaryImageSmall;
                } else {
                    image.src = "images/Placeholder.png";
                }
                const link = document.createElement("a");
                link.href = "object.html?objectId=" + object.objectID;
                image.className = "img-fluid rounded";

                link.appendChild(title);
                link.appendChild(image);
                artwork.appendChild(link);
                artworksContainer.appendChild(artwork);
                
            })
        }        
    });

