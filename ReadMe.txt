Chloe your files are located int app/views/partials/template/header.ejs
you are going to want to do all of the navbar and side bar in this file. once you have completed that it will be as simple as calling this file in any other page that we want.
Write in HTML and dont worry too much about funtionality at this moment we can work on that in sprint 2. if you finish quickly and want to do a little more let me know. there are alot of things to do!!


Sean your files are located in app/views/content/ThreadInfo.ejs

If you look at the app.js file in the app file you can see that the server engine is calling your thread file in the app/routes file. From that app/routes it calls the app/views file and then the app/views/partials/content
to add the extra page for post if you want to test it out. just follow and create similar files in each place and make sure to copy the require in the app.js so the server knows to include it.

IF you have any questions message me and ill try to figure out what is wrong


TO START THE SERVER

OPEN THE FOLDER IN FILE EXPLORER AND SHIFT RIGHT CLICK AND OPEN WINDOWS POWERSHELL OR COMMAND PROMT

AS LONG AS NODE.JS IS INSTALLED YOU SHOULD BE ABLE TO TYPE 

npm start

THIS SHOULD LAUNCH THE SERVER AND YOU WILL BE ABLE TO GO TO A BROWSER AND TYPE

localhost:5656

THIS SHOULD OPEN THE PAGES
AS OF RIGHT NOW NOTHING IS IN THE .EJS FILES SO NOTHING WILL SHOW UP. AS LONG AS YOU DONT GET AN ERROR THAT SAYS

COULD NOT GET /

YOU HAVE DONE EVERYTHING RIGHT. 

IF SOMETHING IS NOT WORKING PROPERLY WHEN USING CHROME RIGHT CLICK ON THE PAGE AND CLICK INSPECT PAGE AND IT SHOULD GIVE YOU ERRORS IN THE HTML VIEWER.
THIS IS A GOOD WAY TO DEBUG YOUR CODE. IT IS VERY HARD TO DEBUG WITH ANY IDE BECAUSE IT IS LOADED FROM THE NODE.JS SERVER

HAVE FUN AND LET ME KNOW IF YOU NEED ANYTHING