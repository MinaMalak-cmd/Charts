let valueArr=[];
let sum=0;
let counter=0;
document.getElementsByTagName("button")[0].addEventListener("click",()=>{
    sum=0;
    // const parent=document.getElementById("canvasElements");
    // parent.style.display='none';
    for (let i= 1; i< document.forms[0].length&&i<=12; i+=3) {
        if(document.forms[0].elements[i].value!=''&&document.forms[0].elements[i+1].value!=''){
            valueArr.push({name:document.forms[0].elements[i].value,
                percentage:document.forms[0].elements[i+1].value,
                color:document.forms[0].elements[i+2].value}); 
        }
        else{
           document.getElementsByClassName("alert")[0].style.display="block";
           document.forms[0].reset();
        }                  
    }

        if(valueArr !=[]&&valueArr.length==4){
            // parent.style.display='block';
            for (let i= 0; i< valueArr.length; i++) {
                sum+=parseInt(valueArr[i].percentage);
            }
            if(document.forms[0].elements[13].checked)
                drawPieChart();
            if(document.forms[0].elements[14].checked)
                drawDoughnutChart();
            if(document.forms[0].elements[15].checked)
                drawLineChart();
            if(document.forms[0].elements[16].checked)
                drawBarChart(); 
        } 
    
    valueArr=[];
});


const drawPieChart=() =>
{ 
const canvas=document.getElementById("mycanvas");
    if (canvas.getContext) 
    {        
        const context=canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        let startAngle=0;
        let endAngle=0;
        let radius=100;
        let cx=canvas.width/2;
        let cy=canvas.height/2;  
        let colorArr=[];     
        for (let i= 0; i< valueArr.length; i++) {
            let sliceAngle =2 *Math.PI*(valueArr[i].percentage/sum);
            colorArr.push(valueArr[i].color);
            context.beginPath();
            context.fillStyle=colorArr[i];
            context.moveTo(cx,cy);
            endAngle=startAngle+sliceAngle;
            context.arc(cx,cy,radius,startAngle,endAngle,false);
            context.lineTo(cx,cy);
            context.stroke();
            context.fill();
            startAngle+=sliceAngle;
        }        
        console.log(valueArr);
    } 
}
const drawDoughnutChart=() =>
{ 
const canvas2=document.getElementById("mycanvas2");
    if (canvas2.getContext) 
    { 
        const context2=canvas2.getContext("2d");
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        let startAngle=0;
        let endAngle=0;
        let radius=100;
        let cx=canvas2.width/2;
        let cy=canvas2.height/2;  
        let colorArr=[];        
        for (let i= 0; i< valueArr.length; i++) {
            let sliceAngle =2 *Math.PI*(valueArr[i].percentage/sum);            
            colorArr.push(valueArr[i].color);
            context2.beginPath();
            context2.fillStyle=colorArr[i];
            context2.moveTo(cx,cy);
            endAngle=startAngle+sliceAngle;
            context2.arc(cx,cy,radius,startAngle,endAngle,false);
            context2.lineTo(cx,cy);
            context2.stroke();
            context2.fill();
            startAngle+=sliceAngle;
        }
        let startAngle2=0;
        let endAngle2=2 *Math.PI;
        let radius2=20;                
        context2.beginPath();        
        context2.fillStyle="white";
        context2.moveTo(cx,cy);            
        context2.arc(cx,cy,radius2,startAngle2,endAngle2,false);
        context2.lineTo(cx,cy);
        context2.fill();
    }       
} 

const drawBarChart=()=>{
    document.querySelectorAll("svg")[1].style.display='inline-block';
    let initialX=10;
    //To get Height of path in SVG
    let height=document.querySelector(".y.axis path").getBoundingClientRect().height-30;
    const rect=document.createElement('rect');
    for (let i= 0; i< valueArr.length; i++) {
    // document.querySelectorAll(".x.axis text")[i].innerHTML=
    //     valueArr[i].name;
    document.querySelectorAll("#uni1 .x.axis text")[i].innerHTML=
            valueArr[i].name;
    document.querySelectorAll(".bar")[i].style.fill=
        valueArr[i].color;
    // document.querySelectorAll("rect")[i].style.display='inline-block';
    document.querySelectorAll("rect")[i].setAttribute('y',(height+29)-(((valueArr[i].percentage)/sum)*height));
    document.querySelectorAll("rect")[i].setAttribute('height',((valueArr[i].percentage)/sum)*height);
     /*******************Add rect Element**********************************************************/    
     /*  
     rect.setAttribute('width',31);
     rect.setAttribute('height',((valueArr[i].percentage)/sum)*height);
     rect.setAttribute('x',initialX);
     rect.setAttribute('y',height-(((valueArr[i].percentage)/sum)*height));
     rect.setAttribute('class','bar');
    //  rect.style.fill= valueArr[i].color;
        document.querySelectorAll("svg g")[0].appendChild(rect);
      initialX+=50;
    */
    }
}


const drawLineChart=()=>{
    let initialX=25.5;
    let points='0,0 ';
    document.querySelectorAll("svg")[0].style.display='inline-block';
    let height2=document.getElementById("y-axis").getBoundingClientRect().height;
    //height of y-axis=-358, start from 0,0 25.5   
    //To get Height of path in SVG   
    for (let i= 0; i< valueArr.length; i++) {
    document.querySelectorAll(".x.axis text")[i].innerHTML=
        valueArr[i].name;
        points+=`${initialX},${-((valueArr[i].percentage)/sum)*height2} `;
        initialX+=50;
    // document.querySelectorAll("rect")[i].setAttribute('y',(height+29)-(((valueArr[i].percentage)/sum)*height));
    // document.querySelectorAll("rect")[i].setAttribute('height',((valueArr[i].percentage)/sum)*height);    
    }
 document.querySelector("svg g polyline").setAttribute('points',points);
}
/****************************************Enhancement**************************************** */
//handle style of last table of svg [Bar Chart] 
//labels for all charts
//dotted lines for y&x axes
//Draw button when pressed for second time doesn't check conditions of drawing for the second time
