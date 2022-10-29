let listMensagens = [];

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
  else{
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
}


function renderizarMensagens(mensagens) {
  let chat = document.querySelector(".chat");
  chat.innerHTML = "";

  for (let i = 0; i < mensagens.length; i++) {
    const mensagem = mensagens[i];
    chat.innerHTML += MensagemDiv(mensagem);
  }
}

const refresh = () =>{
  const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
  promessa.then(carregarMensagens);
  promessa.catch(tratarErro);
  let elementoQueQueroQueApareca = document.querySelector('.chat');
  let ultimaMensagem = elementoQueQueroQueApareca.lastElementChild
  ultimaMensagem.scrollIntoView(false);
}
setInterval(refresh,3000);

