let listMensagens = [];

//Carrega as mensagens da Servidor
function carregarMensagens(resposta) {
  listMensagens = resposta.data;
  renderizarMensagens(listMensagens);
  
}

function tratarErro(erro) {
  console.log(erro.response);
}

const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

promessa.then(carregarMensagens);
promessa.catch(tratarErro);

//Cria o tipo de mensagem baseado nos objetos
function MensagemDiv(mensagem) {
  if (mensagem.to === "Todos"){
    if(mensagem.type === "message"){
    return `
    <div class="mensagem">
      <div class="mensagemT">  
        <span class="time">(${mensagem.time})</span>
        <span class="from">${mensagem.from}</span>
        para
        <span class="to">${mensagem.to}</span>
        <span class="text">${mensagem.text}</span>
      </div>
    </div>
      `;}
    else{
      return `
      <div class="mensagem">
        <div class="mensagemS">  
          <span class="time">(${mensagem.time})</span>
          <span class="from">${mensagem.from} </span>
          <span class="text">${mensagem.text}</span>
        </div>
      </div>
      `;}
    }
  // else{
  //   return `
  //   <div class="mensagem">
  //     <div class="mensagemR">  
  //       <span class="time">(${mensagem.time})</span>
  //       <span class="from">${mensagem.from}</span>
  //       para
  //       <span class="to">${mensagem.to}</span>
  //       <span class="text">${mensagem.text}</span>
  //     </div>
  //   </div>
  //     `;}
  else if(mensagem.to !== "Todos" && (mensagem.to === usuario || mensagem.from === usuario)){
    return `
    <div class="mensagem">
      <div class="mensagemR">  
        <span class="time">(${mensagem.time})</span>
        <span class="from">${mensagem.from}</span>
        para
        <span class="to">${mensagem.to}</span>
        <span class="text">${mensagem.text}</span>
      </div>
    </div>
      `;}
  else{
    return `
    <div class="mensagemSecreta"></div>`
  }
}


//Mostra na tela as mensagens vindas do Servidor
function renderizarMensagens(mensagens) {
  let chat = document.querySelector(".chat");
  chat.innerHTML = "";

  for (let i = 0; i < mensagens.length; i++) {
    const mensagem = mensagens[i];
    chat.innerHTML += MensagemDiv(mensagem);
  }
}

const chatAtual = () => {
  const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
  promessa.then(carregarMensagens);
  promessa.catch(tratarErro);
  let elementoQueQueroQueApareca = document.querySelector('.chat');
  let ultimaMensagem = elementoQueQueroQueApareca.lastElementChild
  ultimaMensagem.scrollIntoView(false);
}

const atualizar = () =>window.location.reload();

let destino ="Todos";

function enter(){
  let mensagemEnviar = document.querySelector(".enter").value;
  let objEnviarMensagem = {
    from: usuario,
    to: destino,
    text: mensagemEnviar,
    type: "message" // ou "private_message" para o bônus
  }
  const envioMensagem =axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",objEnviarMensagem);
  envioMensagem.then(chatAtual);
  envioMensagem.catch(atualizar);
}

var input = document.querySelector(".enter");
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector(".click").click();
  }
});

let aviso = document.querySelector(".enviar");
aviso.innerHTML=""
  aviso.innerHTML = `<input class="enter"type="text" name="escrever" placeholder="Escreva aqui...">
  <ion-icon onclick="enter()" class="click" name="paper-plane-outline"></ion-icon>
  <div class="aviso">Enviando para ${destino}</div>
  `;
console.log(aviso.innerHTML);

const paraQuem = () =>{
  destino = prompt("Para quem voce deseja mandar mensagem?");
  aviso.innerHTML=""
  aviso.innerHTML = `<input class="enter"type="text" name="escrever" placeholder="Escreva aqui...">
  <ion-icon onclick="enter()" class="click" name="paper-plane-outline"></ion-icon>
  <div class="aviso">Enviando para ${destino}</div>
  `;
}


let usuario = prompt("Qual o seu nome?");

let objUsuario = {
  name:usuario
};

const envio = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objUsuario);

const participantes = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");

function repetido(envio){
  console.log(envio.response.status);
  while(envio.response.status === 400){
    usuario = prompt("Qual o seu nome?");
    objUsuario = {
      name:usuario
    };

    envio = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objUsuario);
    envio.then(login);
    envio.catch(repetido);
    }
}

function login(envio){
  console.log(envio.status);
}

envio.then(login);
envio.catch(repetido);

const presenca = () =>{
  axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objUsuario);
}
setInterval(presenca,5000);

const refresh = () =>{
  const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
  promessa.then(carregarMensagens);
  promessa.catch(tratarErro);
  let elementoQueQueroQueApareca = document.querySelector('.chat');
  let ultimaMensagem = elementoQueQueroQueApareca.lastElementChild
  ultimaMensagem.scrollIntoView(false);
}
setInterval(refresh,3000);