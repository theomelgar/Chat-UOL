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
  else if(mensagem.to === usuario){
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

function enter(){
  let mensagemEnviar = document.querySelector(".enter").value;

  let objEnviarMensagem = {
    from: usuario,
    to: "Todos",
    text: mensagemEnviar,
    type: "message" // ou "private_message" para o bônus
  }
  const envioMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",objEnviarMensagem);
   envioMensagem.then(chatAtual);
   envioMensagem.catch(atualizar);
}



let usuario = document.querySelector(".logar").value;
let objUsuario = {
  name:usuario
};

function criarUsuario(){
  let usuario = document.querySelector(".logar").value;
  let objUsuario = {
    name:usuario
  };
}

function entrarChat(){
  const aparecer = document.querySelector(".escondido");
  aparecer.classList.remove("escondido");
  const sumir = document.querySelector(".login");
  sumir.classList.add("escondido");
}

const envio = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objUsuario);

const participantes = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");

function repetido(envio){
  console.log(envio.response.status);
  while(envio.response.status === 400){
    usuario = document.querySelector(".logar").value;
    let objUsuario = {
      name:usuario
    };

    envio = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objUsuario);
    envio.then(entrarChat);
    envio.catch(repetido);
    }
}

const entrarVerde = () => {
  let inputLogin = document.querySelector(".logar").value;
  console.log(inputLogin)
  const entrar = document.querySelector(".entrar");
  if (inputLogin.length >= 1){
    entrar.classList.add("verde");
  }
  else{
    entrar.classList.remove("verde");
  }
}

var input = document.querySelector(".enter");
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector(".click").click();
    input.innerHTML = "";
  }
});


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

setInterval(entrarVerde,300);
setInterval(refresh,3000);