window.onload=function()
{
new_board();
timer_initialiser();
}
var sec_count,min_count,stop,timerPause=0;
function new_board()
{
random_assign();
var table = document.getElementById("game-board");
if (table != null) 
{
    for (var i = 0; i < table.rows.length; i++) 
	{
        for (var j = 0; j < table.rows[i].cells.length; j++)
		{
			table.rows[i].cells[j].onclick = function () 
				{
				if(timerPause==0)
				{
					moves++;
					memoryFlipTile(this);
				}
				}
			table.rows[i].cells[j].innerHTML="<img src='tile.jpg'><p id='number'>"
		}
	}
}
}
function pause_timer()
{
clearInterval(stop);
timerPause=1;
}
function timer_initialiser()
{	
	sec_count=0;
	min_count=3;
	document.getElementById("min").innerHTML="0"+3;
	document.getElementById("sec").innerHTML="0"+0;
	main_timer();
}
function replay()
{
	timer_initialiser();
	score=0;
	moves=0;
	new_board();
}
function main_timer()
{
timerPause=0;	
clearInterval(stop);
stop=setInterval(function(){
if(sec_count==0 && min_count>0)
	{
	min_count-=1;
	sec_count=59;
	}
else if(min_count==0 && sec_count==0)
	{
	alert("Game Over... Score "+score+" number of moves"+moves/2);
	replay();
	}
else 
sec_count--;
document.getElementById("min").innerHTML=(min_count>=0 && min_count<10)?('0'+min_count):min_count;
document.getElementById("sec").innerHTML=(sec_count>=0 && sec_count<10)?('0'+sec_count):sec_count;
},1000);
}


var flag=0;
var possible="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var memory_values=[];
var memory_tile_ids=[];
var arr=[];
var memory_random=[];
var tiles_flipped=0,moves=0,score=0;

function memoryFlipTile(tile)
{	
	var a=arr.indexOf(parseInt(tile.id));
	var b=Math.floor(a/2);
	
	if(memory_values.length < 2)
	{	
		tile.innerHTML=memory_random[b];
		if(memory_values.length == 0)
		{
		    memory_values.push(memory_random[b]);
			memory_tile_ids.push(tile.id);
		} 
		else if(memory_values.length == 1)
		{
			memory_values.push(memory_random[b]);
			memory_tile_ids.push(tile.id);
				if(memory_values[0] == memory_values[1] && memory_tile_ids[0]!=memory_tile_ids[1])
				{	score++;
					tiles_flipped += 2;
				// Clear both arrays
					memory_values = [];
					
					memory_tile_ids = [];
					
						tile.onclick = function () 
						{
						;
						}
					
							
				// Check to see if the whole board is cleared
					if(tiles_flipped == arr.length)
					{
						alert("Board cleared... Score"+score+" number of moves"+moves/2);
						new_board();
						timer_initialiser();

					}
				}	 
				else 
				{
					function flip2Back()
				{
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.innerHTML="<img src='tile.jpg' style='display:table-cell'>";
				    tile_2.innerHTML = "<img src='tile.jpg' style='display:table-cell'>";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}
		
		

function removeChar(rand1)
{
	var pos=possible.indexOf(rand1);
	var part1=possible.slice(0,pos);
	var part2=possible.slice(pos+1,possible.length);
	possible=part1.concat(part2);
	
}

function random_assign()
{	
	var pos_id,flag=0;
	while(arr.length < 16)
	{
		var randomnumber=Math.floor(Math.random()*16)+1;
		var found=false;
		for(var i=0;i<arr.length;i++)
		{
			if(arr[i]==randomnumber)
			{found=true;break}
		}
		if(!found)
		arr[arr.length]=randomnumber;
	}
	for(var i=0;i<8;i++)
		{
		var rand1=possible.charAt(Math.floor(Math.random()*possible.length));
		removeChar(rand1);
		memory_random[i]=rand1;
		}
}
