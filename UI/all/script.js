const getData = async function(){
    const response = await fetch('/api');
    const data = await response.json();
    return await data;
}


const main = async function(){
    const data = await getData();
    console.log(await data);
    displayData(await data);
}

const displayData = function(data){
    const root = document.getElementById('root');
    generate(root, data);
}

const generate = function(root, data){
    for(item of data){
        var position;
        var time;
        var mood;
        var img;
        if(item.lat && item.lon){
            position = document.createElement('div');
            position.innerText = `position: ${item.lat}°, ${item.lon}°`;
        }
        if(item.timestamp){
            time = document.createElement('div');
            time.innerText = `timetamp: ${new Date(item.timestamp).toLocaleString()}`;
            time.classList.add('last');
        }
        if(item.text){
            mood = document.createElement('div');
            mood.innerText=`mood: ${item.text}`;
        }

        if(item.img){
            img = document.createElement('img');
            img.src = item.img;
            img.width=240;
        }
        

        if(mood){
            root.append(mood);
        }
        if(position){
            root.append(position)
        }
        if(img){
            root.append(img);
        }
        if(time){
            root.append(time);
        }
        

    }
}


window.addEventListener('load', main);
