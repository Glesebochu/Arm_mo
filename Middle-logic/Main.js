import {display} from './Session.js';
import {Session} from '';

function main(){
    document.getElementById('startButton').addEventListener('click',()=>{
        var session=Session(stage,activity,goal,motivations,distractions,ahaMomentsCount,prepDuration,transitionDuration,startDuration,endDateTime,totalDuration);
    })    
    document.getElementById('stopButton').addEventListener('click',()=>{
        // Display session summary at the end of the session
        display(session);
        // Save session object in the database

    })
    document.getElementById('showHistory').addEventListener('click',()=>{
        // Displays player history in History.html in table format

    })
}