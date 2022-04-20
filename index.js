import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

let today = "Não, hoje não é feriado";
const todayDate = new Date().toLocaleDateString();
const holidays = [
    { date: "01/01/2022", name: "Confraternização mundial", month:"1"},
    { date: "03/01/2022", name: "Carnaval", month:"1" },
    { date: "17/04/2022", name: "Páscoa", month:"4" },
    { date: "21/04/2022", name: "Tiradentes", month:"4" },
    { date: "01/05/2022", name: "Dia do trabalho", month:"5" },
    { date: "16/06/2022", name: "Corpus Christi", month:"6" },
    { date: "07/09/2022", name: "Independência do Brasil", month:"9" },
    { date: "12/10/2022", name: "Nossa Senhora Aparecida", month:"10" },
    { date: "02/11/2022", name: "Finados", month:"11" },
    { date: "15/11/2022", name: "Proclamação da República", month:"11" },
    { date: "25/12/2022", name: "Natal", month:"12" }
  ];

app.get("/holidays",(request,response)=>{
    let holidaysBoard = ``;
    for(let i=0; i<holidays.length; i++){
        holidaysBoard+=`<p>${holidays[i].date}: ${holidays[i].name}</p>`;
    }
      response.send(holidaysBoard);
});
app.get("/is-today-holiday",(request,response)=>{
    for(let i=0; i<holidays.length; i++){
        if(todayDate===holidays[i].date){
            today=`<p>Sim, hoje é <strong>${holidays[i].name}</strong></p>`;
            break;
        }
    }
    response.send(today);
});
app.get("/holidays/:month",(request,response)=>{
    const month = request.params.month;
    let holidaysBoard = ``;
    for(let i=0; i<holidays.length; i++){
        if(holidays[i].month===month){
            holidaysBoard+=`<p>${holidays[i].date}: ${holidays[i].name}</p>`;
        }
    }
    if(holidaysBoard.length===0){
        holidaysBoard+=`<p>Não há feriados para este mês... é uma pena T-T</p>`;
    }
      response.send(holidaysBoard);
});

app.listen(5000,()=>{
    console.log("Servidor ok / "+todayDate+" / "+holidays[0].date)
});