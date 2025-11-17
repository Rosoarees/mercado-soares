MERCADO SOARES - DOCUMENTAÇÃO VERSÃO 3.0
=========================================

ESTRUTURA DO PROJETO ATUALIZADA:
├── index.html              (Página principal com navegação)
├── contato.html            (Formulário de contato geral)
├── pedidos.html            (Formulário de pedidos especiais)
├── feedback.html           (Formulário de feedback)
├── cadastro.html           (Formulário de cadastro/newsletter)
├── css/
│   └── style.css           (Estilos atualizados com formulários)
├── js/
│   ├── script.js           (Script principal)
│   └── formularios.js      (Script dos formulários)
├── imagens/
│   └── logo/
│       └── logo-mercado-soares.png
└── README.txt

FORMULÁRIOS IMPLEMENTADOS:
──────────────────────────

✅ FORMULÁRIO DE CONTATO GERAL:
   • Campos: Nome, Email, Telefone, Assunto, Mensagem
   • Validação: Campos obrigatórios, email válido, mensagem mínima 10 caracteres
   • Elementos: Select, Textarea, validação HTML5

✅ FORMULÁRIO DE PEDIDOS ESPECIAIS:
   • Seção 1: Dados do cliente (Nome, Telefone, Email)
   • Seção 2: Detalhes do pedido (Tipo, Sabor, Data)
   • Seção 3: Informações adicionais (Observações, Orçamento)
   • Validação: Data futura, campos obrigatórios

✅ FORMULÁRIO DE FEEDBACK:
   • Informações pessoais opcionais
   • Avaliação com radio buttons (Excelente, Bom, Regular, Ruim)
   • Comentários obrigatórios (mínimo 10 caracteres)
   • Checkboxes de permissões

✅ FORMULÁRIO DE CADASTRO/NEWSLETTER:
   • Seção 1: Dados pessoais
   • Seção 2: Endereço completo
   • Seção 3: Preferências (checkboxes múltiplos)
   • Seção 4: Termos e condições obrigatórios

CARACTERÍSTICAS TÉCNICAS:
─────────────────────────

✅ ESTRUTURA SEMÂNTICA:
   • Uso de fieldset e legend para agrupamento
   • Labels associados com for/id
   • Atributos ARIA para acessibilidade

✅ VALIDAÇÃO HTML5:
   • Atributos: required, pattern, minlength, maxlength
   • Tipos: email, tel, date, number, checkbox
   • Validação em tempo real

✅ ACESSIBILIDADE:
   • Navegação por teclado
   • Mensagens de erro descritivas
   • Foco visível nos elementos
   • Textos alternativos

✅ EXPERIÊNCIA DO USUÁRIO:
   • Contadores de caracteres
   • Formatação automática (telefone, CEP)
   • Feedback visual imediato
   • Mensagens de sucesso

✅ RESPONSIVIDADE:
   • Layout adaptável para mobile
   • Campos reorganizados em telas pequenas
   • Tamanhos de fonte adequados

FUNCIONALIDADES JAVASCRIPT:
───────────────────────────
• Validação em tempo real
• Formatação de campos (telefone, CEP)
• Contadores de caracteres
• Mensagens de feedback
• Reset e submissão de formulários
• Validação de data mínima
• Verificação de idade

CRITÉRIOS ATENDIDOS:
────────────────────
✅ Formulários estruturados e semânticos
✅ Diferentes tipos de input implementados
✅ Elementos de seleção (select, radio, checkbox)
✅ Validação HTML5 aplicada
✅ Organização com fieldset e legend
✅ Acessibilidade implementada
✅ Experiência de usuário intuitiva
✅ Navegação entre múltiplas páginas

INSTRUÇÕES DE USO:
──────────────────
1. Abra index.html no navegador
2. Navegue entre os formulários usando o menu
3. Preencha os campos obrigatórios (*)
4. Observe a validação em tempo real
5. Envie o formulário para ver o feedback

TESTES RECOMENDADOS:
────────────────────
• Preencher formulários incompletos
• Testar validação de email
• Verificar formatação de telefone e CEP
• Testar em diferentes tamanhos de tela
• Navegar usando apenas o teclado

DESENVOLVIDO POR: [Seu Nome]
DATA: [Data de desenvolvimento]
VERSÃO: 3.0 - Com formulários interativos