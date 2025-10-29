const perguntas = [
  // HTML
  { pergunta: "O que significa HTML?", respostas: [
      { texto: "Linguagem de Marcação de Hipertexto", correta: true },
      { texto: "Linguagem de Programação de Internet", correta: false },
      { texto: "Ferramenta de Edição de Texto", correta: false },
      { texto: "Código de Layout de Páginas", correta: false }
    ] },
  { pergunta: "Qual tag cria um link em uma página HTML?", respostas: [
      { texto: "<a>", correta: true },
      { texto: "<link>", correta: false },
      { texto: "<href>", correta: false },
      { texto: "<url>", correta: false }
    ] },
  { pergunta: "Qual atributo mostra texto alternativo em uma imagem?", respostas: [
      { texto: "alt", correta: true },
      { texto: "title", correta: false },
      { texto: "src", correta: false },
      { texto: "img", correta: false }
    ] },
  { pergunta: "Qual tag cria uma lista ordenada?", respostas: [
      { texto: "<ol>", correta: true },
      { texto: "<ul>", correta: false },
      { texto: "<li>", correta: false },
      { texto: "<dl>", correta: false }
    ] },
  { pergunta: "Qual tag insere uma linha horizontal?", respostas: [
      { texto: "<hr>", correta: true },
      { texto: "<line>", correta: false },
      { texto: "<br>", correta: false },
      { texto: "<border>", correta: false }
    ] },

  // CSS
  { pergunta: "Qual propriedade muda a cor do texto?", respostas: [
      { texto: "color", correta: true },
      { texto: "font-color", correta: false },
      { texto: "text-color", correta: false },
      { texto: "background", correta: false }
    ] },
  { pergunta: "Qual propriedade muda o tamanho da fonte?", respostas: [
      { texto: "font-size", correta: true },
      { texto: "text-size", correta: false },
      { texto: "font-style", correta: false },
      { texto: "size", correta: false }
    ] },
  { pergunta: "Como deixar o texto em negrito no CSS?", respostas: [
      { texto: "font-weight: bold;", correta: true },
      { texto: "font-style: bold;", correta: false },
      { texto: "text-bold: true;", correta: false },
      { texto: "bold: yes;", correta: false }
    ] },
  { pergunta: "Qual propriedade define o espaçamento entre linhas?", respostas: [
      { texto: "line-height", correta: true },
      { texto: "word-spacing", correta: false },
      { texto: "margin", correta: false },
      { texto: "letter-spacing", correta: false }
    ] },
  { pergunta: "Como aplicar estilo a todos os parágrafos?", respostas: [
      { texto: "p {}", correta: true },
      { texto: ".p {}", correta: false },
      { texto: "#p {}", correta: false },
      { texto: "paragraph {}", correta: false }
    ] },

  // JavaScript
  { pergunta: "Qual comando exibe algo no console?", respostas: [
      { texto: "console.log()", correta: true },
      { texto: "mostrar()", correta: false },
      { texto: "exibir()", correta: false },
      { texto: "print()", correta: false }
    ] },
  { pergunta: "Como criamos uma variável em JavaScript?", respostas: [
      { texto: "var, let ou const", correta: true },
      { texto: "variable", correta: false },
      { texto: "v", correta: false },
      { texto: "criar", correta: false }
    ] },
  { pergunta: "Qual símbolo indica um comentário de uma linha?", respostas: [
      { texto: "//", correta: true },
      { texto: "#", correta: false },
      { texto: "/* */", correta: false },
      { texto: "<!-- -->", correta: false }
    ] },
  { pergunta: "Qual função mostra um alerta na tela?", respostas: [
      { texto: "alert()", correta: true },
      { texto: "mensagem()", correta: false },
      { texto: "mostrar()", correta: false },
      { texto: "aviso()", correta: false }
    ] },
  { pergunta: "O que o operador === faz?", respostas: [
      { texto: "Compara valor e tipo", correta: true },
      { texto: "Compara apenas valor", correta: false },
      { texto: "Atribui valor", correta: false },
      { texto: "Soma valores", correta: false }
    ] }
];

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");
const scoreText = document.getElementById("score");
const messageText = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");
const timerElement = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  startQuiz();
});

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  result.classList.add("hidden");
  nextBtn.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timerElement.textContent = timeLeft;
  startTimer();

  const question = perguntas[currentQuestion];
  questionElement.textContent = question.pergunta;
  answersElement.innerHTML = "";

  question.respostas.forEach(resposta => {
    const button = document.createElement("button");
    button.textContent = resposta.texto;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(button, resposta.correta));
    answersElement.appendChild(button);
  });
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      mostrarCorretas();
      nextBtn.classList.remove("hidden");
    }
  }, 1000);
}

function selectAnswer(button, correct) {
  clearInterval(timer);
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach(btn => {
    btn.disabled = true;
    const resposta = perguntas[currentQuestion].respostas.find(r => r.texto === btn.textContent);
    if (resposta.correta) {
      btn.classList.add("correct");
    } else if (btn === button && !resposta.correta) {
      btn.classList.add("wrong");
    }
  });

  if (correct) score++;
  nextBtn.classList.remove("hidden");
}

function mostrarCorretas() {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    const resposta = perguntas[currentQuestion].respostas.find(r => r.texto === btn.textContent);
    if (resposta.correta) btn.classList.add("correct");
  });
}

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < perguntas.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.classList.add("hidden");
  result.classList.remove("hidden");
  scoreText.textContent = score;

  if (score >= 13) {
    messageText.textContent = " Incrível! Você domina HTML, CSS e JavaScript!";
  } else if (score >= 8) {
    messageText.textContent = " Muito bom! Continue praticando!";
  } else {
    messageText.textContent = "Você pode melhorar! Tente novamente!";
  }
}

restartBtn.addEventListener("click", () => {
  result.classList.add("hidden");
  startScreen.classList.remove("hidden");
});