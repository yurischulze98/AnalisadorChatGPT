// ======================================================
// Elements
// ======================================================

const textoChamado = document.getElementById("textoChamado");
const resultadoCrm = document.getElementById("resultadoCrm");
const resultadoSla = document.getElementById("resultadoSla");
const btnAnalisar = document.getElementById("btnAnalisar");
const btnLimpar = document.getElementById("btnLimpar");
const statusElement = document.getElementById("status");


// ======================================================
// Helpers
// ======================================================

function setStatus(message, type = "") {
  statusElement.textContent = message;
  statusElement.className = `status ${type}`.trim();
}

function setLoading(isLoading) {
  btnAnalisar.disabled = isLoading;
  btnAnalisar.textContent = isLoading ? "Analisando..." : "Analisar chamado";
}

function limparResultados() {
  resultadoCrm.value = "";
  resultadoSla.value = "";
}

async function copiarTexto(elementId) {
  const element = document.getElementById(elementId);
  const texto = element.value.trim();

  if (!texto) {
    setStatus("Nao ha texto para copiar.", "error");
    return;
  }

  await navigator.clipboard.writeText(texto);
  setStatus("Texto copiado com sucesso.", "success");
}


// ======================================================
// Main action
// ======================================================

async function analisarChamado() {
  const texto = textoChamado.value.trim();

  limparResultados();

  if (texto.length < 20) {
    setStatus("Informe mais detalhes sobre o chamado antes de analisar.", "error");
    return;
  }

  try {
    setLoading(true);
    setStatus("Gerando atualizacao de CRM e justificativa de SLA...");

    const response = await fetch("/api/analisar-chamado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ texto })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || "Erro ao analisar chamado.");
    }

    resultadoCrm.value = data.crm || "";
    resultadoSla.value = data.sla || "";

    setStatus("Analise gerada com sucesso.", "success");
  } catch (error) {
    setStatus(error.message, "error");
  } finally {
    setLoading(false);
  }
}


// ======================================================
// Events
// ======================================================

btnAnalisar.addEventListener("click", analisarChamado);

btnLimpar.addEventListener("click", () => {
  textoChamado.value = "";
  limparResultados();
  setStatus("");
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", () => {
    copiarTexto(button.dataset.target);
  });
});
