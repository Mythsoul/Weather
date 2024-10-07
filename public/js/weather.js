document.addEventListener("DOMContentLoaded" , function(){
    const form = document.querySelector(".search-form");
    form.addEventListener("submit" , async function(e){
   
        const Search = document.querySelector(".Search").value;
        
            const data = await fetch(`/weather?Search=${Search}`); 
            console.log(data); 
       
    })
})