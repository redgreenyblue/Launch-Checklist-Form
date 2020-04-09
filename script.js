/*
Programmer:  Rodney Halbert
Assignment #5:  Launch Checklist-Form
Date: 04/09/2020
*/

// Write your JavaScript code here!

//Load elements used in query function.
window.addEventListener('load', function() {
   let form = document.querySelector('form');
   let pilotName = document.getElementById('pilotName');
   let copilotName = document.getElementById('copilotName');
   let fuelLevel = document.getElementById('fuelLevel');
   let cargoMass = document.getElementById('cargoMass');
   let faultyItems = document.getElementById('faultyItems');
   let launchStatus = document.getElementById('launchStatus');
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let cargoStatus = document.getElementById('cargoStatus');

   //Boolean check on text input for alphabet and white space characters only.
   function validateText (inputText) {
      let letters = /^[a-zA-Z+\s]+$/;
      if (inputText.value.match(letters))
      {
         return true;
      } else {
         return false;
      }
   }
   
   //Function where pressing enter checks the validity of user input. Then returns window alerts or strings in the mission status text box.
   form.addEventListener('submit', function(event) {
      pilotNameInput = document.querySelector('input[name=pilotName]');
      copilotNameInput = document.querySelector('input[name=copilotName]');
      fuelLevelInput = document.querySelector('input[name=fuelLevel]');
      cargoMassInput = document.querySelector('input[name=cargoMass]'); 
      if (pilotNameInput.value === '' || copilotNameInput.value === '' || fuelLevelInput.value === '' || cargoMassInput.value === '') 
      {
         alert('All fields are required!');
         event.preventDefault();
      } else if (validateText(pilotNameInput) === false || validateText(copilotNameInput) === false)
      {
         alert('Pilot and/or copilot name(s) must only contain text.');
         event.preventDefault(); 
      } else if (isNaN((fuelLevelInput.value)) || isNaN((cargoMassInput.value)))
      {
         alert('Fuel level and/or cargo mass must be numbers.');
         event.preventDefault();
      } else {
         faultyItems.style.visibility = 'visible';
         pilotStatus.innerHTML = `Pilot:  ${pilotName.value} is ready for launch.`;
         copilotStatus.innerHTML = `Co-pilot:  ${copilotName.value} is ready for launch`;  
         if (fuelLevel.value < 10000) 
         {
         faultyItems.style.visibility = 'visible';
         fuelStatus.innerHTML = 'There is not enough fuel for the journey.';
         launchStatus.innerHTML = 'Shuttle is not ready for launch.';
         launchStatus.style.color = 'red'; 
         } else if (cargoMass.value > 10000) {
         faultyItems.style.visibility = 'visible';
         cargoStatus.innerHTML = 'There is too much mass for the shuttle to take off.';
         launchStatus.innerHTML = 'Shuttle is not ready for launch.';
         launchStatus.style.color = 'red';       
         } else {
            fuelStatus.innerHTML = `Fuel Level:  ${fuelLevel.value} liters is high enough for launch.`;
            cargoStatus.innerHTML = `Cargo Mass:  ${cargoMass.value} kilograms is low enough for launch.`;
            faultyItems.style.visibility = 'visible';
            launchStatus.innerHTML = 'Shuttle is ready for launch.';
            launchStatus.style.color = 'green';
            }
            event.preventDefault(); 
         };

         //Request JSON data from a randomly selected class to display in "Mission Destination" box.
         window.fetch ('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
            response.json().then( function(json) {
               const div = document.getElementById('missionTarget');
               let i = Math.floor(Math.random()*6);
                  div.innerHTML = `
                     <h2>Mission Destination</h2>
                     <ol>
                     <li>Name: ${json[i].name}</li>
                     <li>Diameter: ${json[i].diameter}</li>
                     <li>Star: ${json[i].star}</li>
                     <li>Distance from Earth: ${json[i].distance}</li>
                     <li>Number of Moons: ${json[i].moons}</li>
                     </ol>
                     <img src='${json[i].image}'></img>
                  `;
            });
         });
   });
});
